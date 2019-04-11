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
// eslint-disable-next-line no-unused-vars
module.exports = async function products(parent, args, context){
    debugger;
    let {store} = context;
    let tableLink = parent.tables['BUDGET'];
    let table     = await store.apiCall(tableLink);
    let columns = table.items().get('columns');
    let row = table.items().get('rows').get(0);
    let r = columns.map((c,i) => {
        let rx = {name: c, value: row.get(i)};
        return rx;
    });

    return r;

}
