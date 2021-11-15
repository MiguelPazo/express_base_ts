/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {interfaces} from "inversify-express-utils";
import {PayloadToken} from "../dto/payloadToken";

export class Principal implements interfaces.Principal {
    public details: any;

    public constructor(details: PayloadToken | null) {
        this.details = details;
    }

    public isAuthenticated(): Promise<boolean> {
        return Promise.resolve(this.details !== null);
    }

    public isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(resourceId === 1111);
    }

    public isInRole(role: string): Promise<boolean> {
        return Promise.resolve(role === "admin");
    }
}
