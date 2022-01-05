import { ARepoBaseEntity } from "../Common/ARepoBaseEntity";
import { DtoRole } from "../Role/DtoRole";

export  class DtoUser extends ARepoBaseEntity{

    UserName: string;
    Surname: string;
    Name: string;
    Phone: string;
    UserToken: string;
    ExpireTokenDateTime?: Date;
    Workplace: string;
    Password: string;
    Susspend: boolean;
    EmailConfirmed: boolean;
    FailedAttempt?: number;
    StartTrackingInterval?: Date;
    LastLoginTime?: Date;
    AppFlag: string;
    RssId: string;

    //COMPLEX PROPERTIES
    AssignRole: DtoRole;
    AssignRoleId?: number;

    /**
     *
     */
    constructor() {
        super();
        this.UserName = "";
        this.Surname = "";
        this.Name = "";
        this.Phone = "";
        this.UserToken = "";
        this.ExpireTokenDateTime = null;
        this.Workplace = "";
        this.Password = "";
        this.Susspend = false;
        this.EmailConfirmed = false;
        this.FailedAttempt = 0;
        this.StartTrackingInterval = null;
        this.LastLoginTime = null;
        this.AppFlag = "";
        this.RssId = "";;
    
        //COMPLEX PROPERTIES
        this.AssignRole = null;
        this.AssignRoleId = 0;
    }
   
}