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

//
// Note that the "parent" is the reportList from getcontent.js (content type main entry)
//

async function getImage (reportsList, args, context) { 
    let {store} = context;
    let image = await reportImage(store, reportsList);
    return image;
}

async function reportImage(store, reportsList) {
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
    let status       = await store.jobState(job, { qs: { wait: 1.5} } , 10, 2);
    
    if (status.data !== 'completed') {
        throw `Job failed with status of ${status.data}`;
    }
    let image = await store.apiCall(status.job.itemsCmd(status.job.itemsList(0), 'image'));

    return image.items();

}
module.exports = getImage;
