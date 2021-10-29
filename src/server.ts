/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import container from './inversifyConfig';
import {InversifyExpressServer} from 'inversify-express-utils';
import * as formidable from 'express-formidable';
import * as swagger from "swagger-express-ts";
import {AuthProvider} from "./common/auth/authProvider";

(async () => {

    process.on("uncaughtException", e => {
        console.error(e);
        process.exit(1);
    });

    process.on("unhandledRejection", e => {
        console.error(e);
        process.exit(1);
    });

    let server = new InversifyExpressServer(container, null, null, null, AuthProvider);

    server.setConfig((app) => {
        app.use(cors());

        // app.use(formidable({
        //     encoding: 'utf-8',
        //     multiples: true
        // }));

        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.use(bodyParser.json());


        // app.use('/api-docs/swagger', (request: express.Request, response: express.Response, next: express.NextFunction) => {
        //     if ((process.env.NODE_ENV || '') !== 'production') {
        //         next();
        //     } else {
        //         if (request.query.access_token !== process.env.SWAGGER_ACCESS_TOKEN && request.path === "/") {
        //             return response.status(401).send("No Autorizado");
        //         }
        //     }
        //     next();
        // }, express.static('swagger'));
        //
        // app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));

        // app.use(swagger.express(
        //     {
        //         definition: {
        //             info: {
        //                 title: "Webservice",
        //                 version: "1.0"
        //             },
        //             externalDocs: {
        //                 url: process.env.SWAGGER_API_URL || ''
        //             },
        //             securityDefinitions: {
        //                 bearerAuth: {
        //                     "type": "apiKey",
        //                     "name": "Authorization",
        //                     "in": "header"
        //                 }
        //             }
        //             // Models can be defined here
        //         }
        //     }
        // ));
    });

    let app = server.build();
    app.listen(process.env.NODE_PORT);

    console.log(`Listen on http://localhost:${process.env.NODE_PORT}`);
})();
