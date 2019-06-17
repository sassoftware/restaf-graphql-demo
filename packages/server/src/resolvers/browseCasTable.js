/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let caslBase = require('../lib/caslBase');
module.exports = async function browseCasTable(_, args, context ){

    let { store } = context;

    let [caslib, name] = args.table.split('.') ;
    args.caslib = caslib;
    args.name   = name;
   
    let result = await caslBase(store,['browseCasTable.casl'], args, null);
    let casResults = result.items('results', 'casResults').toJS();
  
    let allData = {
        columns   : casResults.table.Fetch.schema,
        rows      : casResults.table.Fetch.rows,
        pagination: casResults.pagination
    }
  
    // return {allData: allData};
    return allData;
    

}

