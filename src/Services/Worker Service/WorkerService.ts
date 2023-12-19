
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IWorkerData } from "../../dto/Worker/IWorkerData";
import { BaseEntityService } from "../BaseEntityService";

export class WorkerService extends BaseEntityService<IWorkerData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('Worker', setJwtResponse);
    }


    async postWorker(jwt: IJWTResponse, data: IWorkerData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.post(
                '?api-version=1', 
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt.jwt
                    }
                }
            );
            if (response.status === 201) {
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async putWorker(jwt: IJWTResponse,data: IWorkerData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.put(
                data.id + "?api-version=1",
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt.jwt
                    }
                }
            );
            if (response.status === 201) {
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }
}