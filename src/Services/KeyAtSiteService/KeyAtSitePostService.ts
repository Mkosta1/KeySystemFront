import { IJWTResponse } from "../../dto/IJWTResponse";
import { IKeyAtSiteAddData } from "../../dto/KeyAtSite/IKeyAtSiteAddData";
import { BaseEntityService } from "../BaseEntityService";

export class KeyAtSitePostService extends BaseEntityService<IKeyAtSiteAddData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('KeyAtSite', setJwtResponse);
    }


    async postKeyToSite(jwt: IJWTResponse, data: IKeyAtSiteAddData): Promise<true | undefined> {
        console.log(data);
        try {
            const response = await this.axios.post(
                '?api-version=1', 
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

    async putKeyToSite(jwt: IJWTResponse,data: IKeyAtSiteAddData): Promise<true | undefined> {
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