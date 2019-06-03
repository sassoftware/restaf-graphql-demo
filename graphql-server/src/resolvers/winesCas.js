/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
//
// Notes: This code is here as an example of returning a table via Fetch action
// Please see casResults.js for a better way to retrun results - the conversion to a JSON is done
// on the cas server in wines.casl
//

let casTableToJson = require('../lib/casTableToJson');
module.exports = async function winesCas (parent){
    let rows= casTableToJson(parent, 'Fetch');
    return rows;
}
