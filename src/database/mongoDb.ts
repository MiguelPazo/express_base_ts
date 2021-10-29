/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {MongoClient, MongoClientOptions} from 'mongodb';
import * as fs from 'fs';
import {IMongoDb} from "./_interfaces";
import {injectable} from "inversify";


@injectable()
export class MongoDb implements IMongoDb {

    _db: any;

    async getDb(): Promise<any> {
        if (!this._db) {
            let result = (process.env.APP_ENV === 'production') ? await this.getConnectionsDocumentDB() : await this.getConnectionsAtlas();

            if (!result) {
                console.error('Error connecting to mongodb.');
                return null;
            }
        }

        return this._db;
    };

    async getConnectionsAtlas(): Promise<any> {
        if (this._db) {
            return this._db;
        }

        let uri: string;
        let connectConfig: MongoClientOptions = {
            keepAlive: true,
            connectTimeoutMS: 5000,
        };

        uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`;

        try {
            this._db = await MongoClient.connect(uri, connectConfig);
            this._db = this._db.db(process.env.MONGODB_DATABASE);
        } catch (err) {
            console.error(err);
        }

        return this._db;
    }

    async getConnectionsDocumentDB(): Promise<any> {
        if (this._db) {
            console.log({_db: this._db});
            return this._db;
        }

        const ca = fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem');

        let uri: string;
        let options: MongoClientOptions = {
            sslValidate: true,
            sslCA: ca.toString(),
        };

        uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retrywrites=false`;

        try {
            this._db = await MongoClient.connect(uri, options);
            this._db = this._db.db(process.env.MONGODB_DATABASE);
        } catch (err) {
            console.error(err);
        }

        return this._db;
    }
}
