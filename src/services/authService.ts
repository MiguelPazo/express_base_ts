/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import {IAuthService} from "./interfaces/IAuthService";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@injectable()
export class AuthService implements IAuthService {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async validate(user: string, password: string): Promise<Boolean> {
        return Promise.resolve(false);
    }
}
