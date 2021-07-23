# restaf-graphql-demo (archived)
## This repository is archived and is no longer accepting contributrions or addressing issues.

This repository has two projects

1. server - This the app where you specify your schema and resolvers and start the graphql server.

2. app - This is a collection of web apps demonstrating the UI for the sample graphql queries. This assumes that you have done step 1.

---

## Setting up this demo

### Requirements

- If you have not installed yarn already install yarn globally

```shell
npm install yarn -g
```

- Issue this command to make sure that yarn workspaces are enabled

```shell
yarn config set workspaces-experimental true
```

---

## Clone the repository

```shell
git clone https://github.com/sassoftware/restaf-graphql-demo
```

## Quick Start

cd to the root directory of the project.

1; Obtain a clientID and clientSecret for the authorization_code flow:
    - ClientId = graphqlserver
    - ClientSecret = secret
    - redirect = <http://localhost:5000/graphqlserver>

For your convenience a shell script is included in this repository. ssh to the Viya server as an admin and run this script. Feel free to change the default clientid and clientsecret.

```shell
sudo sh regclient.sh  -f authorization_code -c graphqlserver  -s secret -r htttp://localhost:5000/graphqlserver
```

2;  Install the dependencies

 cd to the root directory
```shell
    yarn install
```

3; Run-time configuration

- You have two options to set the value of VIYA_SERVER. CLIENTID and CLIENTSECRET
    1. Edit packages/server/app.env and set the value of VIYA_SERVER, CLIENTID, CLIENTSECRET
    2. Set the environment variable in your shell(preferred way)

    ```shell
            set VIYA_SERVER=...your Viya server...
            set CLIENTID=...your client...
            set CLIENTSECRET=...uour clientsecret...
    ```

4; Starting the server

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

## Build and Run in Docker

```txt
    Edit dockerrun.env and  set runtime environment variables VIYA_SERVER, CLIENTID, CLIENTSECRET
```

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

---

## Docker-compose

A sample docker-compose.yml is provided in the root directory. Make sure you set the VIYA_SERVER, CLIENTID and CLIENTSECRET to the proper value.

---

## Notes

You can change the ports used in this app. Make sure you change all the occurrences of that port.
