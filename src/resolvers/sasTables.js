/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function sasTables (parent){
    let names = [];
    for (const key in parent.tables) {
        let name = {name: parent.tables[key] }
        names.push(name);
    }
    return names;
}
