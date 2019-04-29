/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

let getProgram = require('../lib/getProgram');
let spBase  = require('../lib/spBase');
let getSasTableRows = require('../lib/getSasTableRows');

module.exports = async function budget (_, args, context){
    let {store} = context;
    // read source for budget.sas
    let src = await getProgram(store, ['budget.sas']); 

    // create final payload and run the code via compute server
    let resultSummary = await spBase(store, args, src);

    // get the rows from the table - satisfying the fields for the Budget type
    let row = await getSasTableRows(store, resultSummary, 'BUDGET');

    return row[0];
}

