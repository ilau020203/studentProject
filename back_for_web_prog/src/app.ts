// Must be at top
import 'reflect-metadata';
import {createExpressServer, useContainer, useExpressServer ,RoutingControllersOptions} from "routing-controllers";
import {Container} from "typedi";
import { json } from 'body-parser';
import { GlobalErrorHandler } from './middleware/error-handler';
import  { Application } from 'express';
import path from 'path';
import cors from 'cors'
import {UserConntroller} from './controllers/UserController'
import { createConnection } from 'typeorm';
import {getConnection} from "typeorm";
import { typeOrmConfig } from './config';
import User from './models/User';
import { getLogger } from 'log4js';
import { AuthController } from './controllers/AuthController';
import { authorizationChecker, currentUserChecker } from "./services/auth";
import os from "os"

/**
 * Start the express app.
 */
 const PORT = process.env.PORT || 5000;

console.log("Server is up and running at port "+PORT);

(async () => {
    try {
        const options: RoutingControllersOptions = {
            
            routePrefix: '/api',
            controllers: [
                path.join(__dirname + '/controllers/*.ts'), // dev
                path.join(__dirname + '/controllers/*.js'), // build
            ],
            middlewares: [GlobalErrorHandler, json],
            defaultErrorHandler: false,
            authorizationChecker:authorizationChecker,
            currentUserChecker:currentUserChecker,
            //  cors: {
            //     origin:"*", 
            //                //access-control-allow-credentials:true
            //      optionSuccessStatus:200,
            // },
        };
        
        const expressApp = createExpressServer(options) as Application;
        // expressApp.use(cors( {
        //     origin:'*', 
        //     credentials:true,            //access-control-allow-credentials:true
        //     // optionSuccessStatus:200,
        // }))
        // const conn = await myDataSource.initialize()   
        const conn = await createConnection(typeOrmConfig);
        console.log(  conn.driver.connect())
        
        //mock data
        // let rep = await conn.getRepository(User);
        // let album2 = new User();
        // album2.name = "Me";
        // album2.date = "12.01.2002";
        // album2 = await rep.save(album2);
        // let rep1 = await conn.getRepository(Car);
        // let album1 = new Car();
        // album1.brend = "Meqqqqq";
        // album1.owner_id = 1;
        // album1 = await rep1.save(album1);
        console.log('PG connected. App is ready to do work.');
        /**
         * Setup routing-controllers to use typedi container.
         */
        useContainer(Container);

        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */



        expressApp.listen(PORT);
        await conn.close();
        console.log('PG connection closed.');
    } catch (error) {
        console.log(error)
    }
})();
