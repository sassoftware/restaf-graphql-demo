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

const { ApolloServer } = require('apollo-server-hapi');
let Hapi      = require('hapi');
let inert     = require('inert');
let NodeCache = require('node-cache-promise');

let routeTable   = require('./handlers/routeTable');
let SASauth      = require('./SASauth');

async function iServer (typeDefs, resolvers, userRoutes, asset ,appEnv) {
 
    //
    // initial setup of hapi
    //

    let appName = (process.env.APPNAME == null || process.env.APPNAME === '/') ? '' : process.env.APPNAME;
    let sConfig = {
        port: process.env.APPPORT,
        host: process.env.APPHOST,
     
        routes: {
            cors: {
                origin     : ['*'],
                credentials: true,

                additionalHeaders       : ['multipart/form-data', 'content-disposition'],
                additionalExposedHeaders: ['location']
            }
        }
    };
    if (asset !== null) {
        sConfig.routes.files = {relativeTo: asset};
    }
 
    let app = Hapi.server(sConfig);

    let nodeCacheOptions = {
        stdTTL        : 36000,
        checkPeriod   : 3600,
        errorOnMissing: true,
        useClones     : false,
        deleteOnExpire: true
    }
    let storeCache = new NodeCache(nodeCacheOptions);
    
    app.app.cache = storeCache;

    //
    // setup ApolloServer
    //
    let t = (process.env.APPHOST === '0.0.0.0') ? `localhost` : `${process.env.APPHOST}`;
    const server = new ApolloServer(
        { 
            typeDefs, 
            resolvers,
            cors      : true,
            playground: {
                settings: {
                    'editor.cursorShape' : 'line', // possible values: 'line', 'block', 'underline'
                    'editor.fontFamily'  : `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
                    'editor.fontSize'    : 14,
                    'editor.reuseHeaders': true, // new tab reuses headers from last tab
                    'editor.theme'       : 'light', // possible values: 'dark', 'light'
        
                    'general.betaUpdates': false,
        
                    'prettier.printWidth': 80,
                    'prettier.tabWidth'  : 2,
                    'prettier.useTabs'   : true,
        
                    'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
        
                    'schema.polling.enable'        : true, // enables automatic schema polling
                    'schema.polling.endpointFilter': `*${t}*`, // endpoint filter for schema polling
                    'schema.polling.interval'      : 2000, // schema polling interval in ms
                    'schema.disableComments'       : false,
                    'tracing.hideTracingResponse'  : true
                }
            },
            context: async (req) => {
                //
                // setup context object with restaf store
                //
                let {request} = req;
                let sid   = request.auth.artifacts.sid;
                let cache = request.server.app.cache;
                let store = await cache.get(sid+'store');
                return {store: store};
        }
    }
    );


    await server.installSubscriptionHandlers(app.listener);

    //
    // setup SAS Oauth2 handling
    //

    await SASauth(app);

    //
    // complete setting up hapi
    //
    let defaultRouteTable = routeTable(appEnv, userRoutes);
    console.log(defaultRouteTable);

    
    await app.register(inert);
    app.route (defaultRouteTable);

    //
    // connect ApolloServer with hapi
    //

    await server.applyMiddleware({app,
       
        route: {
            auth: {
                mode: 'optional'
                }
            } 
        }
        );
    
    //
    // start hapi server
    //    
    debugger;
    await app.start();
   debugger;
    let u = (process.env.APPHOST === '0.0.0.0') ? `http://localhost:${process.env.APPPORT}` : app.info.uri;
    console.log(`To logon to the server visit ${u}/${appName}`);
}

module.exports = iServer;
