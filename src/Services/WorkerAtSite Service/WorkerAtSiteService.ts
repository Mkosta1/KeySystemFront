
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IWorkerAtSiteAddData } from "../../dto/WorkerAtSite/IWorkerAtSiteAddData";
import { IWorkerAtSiteData } from "../../dto/WorkerAtSite/IWorkerAtSiteData";
import { BaseEntityService } from "../BaseEntityService";

export class WorkerAtSiteService extends BaseEntityService<IWorkerAtSiteData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('WorkerAtSite?api-version=1', setJwtResponse);
    }

    async postWorkerAtSite(jwt: IJWTResponse, data: IWorkerAtSiteAddData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.post(
                '', 
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
            else if (response.status == 400){
                return undefined;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }
}