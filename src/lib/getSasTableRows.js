/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
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
