/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
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

