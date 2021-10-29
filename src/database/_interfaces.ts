/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

export interface IAuroraDb {

    connectionDB(): Promise<any>;
}

export interface IMongoDb {

    getDb(): Promise<any>;
}

export interface IRedisDb {

    redisReader(): Promise<any>;

    redisWriter(): Promise<any>;
}
