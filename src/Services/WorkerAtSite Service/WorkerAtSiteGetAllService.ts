
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ICustomDTOGetAll } from "../../dto/WorkerAtSite/ICustomDTOGetAll";
import { BaseEntityService } from "../BaseEntityService";

export class WorkerAtSiteGetAllService<TEntity extends ICustomDTOGetAll> extends BaseEntityService<ICustomDTOGetAll> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('WorkerAtSite?api-version=1', setJwtResponse);
    }
 
    async getAllWorkers(jwt: IJWTResponse): Promise<TEntity[] | undefined> {
        try {
            const response = await this.axios.get<TEntity[]>(
                '',
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt.jwt
                    }
                }
            );
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
        
    }

}