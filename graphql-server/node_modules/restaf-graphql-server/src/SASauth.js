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

let bell       = require('bell'),
// eslint-disable-next-line no-unused-vars
    uuid       = require('uuid'),
    cookie     = require('hapi-auth-cookie');

async function SASauth (hapiServer) {

    let authCookieOptions,
        bellAuthOptions,
        provider;

        //TBD: do we need keepalive?
    authCookieOptions = {
        password  : uuid.v4(),
        cookie    : 'authCookie',
        isSecure  : false,
        isSameSite: (process.env.SAMESITE != null) ? process.env.SAMESITE : 'Strict',
        
        validateFunc: async function (req, session) {
            let credentials = await req.server.app.cache.get(session.sid);

            return {
                valid      : true,
                credentials: credentials,
                sid        : session.sid
            }
        }
        
    };
    
    if (process.env.COOKIEDOMAIN == 'YES') {
        authCookieOptions.domain = process.env.APPHOST;
    }
    
    
    if (process.env.OAUTH2 !== 'NO') {
        let authURL = process.env.VIYA_SERVER ;
        provider = {
            name         : 'sas',
            protocol     : 'oauth2',
            useParamsAuth: false,
            auth         : authURL + '/SASLogon/oauth/authorize',
            token        : authURL + '/SASLogon/oauth/token'
        };
        
        bellAuthOptions = {
            provider    : provider,
            password    : uuid.v4(),
            clientId    : process.env.CLIENTID,
            clientSecret: (process.env.CLIENTSECRET == null) ? ' ' : process.env.CLIENTSECRET,
            isSecure    : false
        };

        if (process.env.BELL_LOCATION != null) {
            bellAuthOptions.location = process.env.BELL_LOCATION;
        }

        await hapiServer.register(bell);
        await hapiServer.register(cookie);
       
        hapiServer.auth.strategy('sas', 'bell', bellAuthOptions);
        hapiServer.auth.strategy('session', 'cookie', authCookieOptions);
        hapiServer.auth.default('session');
    
    }

}


module.exports =  SASauth;