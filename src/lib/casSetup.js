/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */
'use strict';
module.exports = async function casSetup (store, actionSets) {

	let session = null;
	if (process.env.REUSECASSESSION === 'YES') {
		let s = store.getAppData('casSession');
		if (s !== null) {
			session = s.toJS();
			console.log('reusing session');
		}
	}

	if (session === null){
		let casManagement = store.rafObject('casManagement');
		let servers       = await store.apiCall(casManagement.links('servers'));
		let p = {
			data: { name: 'graphql' }
		};
		let serverName = servers.itemsList(0);
		session = await store.apiCall(servers.itemsCmd(serverName, 'createSession'), p);
		if (actionSets !== null) {
			let l = actionSets.length;
			for (let i = 0; i < l; i++) {
				let p = {
					action: 'builtins.loadActionSet',
					data  : { actionSet: actionSets[ i ] }
				};
				await store.runAction(session, p);
			}
		}

		if (process.env.REUSECASSESSION === 'YES') {
			store.setAppData('casSession', session);
		}
	}

	return session;
}