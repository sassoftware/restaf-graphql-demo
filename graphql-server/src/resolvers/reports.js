/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function reports (_, args, context) {
    let {store} = context;
    let reports = store.getService ('reports');
    let list = await getList(store, reports);
    return list;
    }

async function getList(store, reports) {
    let reportsList = await store.apiCall (reports.links ('reports'));
    if (reportsList.itemsList().size === 0) {
        return [];
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

