/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let jsonToDict = require('./src/lib/jsonToDict');
debugger;
let s = { _selections_: [{name: 'a'}, {name: 'b'}]};

let r = jsonToDict(s, '_appEnv_');
console.log(r);