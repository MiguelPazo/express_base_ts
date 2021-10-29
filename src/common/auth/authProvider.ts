/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import {interfaces} from "inversify-express-utils";
import * as e from "express";
import {Principal} from "./principal";
import TYPES from "../../types";
import {IJwtService} from "../../services/interfaces/IJwtService";
import {ILogger} from "../_interfaces";


@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    public readonly authenticationSchemeName: string = "Bearer "

    @inject(TYPES.ILogger)
    private readonly logger: ILogger;

    @inject(TYPES.IJwtService)
    private readonly jwtService: IJwtService;

    public async getUser(req: e.Request, res: e.Response, next: e.NextFunction): Promise<interfaces.Principal> {
        try {
            // @ts-ignore
            const token = req.headers.authorization.split(this.authenticationSchemeName)[1];
            const user = await this.jwtService.verifyAuthToken(token);
            return new Principal(user);
        } catch (err) {
            this.logger.getLogger().error(err);
        }

        return new Principal(null);
    }
}
