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
 let fs = require('fs');
 let config = require('./config.js');
 function parseInput (envFile, appSrc, cb)  {
    let asset = null;
    setup(envFile, (err, r) => {
        asset = r;
        if (appSrc !== null) {
            createPayload(appSrc, ((err, appEnv) => {
            if (err) {
                cb(err);
            } else {
               cb(null, {asset: asset, appEnv: appEnv})
            }
        
            }))
        }
    })

}

function setup (envFile, cb) {
    config (envFile, () => {
        let asset = (process.env.APPLOC === '.') ? process.cwd() : process.env.APPLOC;
        process.env.APPASSET = asset;
        cb(null,asset);
    });
}

function createPayload (srcName, cb) {
    let src = fs.readFileSync(srcName, 'utf8');
    if (src === null) {
        cb(`${srcName} read failed`);
    }
    try {
        // console.log(src);
        let f = new Function(src);
        console.log(`${srcName} compile completed`);
        let r = f();
        f = null;
        cb(null, r);
    }
    catch (err) {
        console.log(`${srcName} compile failed`);
        cb(err);
    }
}

module.exports = parseInput;