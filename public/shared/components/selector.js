/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

function Selector (props) {
    let { options, isMulti, onChange, selections } = props;

    return
    <Select
        value={selections}
        onChange={onChange}
        options={options} />
}




