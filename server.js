'use strict';

let Hapi = require('@hapi/hapi');
let route = require("./routes");

const knex= require('./config/db.config');
const authenticate= require('./middleware/authendicate')
const AuthBearer = require('hapi-auth-bearer-token');


const init = async () => {
    try{
        //server creation
        const server = Hapi.Server({
            host: "localhost",
            port: 5000
        });
        
        //authentication
        await server.register(AuthBearer)
        server.auth.strategy(
            'jwt', 
            'bearer-access-token',
            { 
                validate:authenticate
            }
        );

        //route
        server.route(route);

        //server start
        await server.start();
        console.log("Server started on ",server.info.uri);

        knex.raw("select 1+1 as result").then(_ => {info("DB connected");
  })
  .catch(e => {
    //error(e);
    console.log("data",e)
    process.exit(1);
  });
    }
    catch(error){
        console.log(error);
    }
}



process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();