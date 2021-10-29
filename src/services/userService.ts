/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";
import {IUserService} from "./interfaces/IUserService";


@injectable()
export class UserService implements IUserService {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async getOne(user: string): Promise<any> {
        return Promise.resolve({foo: user});
    }
}
