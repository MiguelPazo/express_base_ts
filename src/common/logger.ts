/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {injectable} from "inversify";
import {Logger as libLog} from "tslog";
import {ILogger} from "./_interfaces";


@injectable()
export class Logger implements ILogger {

    private readonly logger: libLog;

    public constructor() {
        if (process.env.NODE_ENV === 'production') {
            this.logger = new libLog({name: "server", type: "json"});
        } else {
            this.logger = new libLog({name: "server"});
        }
    }

    getLogger(): libLog {
        return this.logger;
    }
}

