import { ARepoBaseEntity } from "../Common/ARepoBaseEntity";
import { DtoRole } from "../Role/DtoRole";

export  class DtoChangePassword {

    NewPassword: string;
    OldPassword: string;
    UserId: number;

    /**
     *
     */
    constructor() {

        this.NewPassword = "";
        this.OldPassword = "";
        this.UserId = 0;
      
    }
   
}