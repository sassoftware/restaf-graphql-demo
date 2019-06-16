/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
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
 let casResults     = require('./casResults');
 let browseCasTable = require('./browseCasTable');
 /*
 let casColumns     = require('./casColumns');
 let casRows        = require('./casRows');
 let casPagination  = require('./casPagination');
 */

 const GraphQLJSON = require('graphql-type-json');

  // let winesCas       = require('./winesCas');

 let wineProductionCas = require('./wineProductionCas'); 

const Query = {
    test: () => {
        return "Hello There - Welcome to demo of Graphql for SAS Viya";
    },
    reports: (parent, args, context, info) => reports(parent, args, context, info),
    report : (parent, args, context, info) => reportView(parent, args, context, info),

    scoreLoan: (parent,args, context, info)  => scoreLoan(parent, args, context, info),

    sasPrint      : (parent, args, context, info) => sasPrint (parent, args, context, info),
    budget        : (parent, args, context, info) => budget (parent, args, context, info),
    wineProduction: (parent, args, context, info) => wineProduction (parent, args, context, info),

    wineProductionCas: (parent, args, context, info) => wineProductionCas (parent, args, context, info),

    browseCasTable: (parent, args, content, info) => browseCasTable(parent, args, content, info)
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

const WineProductionCas = {
    wines: (parent,args, context, info)  => casResults (parent, args, context, info)
    // Note: In the original blog winesCas.js was used as the resolver.
}

/*
const CasTable = {
    allData:  GraphQLJSON
}

const CasTable = {
    columns   : (parent, args, context, info) => casColumns(parent, args, context, info),
    rows      : (parent, args, context, info) => casRows(parent, args, context, info),
    pagination: (parent, args, context, info) => casPagination(parent, args, context, info)

}
*/

module.exports = {Query, ReportView, SASResults, WineProduction, WineProductionCas};
 