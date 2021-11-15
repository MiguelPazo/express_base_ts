/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {controller, httpGet, principal} from "inversify-express-utils";
import {ApiPath} from "swagger-express-ts";
import {inject} from "inversify";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";
import {IUserService} from "../services/interfaces/IUserService";
import {AuthUser} from "../auth/authUser";


@ApiPath({
    path: "/user",
    name: "User",
    security: {bearerToken: []}
})
@controller("/user", TYPES.AuthFilter)
export class UserController {

    private readonly logger;

    @inject(TYPES.IUserService)
    private readonly userService: IUserService;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    @httpGet("/")
    public async getOne(@principal() user: AuthUser) {
        return await this.userService.getOne(user.details.user);
    }
}
