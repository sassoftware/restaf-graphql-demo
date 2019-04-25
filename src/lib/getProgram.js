/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
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


