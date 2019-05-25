FROM node:10.0.0
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080

ENV APPNAME=myapp

#
# Location of the application resources(html, shared resources etc...)
# each APPNAME corresponds to a sub-directory directory in this location with the same name as APPNAME.
# if current directory then set APPLOC to .
#
ENV APPLOC=./public/myapp

#
# Specify the html that is the entry point to your app.
# A good standard is to use index.html
#
ENV APPENTRY=index.html
#
# APPHOST - Leave this as specified below
# The service will use the hostname where rafserver is running.
#
ENV APPHOST=0.0.0.0

#
# The port on which this app is expected to run
# 8080 is probably taken so use any valid available port no.
#

ENV APPPORT=8080

# You can turn off OAUTH2 base authentication
#
ENV OAUTH2=NO

#
# If you want the server to act like a proxy server to the Viya Server
# If this set to YES, rafserver will override OAUTH2 to be YES
#
ENV PROXYSERVER=NO


ENV VIYA_VIYASERVER=

#
# Clientid and clientsecret
# You need to obtain it either thru your admin or by using ways described in the Viya Admin doc.
# Ignored if PROXYSERVER is NO
#
# ENV CLIENTID=
# ENV CLIENTSECRET=

#
# APP env
#

# ENV APPENV=appEnv.js


CMD [ "npm", "start"]