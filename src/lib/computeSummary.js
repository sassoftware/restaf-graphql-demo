/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/

 //
 // Notes: Collects important relevant information from a compute server run.
 // This is particularly useful for getting to the tables easily in the rest of the app.
 // This version is a bit aggressive by doing more setup. 
 // TBD: scale back some of the setup and postpone some of the calls.
 // 
 
async function computeSummary (store, job){
    let cResult = {
        log    : null,
        listing: null,
        ods    : null,
        tables : {}
    };
    cResult.log     = job.links('log');
    cResult.listing = job.links('listing');
    let reportLink  = job.links('results');
    if (reportLink !== null) {
        let results = await store.apiCall(reportLink);
        let size = results.itemsList().size; /* How many results: ods, table1, table2, ... */
        if (size > 0) {
            for (let i = 0 ; i < size; i++) {
                let resultItem = results.itemsList(i);
                let type = results.items(resultItem, 'data', 'type').toLowerCase();
                if (type === 'ods') {
                    cResult.ods = results.itemsCmd(resultItem, 'self');
                } else if (type === 'table') {
                    let t1 = await store.apiCall(results.itemsCmd(resultItem, 'self'));
                    // let rowSet = await store.apiCall(t1.links('rowSet'));
                    cResult.tables[resultItem] = t1.links('rowSet');
                } else {
                    console.log (`what is ${type} ?`)
                }
            }
        }
    }

    return cResult;

}
module.exports = computeSummary;

