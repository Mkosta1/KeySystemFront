
import { IJWTResponse } from "../../dto/IJWTResponse";
import { IWorkerData } from "../../dto/Worker/IWorkerData";
import { IWorkerRemoveData } from "../../dto/Worker/IWorkerRemoveData";
import { BaseEntityService } from "../BaseEntityService";

export class WorkerGetService<TEntity extends IWorkerData> extends BaseEntityService<IWorkerData> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)) {
        super('Worker', setJwtResponse);
    }


    async getWorker(jwt: IJWTResponse, data: string): Promise<TEntity | undefined> {
        try {
            const response = await this.axios.get<TEntity>(
                data + '?api-version=1',
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

    async getWorkerAll(jwt: IJWTResponse): Promise<TEntity[] | undefined> {
        
        try {
            const response = await this.axios.get<TEntity[]>(
                '?api-version=1' ,
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