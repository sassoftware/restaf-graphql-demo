let info = {
   host : process.env.GRAPHQLSERVER,
   logon: process.env.GRAPHQLLOGON
}
console.log(info);
console.log(process.env.TESTENV);
return info;