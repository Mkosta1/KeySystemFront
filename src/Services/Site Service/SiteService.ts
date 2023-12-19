
import { ISiteData } from "../../dto/Site/ISiteData";
import { IJWTResponse } from "../../dto/IJWTResponse";
import { BaseEntityService } from "../BaseEntityService";

export class SiteService extends BaseEntityService<ISiteData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('Site?api-version=1', setJwtResponse);
    }


    async postSite(jwt: IJWTResponse, data: ISiteData): Promise<true | undefined> {
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
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    
}