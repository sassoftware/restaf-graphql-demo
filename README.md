# restaf-graphql-demo

This repository has two projects

1. graphql-server - This the app where you specify your schema and resolvers and start the graphql server.

2. graphql-app - This is a collection of web apps demonstrating the UI for the sample graphql queries. This assumes that you have done step 1.

---

## Setting up this demo

---

## Quick Start

1. Obtain a clientID and clientSecret for the authorization_code flow:
    - ClientId = graphqlserver
    - ClientSecret = secret
    - redirect = http://localhost:5000/graphqlserver

2. npm install the dependencies, configure

    - open a terminal/shell window
    - cd graphql-server
    - npm install
    - edit app.env and set the value of VIYA_SERVER to point to your Viya Server

    - open a terminal/shell window
    - cd graphql-app
    - npm install

3. Starting the apps

    - In each of the open shells enter npm start
    - Visit the url indicated in the graphql-app shell.
    - You will be prompted for userid and password.
    - Once authenticated you should be shown the app.
    - Visit each of the links to see the demo in action.
