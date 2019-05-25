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
let scoreAsJson = require('./scoreAsJson');
let casSetup    = require('./casSetup');

module.exports = async function scoreMain(store, input, env) {
    let csv = makecsv(input);

    // upload data as csv
    let JSON_Parameters = {
        casout: {
            caslib : 'casuser', /* a valid caslib */
            name   : 'INPUTDATA', /* name of output file on cas server */
            replace: true
        },

        importOptions: {
            fileType: 'csv' /* type of the file being uploaded */
        }
    };

    let payload = {
        headers: { 'JSON-Parameters': JSON_Parameters },
        data   : csv,
        action : 'table.upload'
    };

    let session = await casSetup(store, null);

    let result = await store.runAction(session, payload, 'upload');
    debugger; 

    let caslStatements = `
        sessionProp.setSessOpt /
          messageLevel="ERROR";
          
        loadactionset "astore";

        action table.loadTable /
           caslib = "${env.astore.caslib}"
           path   = "${env.astore.name}.sashdat"
           casout  = {caslib = "${env.astore.caslib}"   name = "${env.astore.name}" replace=TRUE};
   
        action astore.score /
          table  = { caslib= 'casuser' name = 'INPUTDATA' } 
          rstore = { caslib= "${env.astore.caslib}" name = '${env.astore.name}' }
          out    = { caslib = 'casuser' name = 'OUTPUTDATA' replace= TRUE};

        action table.fetch r = result/
            format = TRUE
            table = { caslib = 'casuser' name = 'OUTPUTDATA' } ;
    
        send_response(result);

        `;

    // fetch results
    payload = {
        action: 'sccasl.runcasl',
        data  : { code: caslStatements}
    }

    result    = await store.runAction(session, payload);
    let score = scoreAsJson(result, 'Fetch');
    await store.apiCall(session.links('delete'));
    return {score: score[0]};
}

function makecsv (data) {

    let row1 = null;
    let row2 = null; 
    for (let k in data) {
        if (row2 === null) {
            row2 = data[k];
            row1 = k;
        } else {
            row2 = row2 + ',' + data[k];
            row1 = row1 + ',' + k;
        }
    }

   return row1 + '\n' + row2 + '\n';

}
