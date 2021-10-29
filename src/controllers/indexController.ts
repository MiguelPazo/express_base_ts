/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {Request, Response} from "express";
import {controller, httpGet} from "inversify-express-utils";
import {ApiPath} from "swagger-express-ts";
import {inject} from "inversify";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@ApiPath({
    path: "/",
    name: "Home"
})
@controller("/")
export class IndexController {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    @httpGet("/")
    public index(request: Request, response: Response) {
        return {"status": "ok"};
    }
}
