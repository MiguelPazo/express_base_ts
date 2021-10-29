/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {Request, Response} from "express";
import {controller, httpPost} from "inversify-express-utils";
import {ApiOperationPost, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import {inject} from "inversify";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@ApiPath({
    path: "/upload",
    name: "Upload",
    security: {bearerToken: []}
})
@controller("/upload", TYPES.AuthFilter)
export class UploadController {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    @ApiOperationPost({
        path: "/upload",
        description: "Upload file to S3",
        summary: "Upload file to S3",
        parameters: {
            formData: {
                "file": {required: true, description: "file to upload", type: "file"}
            }
        },
        responses: {
            200: {
                description: "response",
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
                model: "GenericResponse"
            }
        },
        consumes: [
            "multipart/form-data"
        ],
        security: {
            bearerAuth: []
        }
    })
    @httpPost("/")
    public index(request: Request, response: Response) {
        return {"status": "upload"};
    }
}
