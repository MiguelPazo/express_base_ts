/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {IDynamoDb} from "./_interfaces";
import {inject, injectable} from "inversify";
import {DynamoDB} from 'aws-sdk';
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@injectable()
export class DynamoDb implements IDynamoDb {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    getDb(): any {
        try {
            return new DynamoDB.DocumentClient({
                region: process.env.DYNAMO_AWS_REGION || '',
                accessKeyId: process.env.AWS_ACCESS_KEY_ID_DYNAMODB,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DYNAMODB,
                maxRetries: 10
            });
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }
}
