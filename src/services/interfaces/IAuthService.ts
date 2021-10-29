/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

export interface IAuthService {

    validate(user?: string, password?: string): Promise<Boolean>;
}
