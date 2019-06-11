let fs = require('fs');

let t =`VIYA_SERVER=${process.env.VIYA_SERVER}`;

fs.writeFile('dockerrun.env', t, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('dockerrun file has been created');
    }
});