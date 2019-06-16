/*   
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.   
* SPDX-License-Identifier: Apache-2.0   
*/
import React from "react";
import SimpleTableFromJsonp from "./SimpleTableFromJsonp";
import DisplayODSp from "./DisplayODSp";
import Select from "react-select";
import queryGraphql from "../queryGraphql";

function WineAppp(props) {
  const { useState } = React;
  let [selections, setSelections]           = useState(null);
  let [reportSelection, setReportSelection] = useState(null);
  let [fromYear, setFromYearSelection]      = useState(null);
  let [toYear, setToYearSelection]          = useState(null);
  let [resultValues, setResultValues]       = useState(null);
  let [reportValues, setReportValues]       = useState(null);
  let [graphqlQuery]                        = useState(props.graphqlQuery);
  let [products]                            = useState(props.products);
  let [showReport]                          = useState(props.report);
  let [years]                               = useState(props.years);
  let [productType]                         = useState(props.productType);
  let [productTitle]                        = useState(props.productTitle);
  let [errors, setError]                    = useState(null);

  let { host } = props;

  const report = [
    { value: "ods", label: "ODS" },
    { value: "log", label: "Log" }
  ];

  //
  // TBD:
  //    Get all the hard-coded product values from the server using graphql
  //    and make the calls using useEffect
  //

  const _onSelection = selectedValues => {
    setSelections(selectedValues.length > 0 ? selectedValues : null);
  };

  const _onReportSelection = selectedValues => {
    setReportSelection(selectedValues.length > 0 ? selectedValues : null);
  };
  const _onFromYearSelection = selectedValues => {
    setFromYearSelection(selectedValues);
  };
  const _onToYearSelection = selectedValues => {
    setToYearSelection(selectedValues);
  };

  const _onSubmit = () => {
    if (selections === null || fromYear === null || toYear === null) {
      alert("Missing Information");
      return;
    }

    let qvars = "";
    if (selections !== null) {
      selections.forEach(r => {
        qvars = qvars + " " + r.value;
      });
    }

    let rvars = "";
    if (reportSelection !== null) {
      rvars = "report {";
      reportSelection.forEach(r => {
        rvars = rvars + " " + r.value;
      });
      rvars = rvars + " }";
    }

    const resultcb = (r) => {
      setResultValues(r[productType]);
      if (r.report != null) {
        setReportValues(r.report);
      }
    }

    let gqString = `query ${graphqlQuery}($from: Int, $to: Int){
          results: ${graphqlQuery}(from: $from, to: $to) {
            ${productType} {
                ${qvars} 
              } 
              ${rvars}
            } 
          }`;

    let filter = {
      from: fromYear.value,
      to  : toYear.value
    };

    setReportValues(null);
    setResultValues(null);
    debugger;
    queryGraphql(host, gqString, filter, resultcb, setError);

  };

  let show = (
    <div className="container">
      <div className="form-group form-group-sm">
        <div className="col-md-6">
          <div className="form-group">
            <small id="fromsel"> From</small>
            <Select
              value={fromYear}
              onChange={_onFromYearSelection}
              options={years}
              closeMenuOnSelect={true}
            />
          </div>
          <div className="form-group">
            <small id="tosel"> To</small>
            <Select
              value={toYear}
              onChange={_onToYearSelection}
              options={years}
              closeMenuOnSelect={true}
            />
          </div>
          <div className="form-group">
            <small id="helpsel"> {productTitle}</small>
            <Select
              value={selections}
              isMulti={true}
              onChange={_onSelection}
              options={products}
              closeMenuOnSelect={false}
              isOpen={true}
            />
          </div>
          {showReport === true ? (
            <div className="form-group">
              <small id="repsel"> Report Options</small>
              <Select
                value={reportSelection}
                isMulti={true}
                onChange={_onReportSelection}
                options={report}
                closeMenuOnSelect={false}
                isOpen={true}
              />
            </div>
          ) : null}
        </div>
      </div>

      <button className="btn btn-primary" onClick={_onSubmit}>
        Submit
      </button>
      <br />
      {errors}
      <div>
        {resultValues !== null ? (
          <SimpleTableFromJsonp data={resultValues} />
        ) : null}
      </div>
      <br />
      <div>
        {reportValues !== null && reportValues.ods !== null ? (
          <DisplayODSp odsHTML={reportValues.ods}> </DisplayODSp>
        ) : null}
      </div>
      <br />
      <div>
        {reportValues !== null && reportValues.log !== null ? (
          <DisplayODSp odsHTML={reportValues.log} />
        ) : null}
      </div>
    </div>
  );

  return show;
}
export default WineAppp;
