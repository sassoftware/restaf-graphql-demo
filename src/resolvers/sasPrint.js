/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

let spBase = require('../lib/spBase');
module.exports = async function sasPrint (_, args, context){
    let {store} = context;
    let code = `
        ods html style=barrettsblue;
        proc print data=&table;run;
        ods html close;run;'`;
    let resultSummary = await spBase(store, args, code);
    return resultSummary;
}
