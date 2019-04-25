/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let casSetup    = require('./casSetup');
let jsonToDict  = require('./jsonToDict');
let getProgram  = require('./getProgram');

module.exports = async function caslBase (store, srcFiles, input, env) {
    //
    // create casl statements for arguments and appenv
    //
    let inputData  = jsonToDict(input, '_args_');
    let appEnv     = jsonToDict(env, '_appEnv_');

    //
    // Append cas program(s)
    //
    let scoreCaslCode = await getProgram(store, srcFiles);
    let code = inputData + ' ' + appEnv + ' ' + scoreCaslCode;


    // setup payload for runAction
    let payload = {
        action: 'sccasl.runcasl',
        data  : { code: code}
    }

    //
    // create session, execute code, delete session, return results
    //
   
    let session = await casSetup(store, null);
    let result  = await store.runAction(session, payload);
    console.log(JSON.stringify(result.items(), null, 4));
    if (process.env.REUSECASSESSION === 'YES') {
        store.setAppData('casSession', session);
    } else {
       await store.apiCall(session.links('delete'));
    }
    return result;
}

