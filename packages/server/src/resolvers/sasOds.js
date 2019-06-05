/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function sasOds (parent,args,context){
    let {store}   = context;
    let odsResult = `<h1> No ODS output</h1>`;
    if (parent.ods !== null) {
         let r  = await store.apiCall(parent.ods);
         odsResult = r.items();
    }
    return odsResult;
    
}
