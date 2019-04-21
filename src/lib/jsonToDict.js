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
 // TBD: Thorough testing
 // TBD: convert to a c function using state machine but not critical for small json
 //
 
module.exports = function jsonToDict (obj, name) {
    let o1 = (Array.isArray(obj) === true)? handleArray(obj) : handleObject(obj)
    let o = `${name} = ${o1};`
    return o;
}
function handleObject(obj) {
    let r    = '{ ';
    let sep =  ' ';
    for (let k in obj) {
        if (Array.isArray(obj[k]) === true) {
            let o = handleArray(obj[k]);
            r = r + sep +  `${k}=` + o ;
        } else {
            let type = typeof obj[k] ;
            if (type === 'object') {
                let o = handleObject(obj[k]);
                r = r + sep +  `${k}=` + o ;
            } else {
                r = r + sep + `${k}=` + ((type === 'string') ? ` "${obj[k]}" ` : `${obj[k]}  `) ;
            }
        }
        sep = ',';
    }
   r = r + '} ';
   return r;
}

function handleArray(obj) {
    let r    = '{';
    let sep =  ' ';
    let size = obj.length;
    for (let k=0; k<size; k++) {
        if (Array.isArray(obj[k]) === true) {
            let o = handleArray(obj[k]);
            r = r + sep +  `${k}=` + o;
        } else {
            let type = typeof obj[k] ;
            if (type === 'object') {
                let o = handleObject(obj[k]);
                r = r + sep +  `${k}=` + o ;
            } else {
                r = r + sep +  ((type === 'string') ? ` "${obj[k]}" ` : `${obj[k]}  `) ;
            }
            sep = ',';
        }
    }
   r = r + '}';
   return r;
}
