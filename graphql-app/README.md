# restaf-graphql-app

A collection of applications associated with restaf-graphql-demo which is a graphql server with a small sample of
graphql examples for SAS Viya applications.

## To use this repo

1. Setup and run graphql-server (available in the same repository as this repository).

2. Install and start this app
    - Make sure that you setup the value of GRAPHQLSERVER in the app.env file to point to the graphql-server instance.  

    - Run 'npm start'

    - Visit the indicated url

## Adding your own application to this repository

To explain how to add an application I will use an imaginary new project called beer.

### Step 1: Edit public/index.html

Add this line to the bulleted list in the index.html.

```html
<li> <a href="javascript:show('/beer.html')"  target="_blank" > Wine Production using CAS </a></li>

```

### step 2: Add beerProduction.html

In the same directory add your html named beer.html.
This is a standard html with the following requirements.

- Add this script tag.

```html
<script src="/appenv"></script>
```

- Write your html the standard way.

- When you are ready to call the graphql server use code similar to the code in public/loadScore,html

```javascript
async function runScore(amount, assets){
    let payload = {
        query: `query {
            --- Your GRAPHQL_STRING---
        }`
    }

    let config = {
        url            : host + '/graphql',
        withCredentials: true,
        method         : 'POST',
        data           : payload
    }
    let r = await axios(config);
    if (r.data.hasOwnProperty('errors')) {
        console.log(JSON.stringify(r.data, null,4));
        alert(JSON.stringify(r.data, null,4));
        return(350);
    }
   else {
        return r.data.data.---YourReturnedData---;
   }

}

```

### Adding react viewer component to uiLibrary

If you want to bundle your viewer into the public/shared/uiLibrary then do the following:

- Add your viewer component to src/viewers directory.

- Copy src/wineApp.js and name the new file beer.js in the same directory.

