/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function casRows(parent){
    let data = parent.items('casResults', 'rows').toJS();
    return data;
}
