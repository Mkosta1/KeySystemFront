import { IJWTResponse } from "../../dto/IJWTResponse";
import { IKeyRemoveData } from "../../dto/Key/IKeyRemoveData";
import { BaseEntityService } from "../BaseEntityService";

export class KeyRemoveService extends BaseEntityService<IKeyRemoveData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('Key', setJwtResponse);
    }


    async deleteComp(jwt: IJWTResponse, data: IKeyRemoveData): Promise<true | undefined> {
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