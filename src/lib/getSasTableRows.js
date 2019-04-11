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
// eslint-disable-next-line no-unused-vars
module.exports = async function getSasTableRows(store, computeSummary, tableName){
    debugger;
    let tableLink = computeSummary.tables[tableName];
    let table     = await store.apiCall(tableLink);
    let columns   = table.items('columns');

    let rows = table.items('rows');
    let result = [];

    let count = rows.size;
    for (let i=0; i < count; i++) {
        let row = rows.get(i);
        let r = {};
        columns.map((c,i) => {
           let varx = c.toLowerCase();
           r[varx] = row.get(i);
        });
        result.push(r);
    }
    return result;

}
