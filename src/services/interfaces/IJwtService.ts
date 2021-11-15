/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {PayloadToken} from "../../dto/payloadToken";

export interface IJwtService {

    generateAuthToken(data: any): Promise<string | null>;

    verifyAuthToken(jwt: string): Promise<PayloadToken | any>;

    setRevokedToken(payload: PayloadToken): Promise<boolean>;

    getRevokedToken(jwt: string): Promise<string | null>;
}
