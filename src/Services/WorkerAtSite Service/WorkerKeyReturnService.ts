
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IWorkerAtSiteData } from "../../dto/WorkerAtSite/IWorkerAtSiteData";
import { BaseEntityService } from "../BaseEntityService";

export class WorkerKeyReturnService extends BaseEntityService<IWorkerAtSiteData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('WorkerAtSite', setJwtResponse);
    }

    async updateWorkerAtSite(jwt: IJWTResponse, data: IWorkerAtSiteData): Promise<true | undefined> {
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