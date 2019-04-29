/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function reports (_, args, context) {
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
            let t = {
                name      : name,
                modifiedBy: reportsList.items(name, 'data', 'modifiedBy'),
                modifiedOn: reportsList.items(name, 'data', 'modifiedTimeStamp')
            };
            return t;
        });
    return r;
    }

