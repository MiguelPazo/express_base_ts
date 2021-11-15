/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import './controllers/_index';
import {Container} from "inversify";
import TYPES from "./types";
import {MongoDb} from "./databases/mongoDb";
import {RedisDb} from "./databases/redisDb";
import {IJwtService} from "./services/interfaces/IJwtService";
import {JwtService} from "./services/jwtService";
import {IAuthService} from "./services/interfaces/IAuthService";
import {AuthService} from "./services/authService";
import {ISqsService} from "./services/interfaces/ISqsService";
import {SqsService} from "./services/sqsService";
import {ILogger, IUtils} from "./common/_interfaces";
import {Utils} from "./common/utils";
import {Logger} from "./common/logger";
import {IUserService} from "./services/interfaces/IUserService";
import {UserService} from "./services/userService";
import {AuthFilter} from "./filters/authFilter";
import {IDynamoDb, IMongoDb, IMysqlDb, IRedisDb} from "./databases/_interfaces";
import {MysqlDb} from "./databases/mysqlDb";
import {DynamoDb} from "./databases/dynamoDb";
import {IUserDao} from "./dao/mongodb/_interfaces";
import {UserDao} from "./dao/mongodb/userDao";

const container = new Container({autoBindInjectable: true});

// Utils
container.bind<IUtils>(TYPES.IUtils).to(Utils).inSingletonScope();
container.bind<ILogger>(TYPES.ILogger).to(Logger).inSingletonScope();

// Filters
container.bind<AuthFilter>(TYPES.AuthFilter).to(AuthFilter);

// Databases
container.bind<IMysqlDb>(TYPES.IMysqlDb).to(MysqlDb).inSingletonScope();
container.bind<IMongoDb>(TYPES.IMongoDb).to(MongoDb).inSingletonScope();
container.bind<IRedisDb>(TYPES.IRedisDb).to(RedisDb).inSingletonScope();
container.bind<IDynamoDb>(TYPES.IDynamoDb).to(DynamoDb).inSingletonScope();

// Dao
container.bind<IUserDao>(TYPES.IUserDao).to(UserDao).inSingletonScope();

// Services
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService).inSingletonScope();
container.bind<IJwtService>(TYPES.IJwtService).to(JwtService).inSingletonScope();
container.bind<ISqsService>(TYPES.ISqsService).to(SqsService).inSingletonScope();
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();


export default container;
