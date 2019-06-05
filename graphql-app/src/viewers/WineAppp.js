import React from "react";
import SimpleTableFromJsonp from "./SimpleTableFromJsonp";
import DisplayODSp from "./DisplayODSp";
import Select from "react-select";
import queryGraphql from "../queryGraphql";

function WineAppp(props) {
  const { useState } = React;
  let [selections, setSelections] = useState(null);
  let [reportSelection, setReportSelection] = useState(null);
  let [fromYear, setFromYearSelection] = useState(null);
  let [toYear, setToYearSelection] = useState(null);
  let [resultValues, setResultValues] = useState(null);
  let [reportValues, setReportValues] = useState(null);
  let [graphqlQuery] = useState(props.graphqlQuery);

  let { host } = props;

  //
  // TBD:
  //    Get all the hard-coded product values from the server using graphql
  //    and make the calls using useEffect
  //

  const products = [
    { value: "year", label: "Year" },
    { value: "merlot", label: "Merlot" },
    { value: "chardonnay", label: "Chardonnay" },
    { value: "cabernet", label: "Cabernet Sauvignon" },
    { value: "pinot", label: "Pinot Noir" },
    { value: "twobit", label: "Twobit Jack" }
  ];

  const report = [
    { value: "ods", label: "ODS" },
    { value: "log", label: "Log" }
  ];

  const years = [
    { value: 2000, label: "2000" },
    { value: 2001, label: "2001" },
    { value: 2002, label: "2002" },
    { value: 2003, label: "2003" },
    { value: 2004, label: "2004" },
    { value: 2005, label: "2005" },
    { value: 2006, label: "2006" }
  ];

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

    let gqString = `query ${graphqlQuery}($from: Int, $to: Int){
          results: ${graphqlQuery}(from: $from, to: $to) {
            wines {
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
    queryGraphql(host, gqString, filter)
      .then(r => {
        debugger;
        let res = r;
        setResultValues(res.wines);
        if (res.report != null) {
          setReportValues(res.report);
        }
      })
      .catch(e => {
        console.log(JSON.stringify(e, null,4));
        alert(JSON.stringify(e, null,4));
      });
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
            <small id="helpsel"> Wine Selections</small>
            <Select
              value={selections}
              isMulti={true}
              onChange={_onSelection}
              options={products}
              closeMenuOnSelect={false}
              isOpen={true}
            />
          </div>
          {graphqlQuery === "wineProduction" ? (
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
