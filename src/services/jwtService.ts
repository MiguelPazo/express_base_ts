/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {IRedisDb} from "../database/_interfaces";
import {PayloadToken} from "../dto/payloadToken";
import * as fs from "fs";
import {IJwtService} from "./interfaces/IJwtService";
import {importJWK, jwtVerify, SignJWT} from "jose";
import {ILogger, IUtils} from "../common/_interfaces";


@injectable()
export class JwtService implements IJwtService {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    @inject(TYPES.IRedisDb)
    private redisDb: IRedisDb;

    @inject(TYPES.IUtils)
    private readonly utils: IUtils;

    async generateAuthToken(data: any): Promise<any> {
        try {
            if (this.utils.isEmpty(data)) {
                return null;
            }

            const privateKey = fs.readFileSync(__dirname + './../../storage/keys/private_key.json');
            const jwkPrivate = await importJWK(JSON.parse(privateKey.toString()), 'PS256');

            return await new SignJWT(data)
                // .setProtectedHeader({alg: 'ES256'})
                .setProtectedHeader({alg: 'RS256'})
                .setIssuedAt()
                .setIssuer('app')
                .setAudience('audience')
                .setExpirationTime('24h')
                .sign(jwkPrivate);
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }

    async verifyAuthToken(jwt: string): Promise<PayloadToken | any> {
        try {
            if (this.utils.isEmpty(jwt)) {
                return null;
            }

            const publicKey = fs.readFileSync(__dirname + './../../storage/keys/public_key.json');
            const jwkPublic = await importJWK(JSON.parse(publicKey.toString()), 'PS256');

            const {payload} = await jwtVerify(jwt, jwkPublic);

            return payload;
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }

    async setRevokedToken(token: string, exp: string): Promise<any> {
        try {
            const redisWriter = await this.redisDb.redisWriter();
            const key = token;

            const result = await redisWriter.set(key, true);
            await redisWriter.expireat(key, parseInt(exp));

            return result;
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }

    async getRevokedToken(key: string): Promise<any> {
        try {
            const redisReader = await this.redisDb.redisReader();

            return await redisReader.get(key);
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }
}
