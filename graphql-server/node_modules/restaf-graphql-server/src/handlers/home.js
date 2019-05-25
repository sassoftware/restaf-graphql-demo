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
let fs = require('fs');

async function home (appEnv, req, h) {
    //
    // create id for user session and save credentials and set cookie in response
    //
    const sid = uuid.v4();
    let cache = req.server.app.cache;
    // await req.server.app.cache.set(sid, req.auth.credentials);
    await cache.set(sid, req.auth.credentials);
    req.cookieAuth.set({ sid });

    //
    // Now setup restaf for this session and cache it for next call
    //
    let credentials = req.auth.credentials;
    let store = await setupRestaf(credentials);
    await store.setAppData('appEnv', appEnv);

    // save store

    await cache.set(sid + 'store', store);

    //
    // now start the real session 
    // Use APPENTRY to start the app in the correct 
    // if start with a / then it is a route path. otherwise it is a asset like index.html
    //


    if (process.env.APPMODE === 'YES') {
        if (process.env.APPENTRY.indexOf('/') === 0) {
            console.log(`NOTE: Routed to ${process.env.APPENTRY}`);
            return h.response().redirect(process.env.APPENTRY);
        } else {
            console.log(`NOTE: Displaying asset ${process.env.APPENTRY}`);
            return h.file(process.env.APPENTRY);
        }
    } else {
        if (credentials.query.hasOwnProperty('next') === true) {
            console.log(`NOTE: Redirecting to: ${credentials.query.next}`);
            return h.response().redirect(credentials.query.next);
        } else {
            console.log(`NOTE: Responding with default`);
           return h.response({Note: 'Please use the back button to return to app'});
        }
    }
    

}
//
// Basic restaf setup
// needs restaf 1.2.0 or higher
//
async function setupRestaf (credentials) {

    let options = null;
    let pemE = process.env.PEMFILE;

    if (pemE != null) {
        let pem = fs.readFileSync(`${process.env.PEMFILE}`);
        options = { pem: pem };
    }
    let store = restaf.initStore(options);
    let payload = {
        authType : 'server',
        host     : process.env.VIYA_SERVER,
        token    : credentials.token,
        tokenType: 'bearer'
    };
    await store.logon(payload);

    if (process.env.SERVICES != null) {
        let defaultServices;
        defaultServices = getUserServices();
        console.log(defaultServices);
        await store.addServices(...defaultServices);
    }

    return store;
}

function getUserServices () {
    let s = process.env.SERVICES.split(',');
    let d = [];
    s.map(ss => {
        let t = ss.trim();
        if (t.length > 0) {
            d.push(t)
        }
    })

    return d;
}

module.exports = home;