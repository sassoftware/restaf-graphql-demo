/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
/** 
 * lib
 */
/**
 *
 * Calls cas server and returns the results(async)
 * 
 * @async
 * @module caslBase
 * 
 * @param {object} store    - restaf store
 * @param {object} srcFiles - a list of sourcr file to read 
 * @param {object} args     - args received from graphql server
 * @param {object} env      - app specific vales
 * 
 * @returns {object}  standard return value from apiCall
 */
'use strict';
let casSetup    = require('./casSetup');
let jsonToDict  = require('./jsonToDict');
let getProgram  = require('./getProgram');

let {UserInputError} = require('apollo-server-hapi');
//
// Notes: Function to call cas 
// See README file for notes on REUSECASSESSION
//
module.exports = async function caslBase (store, srcFiles, args, env) {
    //
    // create casl statements for arguments and appenv
    //
    let _args_   = jsonToDict(args, '_args_');
    let _appEnv_ = jsonToDict(env, '_appEnv_');

    //
    // Append cas program(s)
    //
    let scoreCaslCode = await getProgram(store, srcFiles);
    let code = _args_ + ' ' + _appEnv_ + ' ' + scoreCaslCode;
    
    // Patch for issues with sccasl.runcasl via REST API
    code = code.replace(/\r/g, '');
    // setup payload for runAction
    let payload = {
        action: 'sccasl.runcasl',
        data  : { code: code}
    }

    //
    // create session, execute code, delete session, return results
    //
    
    let session = await casSetup(store, null);
    try {
       let result  = await store.runAction(session, payload);
       await deleteSession(store,session);
       return result;
    }
    catch (err) {
        await deleteSession(store,session);
        let m = new UserInputError('Casl programming errors', {casError: JSON.stringify(err, null,4)});
        throw m;
    }
}
async function deleteSession(store, session) {
    if (process.env.REUSECASSESSION !== 'YES') {
        await store.apiCall(session.links('delete'));      
      }
}


