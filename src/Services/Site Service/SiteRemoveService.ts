
import { IJWTResponse } from "../../dto/IJWTResponse";
import { ISiteRemoveData } from "../../dto/Site/ISiteRemoveData";
import { BaseEntityService } from "../BaseEntityService";

export class SiteRemoveService extends BaseEntityService<ISiteRemoveData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('Site', setJwtResponse);
    }


    async deleteSite(jwt: IJWTResponse, data: ISiteRemoveData): Promise<true | undefined> {
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