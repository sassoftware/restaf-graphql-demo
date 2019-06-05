/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
function DisplayODSp(props) {
    let {odsHTML} = props;
    let ihtml = {__html: odsHTML};
    return (
        <div dangerouslySetInnerHTML={ihtml}></div>
    )
}
export default DisplayODSp;