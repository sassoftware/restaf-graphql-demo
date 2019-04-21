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
 let reports        = require('./reports');
 let reportView     = require('./reportView');
 let reportImage    = require('./reportImage');
 let reportUrl      = require('./reportUrl');
 let scoreLoan      = require('./scoreLoan');
 let sasPrint       = require('./sasPrint');
 let sasOds         = require('./sasOds');
 let sasLog         = require('./sasLog');
 let sasTables      = require('./sasTables');
 let budget         = require('./budget');
 let sasResults     = require('./sasResults');     
 let wineProduction = require('./wineProduction');  
 let wines          = require('./wines');

const Query = {
    test: () => {
        debugger;
        return "Hello There - Welcome to demo of Graphql for SAS Viya";
    },
    reports: (parent, args, context, info) => reports(parent, args, context, info),
    report : (parent, args, context, info) => reportView(parent, args, context, info),

    scoreLoan: (parent,args, context, info)  => scoreLoan(parent, args, context, info),

    sasPrint      : (parent, args, context, info) => sasPrint (parent, args, context, info),
    budget        : (parent, args, context, info) => budget (parent, args, context, info),
    wineProduction: (parent, args, context, info) => wineProduction (parent, args, context, info),
}

const ReportView = {
    image: (parent,args, context, info)  => reportImage (parent, args, context, info),
    url  : (parent,args, context, info)  => reportUrl (parent, args, context, info)
}

const SASResults = {
    ods   : (parent,args, context, info)  => sasOds (parent, args, context, info),
    log   : (parent,args, context, info)  => sasLog (parent, args, context, info),
    tables: (parent,args, context, info)  => sasTables (parent, args, context, info)
}

const WineProduction = {
    report: (parent,args, context, info)  => sasResults (parent, args, context, info),
    wines : (parent,args, context, info)  => wines (parent, args, context, info)
}

module.exports = {Query, ReportView, SASResults, WineProduction};
 