/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
//
// Notes: Convert a cas table to json
//
module.exports = function casTableToJson (result, table){
    let data = result.items('tables', table);
    let itemRows = data.get('rows');
    let columns = [];
    data.get('schema').map(s => {
        columns.push(s.get('name'));
    });

    let allResults = [];
    itemRows.map((r)=> {
        let row = {};

        r.map((value, j) => {
            row[columns[j]] = value;
        });
        allResults.push(row);
    });
return allResults;
}
