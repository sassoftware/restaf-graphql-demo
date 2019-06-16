/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

const jsonToDict = require('../lib/jsonToDict');
let input = {
    JOB    : 'J1',
    CLAGE  : 100, 
    CLNO   : 20, 
    DEBTINC: 20, 
    DELINQ : 2, 
    DEROG  : 0, 
    MORTDUE: 4000, 
    NINQ   : 1,
    YOJ    : 10,
    LOAN   : 1000,
    ASSET  : 100000,
    x      : true
};

let _args_ = jsonToDict(input, '_args_');

console.log(_args_);