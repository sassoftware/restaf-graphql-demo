/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let caslBase = require('../lib/caslBase');

module.exports = async function wineProductionCas (_, args, context) {
    let { store } = context;
    console.log(args);
  
    let result = await caslBase(store,['argsToTable.casl', 'wineProductionCas.casl'], args, null);
    debugger;
    console.log(JSON.stringify(result, null,4));
    let score = result.items('results', 'score');
    console.log(score);
   // console.log(JSON.stringify(result, null,4));
    
    return score;

}
