/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

//
// Note that the "parent" is the reportList from getcontent.js (content type main entry)
//

module.exports = async function reportImage (reportsList, args, context) { 
    let {store} = context;
    debugger;
    let image = await ireportImage(store, reportsList);
    return image;
}

async function ireportImage(store, reportsList) {
    let uri = reportsList.itemsCmd(reportsList.itemsList(0), 'self', 'link', 'uri');
    let data = {
        reportUri   : uri,
        sectionIndex: 0,
        layoutType  : 'entireSection',
        size        : "400x400"
    };

    let p = { data: data };

    let reportImages = store.getService('reportImages');
    let job          = await store.apiCall(reportImages.links('createJob'), p);
    let status       = await store.jobState(job, { qs: { wait: 2.0} } , 10, 2);
    
    if (status.data !== 'completed') {
        throw `Job failed with status of ${status.data}`;
    }
    let image = await store.apiCall(status.job.itemsCmd(status.job.itemsList(0), 'image'));

    return image.items();

}

