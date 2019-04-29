/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

//
// Notes: Retrieve the image of the report from the server
//
let findReport = require('./findReport');

module.exports = async function getReportImage (store, name) {
    let reportImages = store.rafObject('reportImages');
    
    let reportsList = await findReport(store, name);
    if (reportsList === null) {
        return `${name} was not found`;
    }

    let uri = reportsList.itemsCmd(reportsList.itemsList(0), 'self', 'link', 'uri');
    let data = {
        reportUri   : uri,
        sectionIndex: 0,
        layoutType  : 'entireSection',
        size        : "400x400"
    };

    let p = { data: data };

    let job = await store.apiCall(reportImages.links('createJob'), p);
    let status = await store.jobState(job, { qs: { wait: 1.5} } , 10, 2);
    if (status.data !== 'completed') {
        return `Job failed ${status.data}`;
    }
    let image = await store.apiCall(status.job.itemsCmd(status.job.itemsList(0), 'image'));

    return image.items();
    
    }

