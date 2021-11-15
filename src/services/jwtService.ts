/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {IRedisDb} from "../databases/_interfaces";
import {TokenAuth} from "../dto/tokenAuth";
import * as fs from "fs";
import {IJwtService} from "./interfaces/IJwtService";
import {importJWK, jwtVerify, SignJWT} from "jose";
import {ILogger, IUtils} from "../common/_interfaces";


@injectable()
export class JwtService implements IJwtService {

    private readonly logger;

    @inject(TYPES.IRedisDb)
    private redisDb: IRedisDb;

    @inject(TYPES.IUtils)
    private readonly utils: IUtils;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async generateAuthToken(data: any): Promise<string | null> {
        try {
            const privateKey = fs.readFileSync(__dirname + './../../storage/keys/private_key.json');
            const jwkPrivate = await importJWK(JSON.parse(privateKey.toString()), 'PS256');

            const authToken = await new SignJWT(data)
                .setProtectedHeader({alg: 'RS256'})
                .setIssuedAt()
                .setIssuer('app')
                .setJti(this.utils.generateCode())
                .setAudience('audience')
                .setExpirationTime('24h')
                .sign(jwkPrivate);

            return Promise.resolve(authToken);
        } catch (err) {
            this.logger.error(err);
        }

        return Promise.resolve(null);
    }

    async verifyAuthToken(jwt: string): Promise<TokenAuth | any> {
        try {
            if (this.utils.isEmpty(jwt.toString())) {
                return Promise.resolve(null);
            }

            const publicKey = fs.readFileSync(__dirname + './../../storage/keys/public_key.json');
            const jwkPublic = await importJWK(JSON.parse(publicKey.toString()), 'PS256');
            const {payload} = await jwtVerify(jwt.toString(), jwkPublic);

            payload['token'] = jwt;

            return Promise.resolve(payload);
        } catch (err) {
            this.logger.error(err);
        }

        return Promise.resolve(null);
    }

    async setRevokedToken(payload: TokenAuth): Promise<boolean> {
        try {
            const redisWriter = await this.redisDb.getWriter();

            await redisWriter.set(payload.token, true);
            await redisWriter.expireat(payload.token, payload.exp);

            return Promise.resolve(true);
        } catch (err) {
            this.logger.error(err);
        }

        return Promise.resolve(false);
    }

    async getRevokedToken(jwt: string): Promise<string | null> {
        try {
            const redisReader = await this.redisDb.getReader();

            return Promise.resolve(await redisReader.get(jwt));
        } catch (err) {
            this.logger.error(err);
        }

        return Promise.resolve(null);
    }
}
