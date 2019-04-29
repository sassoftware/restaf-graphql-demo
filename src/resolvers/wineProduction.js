/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

let getProgram    = require('../lib/getProgram');
let getSelections = require('../lib/getSelections');
let spBase        = require('../lib/spBase');

module.exports = async function wineProduction (_, args, context, info){
    let {store} = context;

    // read source 
    let src = await getProgram(store, ['wines.sas']); 

    // create final payload and run the code via compute server
    let selections = getSelections(info, 'wines', args);
    let resultSummary = await spBase(store, selections.args, src);
    
    // resultSummary is used to resolve the fields in this type.
    return resultSummary;
}

