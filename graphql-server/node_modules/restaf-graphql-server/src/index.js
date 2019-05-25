#!/usr/bin/env node
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

let iServer = require ('./iServer.js');
let parseInput = require('./parseInput');

function index (typeDefs, resolvers, userRoutes) {
    let argv      = require('yargs').argv;
    let env       = (argv.env == null) ? null : argv.env;
    let appenv    = (argv.appenv == null) ? null : argv.appenv;
    if (userRoutes == null) { /* temp fix until all users catchup*/ 
        userRoutes = null;
    }

    console.log (`env   : ${env}`);
    console.log (`appenv: ${appenv}`);
    parseInput (env, appenv , (err, r) => {
        iServer (typeDefs, resolvers, userRoutes, r.asset, r.appEnv)
            .then (() => console.log('-------------------------------------------------------'))
            .catch (e => console.log(e))
    });
    
}

module.exports = index;






