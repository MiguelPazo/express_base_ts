/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

const TYPES = {
    // Utils
    IUtils: Symbol.for('IUtils'),
    ILogger: Symbol.for('ILogger'),

    // Filters
    AuthFilter: Symbol.for('AuthFilter'),

    // Databases
    IMysqlDb: Symbol.for('IMysqlDb'),
    IMongoDb: Symbol.for('IMongoDb'),
    IRedisDb: Symbol.for('IRedisDb'),
    IDynamoDb: Symbol.for('IDynamoDb'),

    // Dao
    IUserDao: Symbol.for('IUserDao'),

    // Services
    IAuthService: Symbol.for('IAuthService'),
    IJwtService: Symbol.for('IJwtService'),
    ISqsService: Symbol.for('ISqsService'),
    IUploadService: Symbol.for('IUploadService'),
    IUserService: Symbol.for('IUserService'),
};

export default TYPES;
