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

//
// Replace to suit your needs - key is to return a string that has the
// SAS program or Casl statements
//
// Typical source locations: local file system, Viya job definition, github etc...
//
let fsPromises = require('fs').promises;
module.exports = async function getProgram (store, args){
    let src = '';
    for (let i=0; i<args.length; i++){
        let s = await getSrc(store, args[i]);
        src = src + s;
    }
    return src;
}

// 
// This example reads source code from a directory on this server
// In real world situation you will probably use github, S3, jobDefinitions etc...
// See the commented example below
//

// eslint-disable-next-line no-unused-vars
async function getSrc(store, sp){
    let filename = `${process.env.PROGRAMURI}/${sp}`;
    let r = await fsPromises.readFile(filename, {encoding: 'utf8'});
    return r;
}

/* 
 * example of calling an external server 
 */

/*
async function getSrc(store, sp){
    let payload = {
        method: 'GET',
        url   : `${process.env.PROGRAMURI}/${sp}`
    };
    let r = await  store.request(payload);
    return r.data;
}

*/


