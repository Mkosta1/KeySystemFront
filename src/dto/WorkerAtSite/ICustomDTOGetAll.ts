import { IUserData } from "../IUserData";
import { ISiteData } from "../Site/ISiteData";
import { IWorkerData } from "../Worker/IWorkerData";

export interface ICustomDTOGetAll {
    id: string,
    when: Date | null,
    until: Date | null,
    site: ISiteData,
    worker: IWorkerData,
    workerId: string,
    siteId: string,
    appUser: IUserData,
    appUserId: string
    

}