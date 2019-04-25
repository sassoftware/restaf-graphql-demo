/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

function DisplayODS(props) {
    let {odsHTML} = props;
    let ihtml = {__html: odsHTML};
    debugger;
    return (
        <div dangerouslySetInnerHTML={ihtml}></div>
    )
}

function displayODS(odsHTML, element) {
    ReactDOM.render(<DisplayODS odsHTML={odsHTML}/>, document.getElementById(element));
}