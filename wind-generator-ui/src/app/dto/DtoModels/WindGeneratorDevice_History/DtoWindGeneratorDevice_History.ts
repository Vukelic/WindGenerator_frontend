import { ARepoBaseEntity } from "../Common/ARepoBaseEntity";
import { DtoWindGeneratorDevice } from "../WindGeneratorDevice/DtoWindGeneratorDevice";

export class DtoWindGeneratorDevice_History extends ARepoBaseEntity{

    Name: string;
    Description: string;
    GeographicalLatitude: number;
    GeographicalLongitude: number;
    GeographicalLatitudeStr: string;
    GeographicalLongitudeStr: String;
    ValueDec: string;
    ValueStr: string;

    Country: string;
    City: string;
    
    //COMPLEX PROPERTIES
    ParentWindGeneratorDevice: DtoWindGeneratorDevice;
    ParentWindGeneratorDeviceId?: number;

}