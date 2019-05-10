/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

let spBase = require('../lib/spBase');
let getSelections = require('../lib/getSelections');
let getProgram = require('../lib/getProgram');

module.exports = async function sasPrint (_, args, context, info){
    let {store} = context; 

    let src = await getProgram(store, ['sasprint.sas']); 

    // create final payload and run the code via compute server
    let selections = getSelections(info, 'sasPrint', false, args);
   
    let resultSummary = await spBase(store, selections.args, src);
    
    // resultSummary is used to resolve the fields in this type.
    return resultSummary;
}