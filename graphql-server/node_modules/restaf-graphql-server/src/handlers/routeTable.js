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
let home         = require('./home');
/*
let getApp2      = require('./getApp2');
let getShared    = require('./getShared');
let getAppEnv    = require('./getAppEnv');
*/


function routeTable (appEnv, userRoutes) {
  
    let root       = (process.env.APPNAME == null || process.env.APPNAME === '/') ? '/' : `/${process.env.APPNAME}`;
    let homeb      = home.bind(null, appEnv);
    // let getAppEnvb = getAppEnv.bind(null, appEnv);
    
    
    
    let defaultRouteTable =
        [
            {
                method: ['GET'],
                path  : `${root}`,
                config: {
                    auth: {
                        mode    : 'required',
                        strategy: 'sas'
                        },
                    handler: homeb
                }
            }
           
        ];

    if (userRoutes !== null) {
        defaultRouteTable = defaultRouteTable.concat(userRoutes);
    }
    console.log(defaultRouteTable);
return defaultRouteTable
}

module.exports = routeTable;