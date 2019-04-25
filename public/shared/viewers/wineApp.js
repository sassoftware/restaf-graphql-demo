/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
 'use strict';
 function WineApp(props){
    debugger;
    const {useState} = React;
    let [selections, setSelections]           = useState(null);
    let [reportSelection, setReportSelection] = useState(null);
    let [fromYear, setFromYearSelection]      = useState(null);
    let [toYear, setToYearSelection]          = useState(null);
    let [resultValues, setResultValues]       = useState(null);

    let {host} = props;
    const products = [
        { value: 'year', label: 'Year'},
        { value: 'merlot', label: 'Merlot'},
        { value: 'chardonnay', label: 'Chardonnay'},
        { value: 'cabernet', label: 'Cabernet Sauvignon'},
        { value: 'pinot', label: 'Pinot Noir'},
        { value: 'twobit', label: 'Twobit Jack'}
        ];
   
      const report = [
        {value: 'ods', label: 'ODS'},
        {value: 'log', label: 'Log'}
      ];
    
      const years = [
        {value: 2000, label: '2000'},
        {value: 2001, label: '2001'},
        {value: 2002, label: '2002'},
        {value: 2003, label: '2003'},
        {value: 2004, label: '2004'},
        {value: 2005, label: '2005'},
        {value: 2006, label: '2006'}
      ];

    const _onSelection = (selectedValues) => {
        setSelections(selectedValues);
    }

    const _onReportSelection = (selectedValues) => {
        setReportSelection(selectedValues);
    }
    const _onFromYearSelection = (selectedValues) => {
        setFromYearSelection(selectedValues);
    }
    const _onToYearSelection = (selectedValues) => {
        setToYearSelection(selectedValues);
    }
    
    const _onSubmit = () => {
        console.log(host);
        console.log('submit');
        console.log(reportSelection);
        console.log(selections);

        let qvars = '';
        selections.forEach( r => {
            qvars = qvars + ' ' + r.value;
        });

        let rvars = '';
        reportSelections.forEach( r => {
            rvars = rvars + ' ' + r.value;
        })
        let qt = {
            from: fromYear,
            to  : toYear
        };
        let gqString = `query wineProduction(from: ${fromYear} to: ${toYear}) {
                          ${qvars} }`;
        if (rreportSelections.length > 0 ) {
            gqString = gqstring + ` report { ${rvars} }`
        }


    }
    let show =  <div className="container">
                  
                    <div className="form-group form-group-sm">
                        
                            <div className="col-md-6">
                                <div className="form-group">
                                    <small id="fromsel"> From</small>
                                    <Select value={fromYear}  onChange={_onFromYearSelection} options={years}
                                            closeMenuOnSelect={true} 
                                        />
                                </div>
                                <div className="form-group">
                                    <small id="tosel"> To</small>
                                    <Select value={toYear}  onChange={_onToYearSelection} options={years}
                                            closeMenuOnSelect={true} 
                                            
                                        />
                                </div>
                                <div className="form-group">
                                    <small id="helpsel"> Wine Selections</small>
                                    <Select value={selections} isMulti={true} onChange={_onSelection} options={products}
                                            closeMenuOnSelect={false} isOpen={true}
                                        />
                                </div>
                                <div className="form-group">
                                    <small id="repsel"> Report Options</small>
                                    <Select value={reportSelection} isMulti={true} onChange={_onReportSelection} options={report}
                                        closeMenuOnSelect={false} isOpen={true}
                                    />     
                                </div>
                            
                        </div>         
                </div>
             
                <button class="btn btn-primary"  onClick={_onSubmit}>Submit</button> 
            </div>
    return show;
}

function wineApp(host, element){
    ReactDOM.render(<WineApp host={host}/>, document.getElementById(element))
}