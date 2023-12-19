
import { IBaseEntity } from "../../dto/IBaseEntity";
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ISiteData } from "../../dto/Site/ISiteData";
import { ISiteRemoveData } from "../../dto/Site/ISiteRemoveData";
import { BaseEntityService } from "../BaseEntityService";

export class SiteGetService<TEntity extends ISiteData> extends BaseEntityService<ISiteData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('Site', setJwtResponse);
    }


    async getSite(jwt: IJWTResponse, data: string): Promise<TEntity[] | undefined> {
        console.log(data);
        try {
            const response = await this.axios.get<TEntity[]>(
                data + '?api-version=1' ,
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