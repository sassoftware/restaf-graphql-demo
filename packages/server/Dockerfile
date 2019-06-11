FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8080

ENV APPNAME=graphqlserver

#
# Location of the application resources(html, shared resources etc...)
# each APPNAME corresponds to a sub-directory directory in this location with the same name as APPNAME.
# if current directory then set APPLOC to .
#
ENV APPLOC=./public

#
# Specify the html that is the entry point to your app.
# A good standard is to use index.html
#
ENV APPENTRY=index.html
#
# APPHOST - Leave this as specified below
# The service will use the hostname where the app is running.
#
ENV APPHOST=0.0.0.0

#
# The port on which this app is expected to run
# 8080 is probably taken so use any valid available port no.
#
ENV APPPORT=8080

# SAS_SSL_ENABLED=NO
ENV VIYA_SERVER=


#
# Clientid and clientsecret
# You need to obtain it either thru your admin or by using ways described in the Viya Admin doc.
# samples shown below
#
ENV AUTHFLOW=server
ENV CLIENTID=graphqlserverdemo
ENV CLIENTSECRET=secret


#
# services to be initialized. These are typical ones 
# restaf will initialize these using addServices.
#
ENV SERVICES=casManagement,compute,jobExecution,files,reports,reportImages
#
# where the sas code is stored
#

ENV PROGRAMURI=./programs

#
# specify compute context to use - defaults to the first one if * is specified
#
ENV COMPUTECONTEXT=*

#
# The next two values indicate whether the compute session and cas sessions 
# should be reused in subsequent calls
#

ENV REUSECOMPUTESESSION=NO
ENV REUSECASSESSION=NO

CMD [ "npm", "run", "indocker"]