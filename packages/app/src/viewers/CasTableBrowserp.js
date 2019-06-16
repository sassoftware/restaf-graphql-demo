/*   
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.   
* SPDX-License-Identifier: Apache-2.0   
*/
import React from "react";
import TableBrowser from "./TableBrowser";
import queryGraphql from "../queryGraphql";
import { addResolveFunctionsToSchema } from 'graphql-tools';

function CasTableBrowserp(props) {
    const {useState, useEffect} = React;
    const [table, setTable]  = useState(props.table);
    const [host, setHost]    = useState(props.host);
    const [format,setFormat] = useState(props.format);
    const [from, setFrom]    = useState(props.from);
    const [count, setCount]  = useState(props.count);
    const [result, setResult] = useState(null);
    const [errors, setError]  = useState(null);
    const [upDisabled, setupDisabled] = useState(true);
    const [downDisabled, setdownDisabled] =useState(true);
   



    useEffect (() => {

        let gqString = `query browseCasTable($table: String, $from: Int, $count: Int, $format: Boolean){
            results: browseCasTable (from: $from, count: $count, format: $format, table: $table)
            }`;

        let filter = {
            table : table,
            from  : from,
            count : count,
            format: format
        };

        const handleResult = (r) => {
            let {pagination} = r;
            setupDisabled((from === 1 ) ? true : false);
            setdownDisabled ((pagination.next === -1) ?  true : false);
            setResult(r);
        }
       
        setError(null);
        debugger;
        queryGraphql(host, gqString, filter, handleResult, setError);
        
    })

    const _onScroll = (direction) => {
        let f = (direction === 'up') ? result.pagination.prev : result.pagination.next;
        setFrom(f);
        setCount(result.pagination.count);
    }

    console.log(upDisabled);
    console.log(downDisabled);

   let show = (
       <div className="container">
           <div className="form-group form-group-sm">
               <div className="col-md-6">
                   <div className="form-group">
                       {errors}
                       <button className="btn btn-secondary" disabled={upDisabled} onClick={() => _onScroll('up')}>
                           up
                       </button>
                       <button className="btn btn-secondary" disabled={downDisabled} onClick={() => _onScroll('down')}>
                           down
                       </button>
                       <div>
                           {result !== null ? (
                               <TableBrowser data={result} />
                           ) : null}
                       </div>
                   </div>
               </div>
           </div>
       </div>);
    return show;
}
export default CasTableBrowserp;