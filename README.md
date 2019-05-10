# restaf-graphql-demo

This repository has two projects

1. graphql-server - This the app where you specify your schema and resolvers and start the graphql server.

2. graphql-app - This is a collection of web apps demonstrating the UI for the sample graphql queries. This assumes that you have done step 1.

## Setting up graphql-server

1. In the graphql-server directory edit app.env as indicated in that file.

2. To start the server issue the command 'npm start'

## Setting up graphql-app

1. In the graphql-app directory edit the env file. It is important to set the GRAPHQLSERVER value to point to the graphql server you started in step 1.

## Required skill sets

To develop a really good graphql-based application for Viya you should have the following experts:

1. SAS and analytics experts to develop SAS applications with datastep, procs, cas actions and so forth. In the old days we called these folks "SUGI SAM" but these days they are known as Data Scientist and variations of those.

2. A graphlql schema designer - This is critical if you want the other 4 folks of the team to be happy.A well designed graphql schema will make the project move quickly.

3. A good nodejs developer who understands how graphql and REST APIs work. This developer creates the resolvers for the queries. And I have no shame in recommending that this developer should use restaf to develop good clean resolvers with minimal effort.

4. A good UX designer for the UI - no one wants a klunky UI.

5. A good html/css/js designer to develop the applications.

But I am sure that some where along the line reality will strike and one or two folks will take on two or more of these roles.