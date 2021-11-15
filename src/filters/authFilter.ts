/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import {BaseMiddleware} from "inversify-express-utils";
import TYPES from "../types";
import {IJwtService} from "../services/interfaces/IJwtService";
import {IRedisDb} from "../databases/_interfaces";
import {ILogger} from "../common/_interfaces";
import * as e from "express";


@injectable()
export class AuthFilter extends BaseMiddleware {

    @inject(TYPES.ILogger)
    private readonly logger: ILogger;

    @inject(TYPES.IJwtService)
    private readonly jwtService: IJwtService;

    @inject(TYPES.IRedisDb)
    private readonly redisDb: IRedisDb;

    async handler(req: e.Request, res: e.Response, next: e.NextFunction): Promise<void> {
        if (await this.httpContext.user.isAuthenticated()) {
            next();
        } else {
            res.status(401).json({});
        }
    }
}
