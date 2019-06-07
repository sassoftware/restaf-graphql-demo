# restaf-graphql-demo

This repository has two projects

1. server - This the app where you specify your schema and resolvers and start the graphql server.

2. app - This is a collection of web apps demonstrating the UI for the sample graphql queries. This assumes that you have done step 1.

---

## Setting up this demo

---

## Quick Start

1. Obtain a clientID and clientSecret for the authorization_code flow:
    - ClientId = graphqlserver
    - ClientSecret = secret
    - redirect = <http://localhost:5000/graphqlserver>

2. Install the dependencies and configure

    - Using yarn
        - Issue the command below in the root directory

    ```shell
        yarn install
    ```

    - Using npm
        - open a terminal/shell window
        - cd packages/server
        - npm install
        - edit app.env and set the value of VIYA_SERVER to point to your Viya Server

        - open a terminal/shell window
        - cd app
        - npm install

3. Starting the server

    - Open  a shell/terminal and issue this command

     ```shell
     npm run server
     ```

    - Open a second shell/terminak and issue this command

    ```shell
    npm run app

    ```

    - Visit the url indicated in the graphql-app shell.
    - You will be prompted for userid and password.
    - Once authenticated you should be shown the app.
    - Visit each of the links to see the demo in action.

---

## Docker

To deploy in docker run the following commands

```script
npm run buildserver

npm run buildapp
```

Follow these by issuing the following commands in seperate shells

```script
npm run runserver

npm run runapp
```

Now access the application by visiting this site

```js
http://localhost:3000/graphqlapp
```
