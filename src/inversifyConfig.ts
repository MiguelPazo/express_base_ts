/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import './controllers/_index';
import {Container} from "inversify";
import TYPES from "./types";
import {IAuroraDb, IMongoDb, IRedisDb} from "./database/_interfaces";
import {AuroraDb} from "./database/auroraDb";
import {MongoDb} from "./database/mongoDb";
import {RedisDb} from "./database/redisDb";
import {IJwtService} from "./services/interfaces/IJwtService";
import {JwtService} from "./services/jwtService";
import {IAuthService} from "./services/interfaces/IAuthService";
import {AuthService} from "./services/authService";
import {ISqsService} from "./services/interfaces/ISqsService";
import {SqsService} from "./services/sqsService";
import {IUploadService} from "./services/interfaces/IUploadService";
import {UploadService} from "./services/uploadService";
import {ILogger, IUtils} from "./common/_interfaces";
import {Utils} from "./common/utils";
import {Logger} from "./common/logger";
import {IUserService} from "./services/interfaces/IUserService";
import {UserService} from "./services/userService";
import {AuthFilter} from "./middlewares/authFilter";
import {TokenFilter} from "./middlewares/tokenFilter";

const container = new Container({autoBindInjectable: true});

// Utils
container.bind<IUtils>(TYPES.IUtils).to(Utils).inSingletonScope();
container.bind<ILogger>(TYPES.ILogger).to(Logger).inSingletonScope();

// Filters
container.bind<AuthFilter>(TYPES.AuthFilter).to(AuthFilter);
container.bind<TokenFilter>(TYPES.TokenFilter).to(TokenFilter);

// Databases
container.bind<IAuroraDb>(TYPES.IAuroraDb).to(AuroraDb).inSingletonScope();
container.bind<IMongoDb>(TYPES.IMongoDb).to(MongoDb).inSingletonScope();
container.bind<IRedisDb>(TYPES.IRedisDb).to(RedisDb).inSingletonScope();

// Services
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService).inSingletonScope();
container.bind<IJwtService>(TYPES.IJwtService).to(JwtService).inSingletonScope();
container.bind<ISqsService>(TYPES.ISqsService).to(SqsService).inSingletonScope();
container.bind<IUploadService>(TYPES.IUploadService).to(UploadService).inSingletonScope();
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();


export default container;
