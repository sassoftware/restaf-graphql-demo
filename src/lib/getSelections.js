/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

//
// Notes: Look thru the AST and get the specified selection set
//
module.exports = function getSelections(info, selectionSet, args) {
    
    let selections = info.fieldNodes[0].selectionSet.selections;
    let index = selections.findIndex(s => s.name.value === selectionSet);
    let selection = selections[index].selectionSet.selections;

    let names = [];
    let selectionArray = selection.map(s => {
        let ts = { name: s.name.value};
        names.push(ts);
        return s.name.value
    });
   
    let newArg = {...args};
    newArg['_selections_'] = selectionArray.join(" ");
    return {args: newArg, _selections_: { _selections_: names }}
}