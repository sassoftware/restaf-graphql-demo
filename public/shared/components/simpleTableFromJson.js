/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


function SimpleTableFromJson(props) {
    let {data} = props;
    debugger;
    // set column headers 
    let columns = Object.keys(data[0]);
   
    let theadcols = columns.map(c => <th scope="col">{c}</th>);
    let thead = <thead>{theadcols}</thead>;

    let trows = data.map( (dataRow, rowno) => {
        let rone = [];
        for ( let key in dataRow){
            rone.push(<td>{dataRow[key]}</td>)
        }
        return <tr>{rone}</tr>
    })
    let tbody = <tbody>{trows}</tbody>


    let table = <div class="table-responsive-md">
                    <table class="table table-bordered">
                        {thead}
                        {tbody}
                    </table>

                </div>;
    return table;
}
function simpleTableFromJson(data, element){
    ReactDOM.render(<SimpleTableFromJson data={data} /> , document.getElementById(element));
}
