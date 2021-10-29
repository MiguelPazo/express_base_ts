/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as mysql from "mysql2/promise";
import {IAuroraDb} from "./_interfaces";
import {injectable} from "inversify";


@injectable()
export class AuroraDb implements IAuroraDb {

    public connection: any;

    async connectionDB(): Promise<any> {

        if (!this.connection) {
            this.connection = await mysql.createConnection({
                host: process.env.AURORA_HOST,
                user: process.env.AURORA_USERNAME,
                password: process.env.AURORA_PASSWORD,
                database: process.env.AURORA_DATABASE
            });
        }

        return Promise.resolve(this.connection);
    }
}
