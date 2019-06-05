/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

//
//  Generic resolver - assumes the result has an object called casResults with the
// desired output.
//
// See wineCas.js if your code is returning results of a Fetch action

module.exports = async function casResults(parent){
    let rows= parent.items('results', 'casResults').toJS();
    return rows;
}
