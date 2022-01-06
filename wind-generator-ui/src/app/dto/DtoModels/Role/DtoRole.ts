import { ARepoBaseEntity } from "../Common/ARepoBaseEntity";
import { DtoUser } from "../User/DtoUser";

export  class DtoRole extends ARepoBaseEntity{

    Name: string;
    Description: string;
    Active: boolean;
    
    //complex
    ListOfUsers: DtoUser[];
  

}