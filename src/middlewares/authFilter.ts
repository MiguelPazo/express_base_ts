/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import {BaseMiddleware} from "inversify-express-utils";
import TYPES from "../types";
import {IJwtService} from "../services/interfaces/IJwtService";
import {IRedisDb} from "../database/_interfaces";
import {ILogger} from "../common/_interfaces";
import * as e from "express";


@injectable()
export class AuthFilter extends BaseMiddleware {

    public readonly authenticationSchemeName: string = "Bearer "

    @inject(TYPES.ILogger)
    private readonly logger: ILogger;

    @inject(TYPES.IJwtService)
    private readonly jwtService: IJwtService;

    @inject(TYPES.IRedisDb)
    private readonly redisDb: IRedisDb;

    async handler(req: e.Request, res: e.Response, next: e.NextFunction): Promise<void> {
        try {
            if (await this.httpContext.user.isAuthenticated()) {
                this.logger.getLogger().info(`${this.httpContext.user.details.firstname} => ${req.url}`);
            } else {
                this.logger.getLogger().info(`Anonymous => ${req.url}`);
            }
        } catch (err) {
            this.logger.getLogger().error(err);
        }

        next();
    }
}
