/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let axios = require('axios');

 module.exports = async function queryGraphql(host, graphqlQuery, filter){
    let data = {
        query: graphqlQuery
      }

    if (filter !== null){
      data.variables = filter;
    }

    let config = {
      url            : host + '/graphql',
      withCredentials: true,
      method         : 'POST',
      data           : data
    }
    debugger;
    let r = await axios(config);
    if (r.data.hasOwnProperty('errors') === true){
      console.log(r.data.errors);
      throw r.data.errors;
    } else {
      console.log(r.data);
      return r.data.data.results;
    }
 }
