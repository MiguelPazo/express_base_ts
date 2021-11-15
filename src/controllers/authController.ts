/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {controller, httpPost, requestBody} from "inversify-express-utils";
import {ApiPath} from "swagger-express-ts";
import {inject} from "inversify";
import TYPES from "../types";
import {IAuthService} from "../services/interfaces/IAuthService";
import {ILogger} from "../common/_interfaces";
import {Request} from "express";


@ApiPath({
    path: "/auth",
    name: "Auth"
})
@controller("/auth")
export class AuthController {

    private readonly logger;

    @inject(TYPES.IAuthService)
    private readonly authService: IAuthService;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    @httpPost("")
    public async index(@requestBody() user: any, request: Request) {
        const result = await this.authService.validate(user.user, user.password, request.ip, request.get('User-Agent'));

        if (result) {
            return {success: true, token: result};
        }

        return {success: false};
    }
}
