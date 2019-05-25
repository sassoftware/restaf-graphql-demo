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
let uuid = require('uuid');
let restaf = require('restaf');

module.exports = async function getStore(appEnv, req, h){

    const sid = uuid.v4();
    ;
    await req.server.app.cache.set(sid, req.auth.credentials);
    ;
    req.cookieAuth.set({sid});

    ;
   
    // setup restaf 
    let store = await setupRestaf (req.auth.credentials, appEnv);
    await store.setAppData('appEnv', appEnv);

    // cache internal store to be retrieved on subsequent calls
    ;
    await req.server.app.cache.set(sid + 'store', store);


    let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
    return h.file(`${indexHTML}`);
}

async function setupRestaf (credentials, appEnv) {

    let store = restaf.initStore();
    let payload = {
        authType : 'server',
        host     : process.env.VIYA_SERVER,
        token    : credentials.token,
        tokenType: 'bearer'
    }
    await store.logon (payload);
    ;
    await store.addServices(...appEnv.services);
    return store;

}
