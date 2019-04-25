/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let logLines = require('../lib/logLines');
module.exports = async function sasLog (parent,args,context){
    let {store}   = context;
    let logResult = `<h1> No log </h1>`
    if (parent.log !== null) {
        let result = await store.apiCall(parent.log);
        logResult = logLines(result);
    }
    return logResult;
}
