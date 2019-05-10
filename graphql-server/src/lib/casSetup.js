/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * Creates a cas session and loads actionsets(async)
 * 
 * @async
 * @module casSetup
 * @param {object} store - standard restaf store object
 * @param {object} actionSets - array of actionSets to load
 * 
 * @returns {object} - rafObject of a cas session
 * 
 */
module.exports = async function casSetup (store, actionSets) {

	let session = null;
	if (process.env.REUSECASSESSION === 'YES') {
		let s = store.getAppData('casSession');
		if (s !== null) {
			session = s.toJS();
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