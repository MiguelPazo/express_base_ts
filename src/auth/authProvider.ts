/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import {interfaces} from "inversify-express-utils";
import * as e from "express";
import {AuthUser} from "./authUser";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";
import {IJwtService} from "../services/interfaces/IJwtService";
import {TokenAuth} from "../dto/tokenAuth";


@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    public readonly authenticationSchemeName: string = "Bearer "

    @inject(TYPES.ILogger)
    private readonly logger: ILogger;

    @inject(TYPES.IJwtService)
    private readonly jwtService: IJwtService;

    private readonly pathsJwt = ['/user'];
    private readonly pathsToken = ['/upload'];

    public async getUser(req: e.Request, res: e.Response, next: e.NextFunction): Promise<interfaces.Principal> {
        try {
            // @ts-ignore
            const token = req.headers.authorization ? req.headers.authorization.split(this.authenticationSchemeName)[1] : '';

            if (this.pathsJwt.some(x => req.url.startsWith(x))) {
                return await this.validateJwt(token);
            }

            if (this.pathsToken.some(x => req.url.startsWith(x))) {
                return await this.validateToken(token);
            }

        } catch (err) {
            this.logger.getLogger().error(err);
        }

        return new AuthUser(null);
    }

    public async validateJwt(token: string): Promise<interfaces.Principal> {
        try {
            const user = await this.jwtService.verifyAuthToken(token);

            if (user) {
                const isRevoked = await this.jwtService.getRevokedToken(token);

                if (!isRevoked) {
                    return new AuthUser(user);
                }
            }

        } catch (err) {
            this.logger.getLogger().error(err);
        }

        return new AuthUser(null);
    }

    public async validateToken(token: string): Promise<interfaces.Principal> {
        try {
            if (token === process.env.APP_ACCESS_TOKEN) {
                let payload = new TokenAuth();
                payload.user = "app";

                return new AuthUser(payload);
            }

        } catch (err) {
            this.logger.getLogger().error(err);
        }

        return new AuthUser(null);
    }
}
