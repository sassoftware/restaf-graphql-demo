/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {SimpleTableFromJsonp} from './viewers';

function simpleTableFromJson(data, element){
    ReactDOM.render(<SimpleTableFromJsonp data={data} /> , document.getElementById(element));
}
 export default simpleTableFromJson;