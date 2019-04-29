/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
//
// Notes: In a real use case this conversion can be done on the cas server
// by resturning a dictionary with the rows of the table making this resolver
// unnecessary - see the scoreLoan.js for an example
//
let casTableToJson = require('../lib/casTableToJson');
module.exports = async function winesCas (parent){
    let rows= casTableToJson(parent, 'Fetch');
    return rows;
}
