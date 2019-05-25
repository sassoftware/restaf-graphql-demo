/*
 * Copyright (c) SAS Institute Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *
 */

async function computeSummary (store, job){
    debugger;
    let cResult = {
        log    : null,
        listing: null,
        ods    : null,
        tables : {}
    };
    debugger;
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
                    let rowSet = await store.apiCall(t1.links('rowSet'));
                    cResult.tables[resultItem] = rowSet;
                } else {
                    console.log (`what is ${type} ?`)
                }
            }
        }
    }

    return cResult;

}
module.exports = computeSummary;

