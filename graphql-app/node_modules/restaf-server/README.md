
# restaf-server - web server in nodejs

## Introduction

restaf-server is a nodejs based app server for use with SAS Viya Applications.
restaf-server uses the configuration-based [hapi.js](http://hapijs.com)

This release has breaking changes when used as a cli.

## Features

*   Allow users to access your app with a friendly name. ex: http://myserver/dashboard
*   Use the env file to manage the configurations in a portable manner.
*   Supports SAS Viya OAUTH2 authentication
*   Will work on windows and unix.
*   Will support apps running running on Edge and Chrome. I have not tested others


## CLI 

restaf-server can be accessed as a cli.
The new trend is to deploy all dependencies locally and use npx to script them. 


Usage:

if installed globally issue this command:

```
restaf-server --env=your-env-file <--appenv=<name.js>>
```

if installed locally(preferred way) issue this command:

```
npx restaf-server --env=env-file <--appenv=<name.js>>
```

### Arguments

- **env**   : Specify the env file.This is still the same as in previous releases (see notes below)

- **appenv**: This is an optional parameter. This the name of a JS file that returns an object containing information specific to the application. See below notes on the /appenv endpoint on how to retrieve this information in your web application.

### **Env file:**
The  env file is a portable way to specify the configurations for restaf-server.
Below is an example that you can cut and paste into a file. Some recommendations

* Name the env file the same as your app (ex: dashboard.env )

* Put the env file in the same repo as your application so that it travels. Your users can then copy it and modify it as needed.


## Customization Environment Variables set thru restaf.env file

```

################################################################################
# specify environment variables                                                #
# using an env file to be portable between windows and unix                    #
################################################################################
#
# Values are examples - replace them with the values appropriate for your use case
#

#
# APPNAME - the name you want the user to use to invoke it
#           For example if APPNAME is myapp then user will invoke the app as <host:port>/myapp.
#           If you are using restaf-server as a proxy make sure your appname is not same as onf ot the points
#           in the  downstream server(ex: Do not name your app "reports', 'files' etc...
#
APPNAME=<your app name like myapp, score etc...)

#
# Location of the application resources(html, shared resources etc...)
#
APPLOC=./public

#
# Specify the html that is the entry point to your app.
# A good standard is to use index.html
#
APPENTRY=<main entry hmtl -- logon.html, index.html etc...
#
# APPHOST
# Suggest localhost for most testing
# To use your local server's DNS name specify this as *. 
# 

APPHOST=*|localhost|ip address| etc...

#
# The port on which this app is expected to run
#
APPPORT=(ex: 3000)

#
# You can turn off OAUTH2 base authentication
#
OAUTH2=YES|NO

#
# If you want the server to act like a proxy server to the Viya Server
# If this set to YES, restaf-server will override OAUTH2 to be YES
#
PROXYSERVER=YES|NO

#
# your Viya Server
# ex: project.openstack.sas.com
#

VIYA_SERVER=sampleviya.com

#
# Clientid and clientsecret
# You need to obtain it either thru your admin or by using ways described in the Viya Admin doc.
# To use restaf-server as a proxy use authorization_code flow.
# Ignored if PROXYSERVER is NO
#
AUTHFLOW=implicit|password|authorization_code
CLIENTID=
CLIENTSECRET=
REDIRECT= < the html where the redirect will go>
```


### **appenv** 

In many applications that we have developed there was a need to configure the web application for different users, scenarios etc..
For example the application for user A might use scoring model A but for user B the scoring model will be B. This parameter allows the configuration of the application for both users on the app server.
The env file is processed before the appenv file is executed. This allows you to use the environment variablees defined thru the env file.

A js file might look like this:

```
return {
    reportName: 'dial',  
    output: process.env.OUTPUT,
    scoreModel: {
        caslib: 'Public',
        name  : 'loanEvaluation'
    }
}

```

In the web application include the following script tag:

```
<script src='/appenv'></script>
```

This will set two variables in the window's script


- APPENV - this is the object returned from the javascript file discussed above.
- LOGONPAYLOAD - this returns information described below.

### LOGONPAYLOAD

- Implicit Flow:  Typically this is hard-coded in the web application. restaf-server allows you to configure this on the server and is returned to the app. This is what you can expect on an implicit flow. The values are derived from the env file.

```
{
      authType: <process.env.AUTHFLOW>,
      host    : <process.env.VIYA_SERVER>,
      clientID: <process.env.CLIENTID>,
      redirect: <process.env.APPNAME}/process.env.REDIRECT>
}
```

- Authorization Flow: If you are embedding VA reports and images in your application you will need  the url of the Viya Server to get to the reports. So restaf-server returns the following:
```
{
      authType: <process.env.AUTHFLOW>,
      passThru: <process.env.VIYA_SERVER>
}
```
## Notes on using restaf-server as a proxy server

If you are using restaf-server as a proxy make sure your appname is not same as one of the end points
in the  downstream Viya server(ex: Do not name your app "reports', 'files' etc...
Also "shared" is reserved by restaf-server for the shared modules for all applications.

### Why use the shared subdirectory?
Many times (ex: restaf based apps) you want to store the libraries in a shared place for all the apps running on this server.
You can put such shared resources in this directory. Of course the idea way to get some of these artifacts is from an CDN  - which  is not
a sure thing for your homegrown shared libraries.
  The documentation for pre

## Running in docker using Dockerfile

### Quick start 

Assuming you have installed docker do the following

```
docker build -t myapp .
```

then to run it

```
docker run -p 5000:8080 -t myapp
```

The command above assumes EXPOSE is set to 8080.

In your browser you can access the myapp application in one of the following ways

```
http://localhost:5000/myapp

or

http://<your-client-machine-address>:5000/myapp

```

# Additional features you can try

## TLS Support

To turn on TLS support add the following line to your env file. Each item is separated by blanks. Embedded blanks in the values will cause errors.


      TLS= <cert location> <key location> <passphrase>

      Ex:

      TLS=../myssl/cert.pem  ../myssl/key.pem coolSASUsers 

## To Be Documented

-  SAMESITE option

-  User-defined routes
      
      - Adding to default routes

      - Overriding the defaults with custom routes





