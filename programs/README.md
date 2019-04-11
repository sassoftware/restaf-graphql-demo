# sasPrograms

This repository has program snippets.

It was developed primarily for use with the restaf-graphql-demos. 

## *.sas programs
These assume that the query parameters from the graphql query are prepended as macros. For example if the graphql query is

```
 {
     wineProduction(firstyear: 2001 lastyear:2006){
       total
     }
 }
 ```
 The macros will be:
 ```
 %let firstyear=2001;
 %let lastyear=2006;
 ```

## *.casl programs
These assume that the query arguments from the query are prepended as casl dictionary and/or arrays. In these examples:

   _arg_ == this holds the the query parameters 

   _appEnv_ == this holds the application specific information like astore name, output table name etc... This is usually defined in the resolvers.

The query example above uses casl the result will look as follows:

```
_arg_ = {firstyear=2001, lastyear=2006};


## Notes

There are no hard requirements to use this approach to pass parameters. You are welcome to work up alternate ways.

But methinks this is cool :-)

