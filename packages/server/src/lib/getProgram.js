/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * Read sas or casl programs(async)
 * 
 * @async
 * @module getProgram
 * 
 * @param {object} store - restaf store
 * @param {object} files - array of file names 
 * 
 * @returns {string} - string with the files content's concatenated
 */

let fsPromises = require('fs').promises;
module.exports = async function getProgram (store, files){
    let src = '';
    for (let i=0; i<files.length; i++){
        let s = await getSrc(store, files[i]);
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

//
// Example of making an http call to a server
//

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


