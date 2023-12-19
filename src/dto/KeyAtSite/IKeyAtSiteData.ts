import { IKeyData } from "../Key/IKeyData";
import { ISiteData } from "../Site/ISiteData";

export interface IKeyAtSiteData {
    id?: string,
    site: ISiteData,
    key: IKeyData
}