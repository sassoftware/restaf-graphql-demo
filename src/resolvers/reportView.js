/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

let findReport = require('../lib/findReport');

module.exports = async function reportView (_, args, context){
    let {store} = context;

    // find the report and let graphql route it to get url and image as required
    let reportsList = await findReport(store, args.name);
    return reportsList;
}
