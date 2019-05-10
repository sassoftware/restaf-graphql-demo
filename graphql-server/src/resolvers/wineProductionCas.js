/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let caslBase = require('../lib/caslBase');
let getSelections = require('../lib/getSelections');

module.exports = async function wineProductionCas (_, args, context, info) {
    let {store} = context;
    
    /* get the selection list from the AST and extened args with that information */
    let selections = getSelections(info, 'wines', true, args);

    /* execute setup and execute sccasl action on CAS */
    let result = await caslBase(store,['argsToTable.casl', 'wines.casl'], selections.args,selections._selections_);
   
    return result;
}
