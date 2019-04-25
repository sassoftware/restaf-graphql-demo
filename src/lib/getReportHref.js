/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let findReport  = require('./findReport');
async function getReportHref (store, name) {
    debugger;
    let reportsList = await findReport(store, name);
    debugger;
    if (reportsList === null) {
        return `${name} was not found`;
    }
    let uri = reportsList.itemsCmd(name, 'self', 'link', 'uri');
    let options = "&appSwitcherDisabled=true&reportViewOnly=true&printEnabled=true&sharedEnabled=true&informationEnabled=true&commentEnabled=true&reportViewOnly=true";
    let href = `${process.env.VIYA_SERVER}/SASReportViewer/?reportUri=${uri}${options}`;
    return href;
}
module.exports = getReportHref;

