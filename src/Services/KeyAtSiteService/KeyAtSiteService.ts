
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IKeyAtSiteData } from "../../dto/KeyAtSite/IKeyAtSiteData";
import { BaseEntityService } from "../BaseEntityService";

export class KeyAtSiteGetService<TEntity extends IKeyAtSiteData> extends BaseEntityService<IKeyAtSiteData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('KeyAtSite/Check/?api-version=1', setJwtResponse);
    }

    async getKeyAtSite(jwt: IJWTResponse): Promise<TEntity[] | undefined> {
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