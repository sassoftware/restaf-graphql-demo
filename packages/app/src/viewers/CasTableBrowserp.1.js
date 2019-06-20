/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import TableBrowser from "./TableBrowser";
import queryGraphql from "../queryGraphql";

function CasTableBrowserp (props) {
  const {useState,  useEffect } = React;

  debugger;


  let filter = {
    table : props.table,
    from  : props.from,
    count : props.count,
    format: props.format
  };
  let [ control, setControl ] = useState(filter);

  let result       = null;
  let errors       = null;
  let upDisabled   = true;
  let downDisabled = true;


  /*
  let [ result, setResult ] = useState(null); 
  let [ errors, setErrors ] = useState(null);
  let [ upDisabled, setUpDisabled ] = useState(true);
  let [ downDisabled, setDownDisabled ] = useState(true);
  */

  
  useEffect(() => {
    let gqString = `query browseCasTable($table: String, $from: Int, $count: Int, $format: Boolean){
            results: browseCasTable (from: $from, count: $count, format: $format, table: $table)
            }`;

    const handleResult = r => {
      let { pagination } = r;
      upDisabled   = (control.from === 1)? true : false;
      downDisabled = (pagination.next === -1) ? true : false;
      result  = r;
      errors  = null;
    };

    const handleError = err => {
      errors = err;
      result = null; 
    };
    debugger;
   
    queryGraphql(props.host, gqString, control, handleResult, handleError);
  }, [ filter ]);

  const _onScroll = direction => {
    let from  = direction === "up" ? result.pagination.prev : result.pagination.next;
    let count = result.pagination.count;
    let filter = {
      table : props.table,
      from  : from,
      count : count,
      format: props.format
    };
    setControl(filter);
  };
 
console.log(result);
  let show = (
    <div className="container">
      <div className="form-group form-group-sm">
        <div className="col-md-6">
          <div className="form-group">
            {errors}
            <button
              className="btn btn-secondary"
              disabled={upDisabled}
              onClick={() => _onScroll("up")}>
              up
            </button>
            <button
              className="btn btn-secondary"
              disabled={downDisabled}
              onClick={() => _onScroll("down")}>
              down
            </button>
            <div>{result !== null ? <TableBrowser data={result} /> : null}</div>
          </div>
        </div>
      </div>
    </div>
  );
  return show;
}
export default CasTableBrowserp;
