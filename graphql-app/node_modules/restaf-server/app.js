#!/usr/bin/env node
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

debugger;
let rafserver = require ('./lib/index.js');

let rafEnv    = (process.argv.length === 3) ? process.argv [ 2 ] : null ;
console.log((rafEnv === null) ? 'NOTE: Using settings from environment variables': `NOTE: env file is: ${rafEnv}`);
rafserver.UIapp (getCustomHandler (), null, rafEnv);

function getCustomHandler () {
    let handler =
    [
        {
            method: [ 'GET' ],
            path  : `/appenv`,
            config: {
                auth   : false,
                cors   : true,
                handler: getCustomAppEnv
            }
       }

    ];
    return handler;
    }

    async function getCustomAppEnv (req, h) {
        let env;
        console.log( 'in default appenv');
        if ( process.env.AUTHFLOW === 'implicit') {
           env = `
    
            let LOGONPAYLOAD = {
                authType: '${process.env.AUTHFLOW}',
                host    : '${process.env.VIYA_SERVER}',
                clientID: '${process.env.CLIENTID}',
                redirect: '${process.env.APPNAME}/${process.env.REDIRECT}'
            };
    
         `
        } else {
            env = `
                let LOGONPAYLOAD = {
                    authType: '${process.env.AUTHFLOW}',
                    /*host    : '${process.env.VIYA_SERVER}',*/
                    passThru: '${process.env.VIYA_SERVER}'
                };
               
                `;
        }
        let userData = `let APPENV = ${JSON.stringify(appEnv())};`;

        env = env + ' ' + userData ;
        console.log( '----- custom appenv');
        console.log(env);

    return env;
    }

    function appEnv() {
        let x = {
            scoreModel: {
                caslib: 'Public',
                name: 'loanEvaluation',
                z:10
            }
        };
        console.log(x);
        return x;
    }
