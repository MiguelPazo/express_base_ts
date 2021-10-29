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
import {jwtVerify} from "jose";


@injectable()
export class TokenFilter extends BaseMiddleware {

    public readonly authenticationSchemeName: string = "Bearer "

    @inject(TYPES.ILogger)
    private readonly logger: ILogger;

    async handler(req: e.Request, res: e.Response, next: e.NextFunction): Promise<void> {
        try {
            // @ts-ignore
            const token = req.headers.authorization.split(this.authenticationSchemeName)[1];

            if (token === process.env.APP_ACCESS_TOKEN) {
                this.logger.getLogger().info('access allowed');
            } else {
                this.logger.getLogger().info('access not allowed');
            }
        } catch (err) {
            this.logger.getLogger().error(err);
        }

        next();
    }
}
