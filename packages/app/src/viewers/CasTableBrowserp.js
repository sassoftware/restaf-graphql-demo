/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 /**
  * Notes: Do not fully grok the hooks useEffect, useState etc...
  * I should but having small mental block.
  * I am 99% sure that the way I am doing it is not optimal
  * Feel free to change it.
  */

import React from "react";
import TableBrowser from "./TableBrowser";
import queryGraphql from "../queryGraphql";

function CasTableBrowserp (props) {
  const { useState, useEffect, useRef } = React;

  const [ from, setFrom ] = useState(props.from);
  const [ result, setResult ] = useState(null);
  const [ errors, setErrors ] = useState(null);


  let count = props.count;
  
  let lastTable = useRef("");

  useEffect(() => {
    lastTable.current = control.table;
  });

  let control = {
    table : props.table,
    from  : (lastTable.current !== props.table) ?  props.from : from,
    count : count,
    format: props.format
  };



  useEffect(() => {
    let gqString = `query browseCasTable($table: String, $from: Int, $count: Int, $format: Boolean){
            results: browseCasTable (from: $from, count: $count, format: $format, table: $table)
            }`;

    const handleResult = r => {
      setResult(r);
      setErrors(null);
    };

    const handleError = err => {
      setErrors(err);
      setResult(null);
    };

    if (lastTable.current !== props.table) {
      setResult(null);
      setErrors(null);
    }
    debugger;
    queryGraphql(props.host, gqString, control, handleResult, handleError);
  }, [ from, props.table ]);

  const _onScroll = direction => {
    let f = direction === "up" ? result.pagination.prev : result.pagination.next;
    setFrom(f);
    // setupDisabled(f === 1 ? true : false);
    control = {
      table : props.table,
      from  : f,
      count : result.pagination.count,
      format: props.format
    };
  
  };

  let show = (
    <div className="container">
      <div className="form-group form-group-sm">
        <div className="col-md-6">
          <div className="form-group">
            {errors}
            <button
              className="btn btn-secondary"
              disabled={(result === null || from === 1)}
              onClick={() => _onScroll("up")}>
              up
            </button>
            <button
              className="btn btn-secondary"
              disabled={(result === null || result.pagination.next === -1)}
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
