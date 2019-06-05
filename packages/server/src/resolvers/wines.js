/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

let getSasTableRows = require('../lib/getSASTableRows');
// eslint-disable-next-line no-unused-vars
module.exports = async function wines (parent, args, context){
    let {store} = context;
    // convert table to object of the form [{var1: value, var2: value,...},....]
    // ex: [{merlot:10, twobit:20}, {merlot: 20, twobit:30}]
    let rows= await getSasTableRows(store, parent, 'WINE');
    return rows;

}
