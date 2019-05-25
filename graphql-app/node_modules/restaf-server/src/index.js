/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

'use strict';

import 'babel-polyfill';
import fs from 'fs';
import iService from './iService';
import config from './config';

function UIapp (uTable, rootHandler, rafEnv) {

    let asset = setup(rafEnv);
    iService(uTable, (uTable !== null), asset, rootHandler, null);
}

function service (uTable, rootHandler, rafEnv) {
    let asset = setup(rafEnv);
    iService(uTable, false, asset, rootHandler, null);
}


function app (appData) {

    let rafEnv = (process.argv.length === 3) ? process.argv[ 2 ] : null;
    console.log((rafEnv === null) ? 'NOTE: Using settings from environment variables' : `NOTE: env file is: ${rafEnv}`);
    iapp(appData, rafEnv);
}

function iapp (appSrc, rafEnv) {
    let asset = setup(rafEnv);
    let uTable = null;
    if ( appSrc !== null ) {
        createPayload( appSrc, ((err, appEnv) => {
           if ( err ) {
               console.log(err);
               process.exit(1);
           } else {
             iService(uTable, (uTable !== null), asset, null, appEnv );
           }
     
        }) )
    } else {
       let appEnv = getAllEnv(null);
       iService(uTable, (uTable !== null), asset, null, appEnv );
    }

}

function setup (rafEnv) {
    
    config(rafEnv);
    let asset = (process.env.APPLOC === '.') ? process.cwd() : process.env.APPLOC;
    process.env.APPASSET = asset;
    return asset;
}

function createPayload( srcName, cb ) {
    let src = fs.readFileSync(srcName, 'utf8');
    if ( src === null ) {
        cb(`${srcName} read failed`);
    }
    try {
        // console.log(src);
        let f = new Function( src );
        console.log(`${srcName} compile completed`);
        let r = f();
        f = null;
        let ar = getAllEnv(r);
        cb( null, ar);
    }
    catch ( err ) {
        console.log(`${srcName} compile failed`);
        cb(err);
    }
}
function getAllEnv (userData) {
    let env;
    let l;
    let authflow = trimit('AUTHFLOW');
    if (authflow === 'implicit') {
        l = {
            authType: authflow,
            host    : trimit('VIYA_SERVER'), 
            clientID: trimit('CLIENTID'),
            redirect: `${trimit('APPNAME')}/${trimit('REDIRECT')}`
        }
    } else {
        l = {
            authType: authflow,
            passThru: trimit('VIYA_SERVER')
        };
    }
    env = `let LOGONPAYLOAD = ${JSON.stringify(l)};`;
    if (userData !== null) {
        env += `let APPENV = ${JSON.stringify(userData)};`;
    } else {
        env += `let APPENV = {none: 'none'};`;
    }
    return env;
}

function trimit(e) {
    let a = process.env[e];
    return ( a == null) ?  null : a.trim();
}
export { iapp, app, service, UIapp };
