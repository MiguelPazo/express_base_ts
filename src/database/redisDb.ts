/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as Redis from "ioredis";
import {IRedisDb} from "./_interfaces";
import {injectable} from "inversify";


@injectable()
export class RedisDb implements IRedisDb {

    async redisReader(): Promise<any> {
        return new Redis({
            port: 6379,
            host: process.env.REDIS_READER,
            password: process.env.REDIS_PASSWORD,
        });
    }

    async redisWriter(): Promise<any> {
        return new Redis({
            port: 6379,
            host: process.env.REDIS_WRITER,
            password: process.env.REDIS_PASSWORD,
        });
    }
}
