
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ICustomDTOGetAll } from "../../dto/WorkerAtSite/ICustomDTOGetAll";
import { IWorkerAtSiteRemoveData } from "../../dto/WorkerAtSite/IWorkerAtSiteRemove";
import { BaseEntityService } from "../BaseEntityService";

export class WorkerAtSiteGetService extends BaseEntityService<ICustomDTOGetAll> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('WorkerAtSite/history?api-version=1', setJwtResponse);
    }


    async getWorkerAtSite(jwt: IJWTResponse): Promise<true | undefined> {
        try {
            const response = await this.axios.get(
                '',
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt.jwt
                    }
                }
            );
            if (response.status === 200) {
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

   

}