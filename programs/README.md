# Notes

This directory has program snippets that are used in the demos.


## *.sas programs

The src/lib/spBase preprends the  macro statements for the query parameters to the *.sas snippets. For example if the graphql query is

```graphql
 {
     wineProduction(firstyear: 2001 lastyear:2006){
       total
     }
 }
 ```

 The generated macros will be:

 %let firstyear=2001;
 %let lastyear=2006;


## *.casl programs

The src/lib/caslBase.js prepends a casl dictionary _arg_ for the query parameters to the *.casl snippets.

   _arg_ == this holds the the query parameters 

The query example above uses casl the result will look as follows:

\_arg\_ = {firstyear=2001, lastyear=2006};


## jsonToDict functon

The function src/lib/jsonToDict.js converts standard js/JSON objects to a string that has the casl equivalent of these objects. You can use this function in your own resolvers to send any js object as a "parameter" to the casl program. For an example see src/lib/caslBase.js.