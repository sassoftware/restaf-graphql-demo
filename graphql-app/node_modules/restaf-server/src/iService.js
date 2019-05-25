
/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

'use strict';

let debug          = require('debug');
let debugSetup     = debug('setup');
let debugProxy     = debug('proxy');
let proxyLogger    = debug('proxylogger');
let responseLogger = debug('response');

import server from './server';
let fs = require('fs');
let boom = require('boom');
let request = require('request');
/* require( 'request-debug' )( request ); */
let os = require('os');
let uuid = require('uuid');


function iService(uTable, useDefault, asset, rootHandler, allAppEnv) {
    
    process.env.APPHOST = (process.env.APPHOST === '*') ? os.hostname() : process.env.APPHOST;
    let appName = '/' + process.env.APPNAME;
    let auth1 = {};
    let auth2 = false;
    let handleOthers;
    let defaultMaxBytes = 10485760; 

    let maxBytes;
    if (isNaN(process.env.PAYLOADMAXBYTES) ) {
        maxBytes = defaultMaxBytes;
    } else {
        maxBytes = Number(process.env.PAYLOADMAXBYTES);
    }

    if (process.env.PROXYSERVER === 'YES') {
        process.env.OAUTH2 = 'YES';
    }
    console.log(`appName ${appName}`);
    console.log(`asset ${asset} `);
    console.log(`uTable ${uTable}`);
    console.log( allAppEnv);

    let getAppEnv = async (req, h) => {
        return allAppEnv;
    }

    if (process.env.OAUTH2 === 'YES') {
        auth1 = {
            mode: 'required',
            strategy: 'sas'
        }; 
    }
    else {
        auth1 = false;
    }

    // see if appenv was overridden
    
    let hasAppEnv = false;
    if (uTable !== null ) {
        hasAppEnv = uTable.find( u => u.path === '/appenv');
    }
    console.log(hasAppEnv);
    // end temp patch
    let defaultTable =
        [{
            method: ['GET'],
            path: `${appName}`,
            config: {
                auth: auth1,
                handler: getApp
            }
        }, {
            method: ['GET'],
            path: `${appName}/{param*}`,
            config: {
                auth    : auth2,
                handler: getApp2
            }

        }, {
            method: ['GET'],
            path: `${appName}/callback${appName}`,
            config: {
                handler: AppCallback
            }

        }, {
            method: ['GET'],
            path: `/shared/{param*}`,
            config: {
                auth   :  false,
                handler: getShared
            }
        }
    
        ];

    if ( hasAppEnv === false ){
        console.log('Setting default /appenv')
       defaultTable.push ( {
        method: ['GET'],
        path: '/appenv',
        config: {
            auth: false,
            handler: getAppEnv
        }
        } );
    } else {
        console.log('Setting custom /appenv');
    }

    // Tried payload.parse = false -- way too much code to handle payload
    if (process.env.PROXYSERVER === 'YES') {
        let handleOthers = [
            {
            method: ['PUT', 'POST', 'PATCH'],
            path: '/{params*}',
            config: {
                payload: {
                    maxBytes: maxBytes
                 },
                handler: handleProxy
                }
            }, {
            method: ['GET'],
            path  : '/{params*}',
            config: {
                handler: handleProxy
            }
        }
        ];
        defaultTable = [ ...defaultTable, ...handleOthers ];
    } else {
        let handleOthers = {
            method: ['GET'],
            path: '/{param*}',
            config: {
                auth   : false,
                handler: getApp2
            }
        };
        defaultTable = [...defaultTable, handleOthers];
    }

    let userRouterTable;
    if (uTable !== null) {
        if (useDefault === true) {
            userRouterTable = [...defaultTable, ...uTable];
        } else {
            userRouterTable = [...uTable];
        }
    } else {
        userRouterTable = [...defaultTable];
    }
    
    debugSetup(console.log(JSON.stringify(userRouterTable, null, 4)));
    server(userRouterTable, asset);

};



async function getApp(req, h) {
    
    if (process.env.OAUTH2 === 'YES') {
        return getAuthApp(null, req, h)
    } else {
        let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
        return h.file(indexHTML);
    }
}

async function getAuthApp(rootHandler, req, h) {
    const sid = uuid.v4();
    
    await req.server.app.cache.set(sid, req.auth.credentials);
    if (process.env.PROXYSERVER === 'YES' ) {
        req.cookieAuth.set({sid});
    } 
    
    let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
    return h.file(`${indexHTML}`);
}

async function handleProxy(req, h) {  
    let token;
    try {
        token = await getToken(req, h);
        
        let proxyResponse = await handleProxyRequest(req, h, token);

        let response = h.response(proxyResponse.body);
        for (let hkey in proxyResponse.headers) {
            response.header(hkey, proxyResponse.headers[hkey]);
        }
        return response;
    }
    catch (err) {
        return boom.unauthorized(err)
    }
}
async function getToken(req, h) {   
    
    if (req.auth.credentials !== null) {     
        return req.auth.credentials.token;
     } else {     
        let sid = await req.server.app.cache.get(sid);     
        return sid.credentials;
    }
}
function handleProxyRequest(req, h, token) {
    return new Promise((resolve, reject) => {
        
       // let uri = `${process.env.SAS_PROTOCOL}${process.env.VIYA_SERVER}/${req.params.params}`;
        let uri = `${process.env.VIYA_SERVER}/${req.params.params}`;
        let headers = { ...req.headers };
        delete headers.host;
        delete headers['user-agent'];
        delete headers.origin;
        delete headers.referer;
        delete headers.connection;
        if (headers.cookie) {
            delete headers.cookie;
        }
        
        let config = {
            url: uri,
            method: req.method,
            headers: headers,
            gzip: true,
            auth: {
                bearer: token
            }
        };


        if (req.payload != null) {
            // debugProxy(headers['content-type']);
            if (headers['content-type'] === 'application/octet-stream') {
                config.body = req.payload;
            } else {
                config.body = (typeof req.payload === 'object') ? JSON.stringify(req.payload) : req.payload;
            }
        }

        if (req.query !== null && Object.keys(req.query).length > 0) {
            config.qs = req.query;
        }

        debugProxy(JSON.stringify(config, null, 4));
        proxyLogger(config.url);
        request(config, (err, response, body) => {
            
            if (err) {
                reject(err);
            } else {
                
                responseLogger({ url: `------------------------------------------${config.url}` });
                responseLogger(req.query);
                responseLogger((typeof body === 'string' ? { body: body } : body));
                if (response.headers.hasOwnProperty('content-encoding')) {
                    delete response.headers['content-encoding'];
                }
                responseLogger(response.headers['content-coding']);
                
                resolve({ headers: response.headers, body: body });

            }
        });
    });
}


async function AppCallback(req, h) {
    
    proxyLogger('In callback');
    let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
    return h.file(`${indexHTML}`);
}

//
// get app server files
//

async function getIcon(req, h) {
    
    return h.file('favicon.ico');
}

async function getApp2(req, h) {
    return h.file(req.params.param);
}

async function getShared(req, h) {
    
    return h.file(`shared/${req.params.param}`);
}

function createPayload( srcName, cb ) {
    fs.readFile(srcName, 'utf8', (err, src) => {
        if ( err ) {
            console.log(`Failed to read ${srcName}`);
            cb(err);
        } else {
            try {
                console.log(src);
                let f = new Function( src );
                console.log('compile completed');
                cb( null, f);
            }
            catch ( err ) {
               console.log(' Failed to parse the javascript file');
               cb(err);
            }
        }
    })
}
export default iService;

