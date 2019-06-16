/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


 async function postGraphqlQuery(host, graphqlQuery, filter){
    let data = {
        query: graphqlQuery
      }

    if ( filter !== null){
      data.variables = filter;
    }

    let config = {
      url: host + '/graphql',
      withCredentials: true,
      method: 'POST',
      data: data
    }
    
    let r = await axios(config);
    if ( r.data.hasOwnProperty('errors') === true){
      throw r.data.errors;
    } else {
      return r.data.data.results;
    }
 }
