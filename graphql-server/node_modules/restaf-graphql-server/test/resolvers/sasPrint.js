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
module.exports = async function sasPrint(_, args, context){
    let {store} = context;
    let table   = args.table;

    let ds = `proc print data=${table};run;`;
    let code = [
        'ods html style=barrettsblue;',
        `${ds}`,
        'ods html close;run;'];
    let resultSummary = await computeRun(store, code);
    return resultSummary;
}

async function computeRun(store, code) {
    let compute = store.getService('compute');
    let contexts  = await store.apiCall(compute.links('contexts'));
    // lookup the name of the first context and then use it to get the associated createSession restafLink
    let createSession = contexts.itemsCmd(contexts.itemsList(0), 'createSession');
    let session  = await store.apiCall(createSession);
    let payload  = {
        data: {code: code}
    };
    // Now execute the data step and wait for completion
    let job    = await store.apiCall(session.links('execute'), payload);
    let status = await store.jobState(job, null, 5, 2);
    if (status.data === 'running') {
        throw `ERROR: Job did not complete in alloted time`;
    } else {
        let results = await computeSummary (store, status.job);
        return results;
        }
    }
