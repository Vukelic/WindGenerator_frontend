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
   
}