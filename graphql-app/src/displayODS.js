/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import {DisplayODSp} from './viewers';
function displayODS(odsHTML, element) {
    ReactDOM.render(<DisplayODSp odsHTML={odsHTML}/>, document.getElementById(element));
}
export default displayODS;