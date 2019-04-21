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

let getProgram = require('../lib/getProgram');
let spBase  = require('../lib/spBase');
let getSasTableRows = require('../lib/getSasTableRows');

module.exports = async function budget (_, args, context){
    let {store} = context;

    // read source for budget.sas
    let src = await getProgram(store, ['budget.sas']); 

    // create final payload and run the code via compute server
    let resultSummary = await spBase(store, args, src);

    // get the rows from the table - satisfying the fields for the Budget type
    let row = await getSasTableRows(store, resultSummary, 'BUDGET');

    // return the first row since this type expects a simple list back
    return row[0];
}

