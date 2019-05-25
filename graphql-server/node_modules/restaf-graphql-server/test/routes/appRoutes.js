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
let uuid = require('uuid');

function appRoutes () {
    let routes = {
        method: ['GET'],
        path  : `${process.env.APPNAME}`,
        config: {
            auth   : true,
            handler: getApp
        }
    }
    return routes;
}

async function getApp (req, h) {
    debugger;
    const sid = uuid.v4();

    await req.server.app.cache.set(sid, req.auth.credentials);
    console.log('in getAuth');
    console.log(req.server.app.cache.sid);
    req.cookieAuth.set({ sid });

    let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
    return h.file(`${indexHTML}`);

}
module.exports = appRoutes;