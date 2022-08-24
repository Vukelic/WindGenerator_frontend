import { ARepoBaseEntity } from "../Common/ARepoBaseEntity";
import { DtoUser } from "../User/DtoUser";
import { DtoWindGeneratorDevice_History } from "../WindGeneratorDevice_History/DtoWindGeneratorDevice_History";
import { DtoWindGeneratorType } from "../WindGeneratorType/DtoWindGeneratorType";

export  class DtoWindGeneratorDevice extends ARepoBaseEntity{

    Name: string;
    Description: string;
    GeographicalLatitude: number;
    GeographicalLongitude: number;
    GeographicalLatitudeStr: string;
    GeographicalLongitudeStr: String;
    ValueDec: number;
    ValueStr: string;

    Country: string;
    City: string;
  
    //COMPLEX PROPERTIES
    ListOfWindGeneratorDevice_History: DtoWindGeneratorDevice_History[];
    ParentWindGeneratorType: DtoWindGeneratorType;
    ParentWindGeneratorTypeId: number;
    ParentUser: DtoUser;
    ParentUserId: number;
    //local:
    Title?: any;
    Angular_FullUrl?: any;
        /**
     *
     */
    constructor() {
        super();
        this.Name = "";
        this.Description = "";
        this.GeographicalLatitude = 0;
        this.GeographicalLongitude = 0;
        this.GeographicalLatitudeStr = "";
        this.GeographicalLongitudeStr = "";
        this.ValueDec = 0;
        this.ValueStr = "";

        this.Country = "";
        this.City = "";
        this.ListOfWindGeneratorDevice_History = null;
        this.Angular_FullUrl = "/assets/wt2.JPG";
        this.Title = "WT1";
    }
  
   
}