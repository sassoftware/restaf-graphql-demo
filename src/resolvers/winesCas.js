/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

let getSasTableRows = require('../lib/getSASTableRows');
// eslint-disable-next-line no-unused-vars
module.exports = async function wines (parent, args, context){
    debugger;
    let {store} = context;
    let rows= await getSasTableRows(store, parent, 'WINE');
    return rows;

}
