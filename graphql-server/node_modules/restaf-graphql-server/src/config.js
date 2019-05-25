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

let fs  = require('fs');
let dns = require('dns');
let os  = require('os');

function config (appEnv, cb) {

    if (appEnv === null) {
        fixServer();
        cb(null, null);
    } else {
      iconfig(appEnv, cb);
    }
}

function iconfig (appEnv, cb) {

    dns.lookup(os.hostname(), (err, addr) => {
        if (err) {
            console.log(err);
            cb(err);
        }
        let data = fs.readFileSync(appEnv, 'utf8');
        let d = data.split(/\r?\n/);
        console.log(`Configuration specified via ${appEnv}`);
        d.forEach(l => {
            if (l.length > 0 && l.indexOf('#') === -1) {
                let la = l.split('=');
                let envName = la[ 0 ];
                if (la.length > 0) {
                    if (la[ 1 ] === '') {
                        delete process.env[ envName ];
                    } else {
                        process.env[ envName ] = la[ 1 ];
                    }
                }
            }
        });
        fixServer(addr);
        cb(null, 'Env file processed');
    });
}

function fixServer (addr) {
    process.env.SAS_PROTOCOL = (process.env.SAS_SSL_ENABLED === 'YES') ? 'https://' : 'http://';

    // fixing usual user error of adding a space after the url

    if (process.env.VIYA_SERVER != null) {
        let t = process.env.VIYA_SERVER.split(' ');
        process.env.VIYA_SERVER = t[ 0 ];

        if (process.env.VIYA_SERVER.indexOf('http') < 0) {
            process.env.VIYA_SERVER = process.env.SAS_PROTOCOL + process.env.VIYA_SERVER;
        }
    }
    if (process.env.APPHOST === '*') {
        process.env.APPHOST = os.hostname();
    } else if (process.env.APPHOST === '*ip') {
        process.env.APPHOST = addr;
    } 
}

module.exports = config;