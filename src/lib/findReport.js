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

