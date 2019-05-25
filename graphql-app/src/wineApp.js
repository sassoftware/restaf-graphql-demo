/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import ReactDOM from 'react-dom';
import {WineAppp} from './viewers';
function wineApp(host, graphqlQuery, element){
    ReactDOM.render(<WineAppp graphqlQuery={graphqlQuery} host={host}/>, document.getElementById(element))
}
export default wineApp;
