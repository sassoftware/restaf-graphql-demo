/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
/** Utility */

/**
 * 
 * getSelections - (needs more work) - search the AST and get the specified selection set and reduce
 * @module getSelections
 *                          
 * @param {object} info info(AST) sent by graphql server as the 4th parameter to the resolver
 * @param {string} selectionSet  the set we are looking for
 * @param {binary} set to TRUE is nested level (1 deep)
 * @param {object} args arguments sent by graphql to the resolver
 * 
 * @returns {object} Contains the updated arg and selections object
 * 
 */
module.exports = function getSelections(info, selectionSet, subsel, args) {
    
    let selection = info.fieldNodes[0].selectionSet.selections;

    if (subsel === true){
        let index  = selection.findIndex(s => s.name.value === selectionSet);
        selection  = selection[index].selectionSet.selections;
    }

    let newArg = (args !== null) ? {...args} : {};
    let names  = [];
    let selectionArray = selection.map(s => {
        let ts = {name: s.name.value};
        names.push(ts);
        return s.name.value
    });
    newArg['_selections_'] = selectionArray.join(" ");
    
    return {args: newArg, _selections_: { _selections_: names }};
}