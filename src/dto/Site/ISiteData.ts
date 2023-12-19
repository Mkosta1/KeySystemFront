import { IWorkerAtSiteData } from "../WorkerAtSite/IWorkerAtSiteData";

export interface ISiteData {
    id: string,
    name: string | undefined,
    siteId: string,
    address: string,
    region: string,
    owner: string,
}