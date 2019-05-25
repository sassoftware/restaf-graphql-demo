# restaf-graphql-server

The restaf-graphql-server is designed to work with SAS Vya. It uses three key open source projects"

1. [Apollo's graphql-server](https://www.apollographql.com/docs/apollo-server/)

2. [hapijs](https://hapijs.com)

3. [restaf](https://github.com/sassoftware/restaf)

The primary purposes of this respository are:

1. Hooks in Viya 3.4 authentication - uses authorization_code

2. Serve up user apps and/or graphql playground- convenient for deploying self-contained app

3. Setup restaf store for each user

See CHANGELOG.md for current and future features.



## Disclaimer

In this project I have chosen to use Apollo Server and hapijs - mainly due to my familiarity with these open source software libraries.  

## Installing the server as a dependency

```script
npm install restaf-graphql-server

```

Please see [restaf-graphql-demo](https://github.com/sassoftware/restaf-graphql-demo) for details on how to use this  server.