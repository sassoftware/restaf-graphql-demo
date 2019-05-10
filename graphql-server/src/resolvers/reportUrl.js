/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

module.exports = async function reportUrl (reportList) {
    let uri = reportList.itemsCmd(reportList.itemsList(0), 'self', 'link', 'uri');
    let options = "&appSwitcherDisabled=true&reportViewOnly=true&printEnabled=true&sharedEnabled=true&informationEnabled=true&commentEnabled=true&reportViewOnly=true";
    let url = `${process.env.VIYA_SERVER}/SASReportViewer/?reportUri=${uri}${options}`;
    return url;
}
