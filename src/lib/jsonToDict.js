/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
 'use strict';

 //
 // TBD: Thorough testing
 // TBD: convert to a c function using state machine but not critical for small json
 //
 
module.exports = function jsonToDict (obj, name) {
    let o1;
    if (obj === null) {
        o1 = `{}`
    } else {
        o1 = (Array.isArray(obj) === true)? handleArray(obj) : handleObject(obj)
    }
    return `${name} = ${o1};`
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
