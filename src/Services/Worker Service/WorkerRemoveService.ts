
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IWorkerData } from "../../dto/Worker/IWorkerData";
import { IWorkerRemoveData } from "../../dto/Worker/IWorkerRemoveData";
import { BaseEntityService } from "../BaseEntityService";

export class WorkerRemoveService extends BaseEntityService<IWorkerRemoveData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('Worker', setJwtResponse);
    }


    async deleteWorker(jwt: IJWTResponse, data: IWorkerRemoveData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.delete(
                data.id + "?api-version=1",
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt.jwt
                    }
                }
            );
            if (response.status === 204) {
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }
}