/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
//
// Notes: Run compute service 
//
/**
 * Reduce compute service to an consummable form(async)
 * @module runCompute
 * 
 * @param {object} sore - restaf store
 * @param {code} code - SAS code to be executed
 * 
 * @returns {object} rafobject of the results from a sas compute job
 * 
 */
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
