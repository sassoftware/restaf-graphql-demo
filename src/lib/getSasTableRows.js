/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/

//
// Notes: Retrieve a table and converts a SAS table to a json
// TBD: Handle pagination when pagination is added to graphql schema
//
'use strict';
module.exports = async function getSasTableRows(store, computeSummary, tableName){
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
