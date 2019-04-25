/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
async function findReport (store, name) {
    let reports = store.getService('reports');
    debugger;
    let payload = {
        qs: {
            filter: `eq(name,'${name}')`
        }
    }
    // call the reports service
    debugger;
    let reportsList = await store.apiCall(reports.links('reports'), payload);
    // check to see if atleast one report was found(hopefully one only)
    debugger;
    return (reportsList.itemsList().size === 0) ? null : reportsList; 
}
module.exports = findReport;

