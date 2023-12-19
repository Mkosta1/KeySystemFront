
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IWorkerAtSiteRemoveData } from "../../dto/WorkerAtSite/IWorkerAtSiteRemove";
import { BaseEntityService } from "../BaseEntityService";

export class WorkerAtSiteRemoveService extends BaseEntityService<IWorkerAtSiteRemoveData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('WorkerAtSite', setJwtResponse);
    }


    async deleteWorkerAtSite(jwt: IJWTResponse, data: IWorkerAtSiteRemoveData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.delete(
                data.id + '?api-version=1',
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

    async updateWorkerAtSite(jwt: IJWTResponse, data: IWorkerAtSiteRemoveData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.put(
                data.id + '?api-version=1',
                data,
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