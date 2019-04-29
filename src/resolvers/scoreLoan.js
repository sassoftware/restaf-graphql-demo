/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let caslBase = require('../lib/caslBase');

module.exports = async function scoreLoan (_, args, context) {
    let { store } = context;
    let input = {
        JOB    : 'J1',
        CLAGE  : 100, 
        CLNO   : 20, 
        DEBTINC: 20, 
        DELINQ : 2, 
        DEROG  : 0, 
        MORTDUE: 4000, 
        NINQ   : 1,
        YOJ    : 10
    };

    input.LOAN  = args.amount;
    input.VALUE = args.assets;

    let env = {
        astore: {
            caslib: 'Public',
            name  : 'GRADIENT_BOOSTING___BAD_2'
        }
    }
    let result = await caslBase(store,['argsToTable.casl', 'score.casl'], input, env);
    let score = result.items('results', 'score');
    
    return score;

}
