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
module.exports = async function reports (_, args, context) {
    debugger;
    let {store} = context;
    let reports = store.getService ('reports');
    
    //
    // get the list of reports (pagination ignored for now)
    //

    let filter = (args.hasOwnProperty('name') === true) ? args.name : null;
    let list = await getList(store, reports, filter);
    return (list === null) ? [] : list;
    }

//
// get list of reports
//

async function getList(store, reports) {
    let reportsList = await store.apiCall (reports.links ('reports'));
    if (reportsList.itemsList().size === 0) {
        throw null;
    }

    let  r = reportsList.itemsList().map (name => {
            // console.log(JSON.stringify(reportsList.items(name), null, 4))
            let t = {
                name      : name,
                modifiedBy: reportsList.items(name, 'data', 'modifiedBy'),
                modifiedOn: reportsList.items(name, 'data', 'modifiedTimeStamp')
            };
            return t;
        });
    return r;
    }

