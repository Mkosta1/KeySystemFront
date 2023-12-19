import { IJWTResponse } from "../../dto/IJWTResponse";
import { IKeyData } from "../../dto/Key/IKeyData";
import { BaseEntityService } from "../BaseEntityService";

export class KeyService extends BaseEntityService<IKeyData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('Key?api-version=1', setJwtResponse);
    }


    async postKey(jwt: IJWTResponse, data: IKeyData): Promise<IKeyData | undefined> {
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
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    
}