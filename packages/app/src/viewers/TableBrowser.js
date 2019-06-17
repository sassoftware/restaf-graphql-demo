/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

// eslint-disable-next-line no-unused-vars
import React from "react";

function TableBrowser(props) {

    let {columns, rows} = props.data;

    let theadcols = columns.map(c => <th key={c.name} scope="col">{c.name}</th>);
    let thead = <thead><tr>{theadcols}</tr></thead>;

    let trows = rows.map((dataRow, rowno) => {
        let rone = dataRow.map((r,i) => {
            return <td key={rowno+i}>{r}</td>
        })
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
export default TableBrowser;

