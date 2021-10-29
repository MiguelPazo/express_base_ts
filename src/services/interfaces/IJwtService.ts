/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {PayloadToken} from "../../dto/payloadToken";

export interface IJwtService {

    generateAuthToken(data: any): Promise<PayloadToken | any>;

    verifyAuthToken(jwt: string): Promise<PayloadToken | any>;

    setRevokedToken(token: string, exp: string): Promise<any>;

    getRevokedToken(key: string): Promise<any>;
}
