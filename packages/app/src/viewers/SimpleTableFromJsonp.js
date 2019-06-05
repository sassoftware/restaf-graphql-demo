/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

// eslint-disable-next-line no-unused-vars
import React from 'react';
function SimpleTableFromJsonp(props) {
    let {data} = props;
    // set column headers 
    let columns = Object.keys(data[0]);
   
    let theadcols = columns.map(c => <th key={c} scope="col">{c}</th>);
    let thead = <thead><tr>{theadcols}</tr></thead>;

    let trows = data.map((dataRow, rowno) => {
        let rone = [];
        for (let key in dataRow){
            rone.push(<td key={key}>{dataRow[key]}</td>)
        }
        return <tr key={rowno}>{rone}</tr>
    })
    let tbody = <tbody>{trows}</tbody>


    let table = <div className="table-responsive-md">
                    <table className="table table-bordered">
                        {thead}
                        {tbody}
                    </table>

                </div>;
    return table;
}
export default SimpleTableFromJsonp;

