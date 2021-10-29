/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import {IUploadService} from "./interfaces/IUploadService";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@injectable()
export class UploadService implements IUploadService {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    sendToS3(file: string): Promise<Boolean> {
        return Promise.resolve(false);
    }
}
