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

let restafGraphqlServer     = require('./src/index');
   
// let restafGraphqlServer = require('restaf-graphql-server');
let resolvers           = require('./test/resolvers');
let typeDefs            = require('./test/schema/schema.graphql');
let userRoutes          = getUserRoutes(); /* set to null if you have no custom routes */

debugger;

// 
// Start server
//

restafGraphqlServer(typeDefs, resolvers,userRoutes);

// 
// You can have as many additional routes as you want
// Reserved paths: /, /graphql, /appenv, /shared/{param*} /{param*}
// The code below is for demo purpose only
//
function getUserRoutes () {
  let handler =
      [
          {
              method: ['GET'],
              path  : `/test/{param*}`,
              config: {
                  auth   : false,
                  cors   : true,
                  handler: testRoute
              }
          }

      ];
  return handler;
}

// eslint-disable-next-line no-unused-vars
async function testRoute (req, h){
return 'Hello';
}

