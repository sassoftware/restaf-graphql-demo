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
let computeSummary = require('../lib/computeSummary');
module.exports = async function runCompute (store, code){
    
    let session = await getSession(store);
    let payload  = {
        data: {code: code}
    };
    // Now execute the data step and wait for completion
    let job    = await store.apiCall(session.links('execute'), payload);
    let status = await store.jobState(job, null, 5, 2);
    if (status.data === 'running') {
        throw `ERROR: Job did not complete in allotted time`;
    } else {
        let results = await computeSummary (store, status.job);
        return results;
        }
}

async function getSession(store) {
    let session = null;
    if (process.env.REUSECOMPUTESESSION === 'YES') {
        let s = store.getAppData('computeSession');
        if (s !== null) {
            session = s.toJS();
        }
        console.log(session);
    }
    if (session === null) {
        let compute = store.getService('compute');
        let contexts  = await store.apiCall(compute.links('contexts'));
        // lookup the name of the first context and then use it to get the associated createSession restafLink
        let context;
        if (process.env.COMPUTECONTEXT === '*') {
            context = contexts.itemsList(0);
        } else {
            context = process.env.COMPUTECONTEXT;
        }
        let createSession = contexts.itemsCmd(context, 'createSession');
        session  = await store.apiCall(createSession);
        if (process.env.REUSECOMPUTESESSION === 'YES') {
            await store.setAppData('computeSession', session);
        }
    }
    return session;
}
