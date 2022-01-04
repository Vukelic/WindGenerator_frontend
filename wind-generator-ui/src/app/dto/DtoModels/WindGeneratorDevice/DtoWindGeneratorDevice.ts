import { ARepoBaseEntity } from "../Common/ARepoBaseEntity";
import { DtoWindGeneratorDevice_History } from "../WindGeneratorDevice_History/DtoWindGeneratorDevice_History";

export  class DtoWindGeneratorDevice extends ARepoBaseEntity{

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
    ListOfWindGeneratorDevice_History: DtoWindGeneratorDevice_History;

  
   
}