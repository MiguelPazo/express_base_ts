/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {IAuroraDb, IMongoDb, IRedisDb} from "./database/_interfaces";
import {IAuthService} from "./services/interfaces/IAuthService";
import {ISqsService} from "./services/interfaces/ISqsService";
import {IUploadService} from "./services/interfaces/IUploadService";
import {ILogger} from "./common/_interfaces";
import {IUserService} from "./services/interfaces/IUserService";
import {AuthFilter} from "./middlewares/authFilter";
import {TokenFilter} from "./middlewares/tokenFilter";

const TYPES = {
    // Utils
    IUtils: Symbol.for('IUtils'),
    ILogger: Symbol.for('ILogger'),

    // Filters
    AuthFilter: Symbol.for('AuthFilter'),
    TokenFilter: Symbol.for('TokenFilter'),

    // Databases
    IAuroraDb: Symbol.for('IAuroraDb'),
    IMongoDb: Symbol.for('IMongoDb'),
    IRedisDb: Symbol.for('IRedisDb'),

    // Services
    IAuthService: Symbol.for('IAuthService'),
    IJwtService: Symbol.for('IJwtService'),
    ISqsService: Symbol.for('ISqsService'),
    IUploadService: Symbol.for('IUploadService'),
    IUserService: Symbol.for('IUserService'),
};

export default TYPES;
