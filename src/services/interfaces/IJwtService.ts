/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {TokenAuth} from "../../dto/tokenAuth";

export interface IJwtService {

    generateAuthToken(data: any): Promise<string | null>;

    verifyAuthToken(jwt: string): Promise<TokenAuth | any>;

    setRevokedToken(payload: TokenAuth): Promise<boolean>;

    getRevokedToken(jwt: string): Promise<string | null>;
}
