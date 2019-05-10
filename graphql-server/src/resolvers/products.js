/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
// eslint-disable-next-line no-unused-vars
let getSASTableRows = require('../lib/getSasTableRows');
module.exports = async function products (parent, args, context){
    let {store} = context;
    let r = await getSASTableRows(store, parent, 'BUDGET');
    return r;
}


