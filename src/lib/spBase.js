/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

//
// Notes: setup and run a sas program via compute service
//
let runCompute = require('./runCompute');

module.exports = async function spBase (store, args, src){
 
    // generate macro variables

    let code =[];
    for (let arg in args) {
        let c = `%let ${arg} = ${args[arg]};`;
        code.push(c);
    }
 
    // Concat macro to code
    let asrc = src.split(/\r?\n/);
    code = code.concat(asrc);

    // run code and get results
    let resultSummary = await runCompute(store, code);
    return resultSummary;
}
