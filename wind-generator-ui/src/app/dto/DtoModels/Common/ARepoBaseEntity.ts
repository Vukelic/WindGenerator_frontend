export abstract class ARepoBaseEntity{

    Id: number;
    TimeCreated?: Date;
    CreatedUserId: string;
    CreatedUserName: string;
    TimeModified?: Date;
    ModifiedUserId: string;
    ModifiedUserName: string;
    SoftDeleted: boolean;
    IsVirtual: boolean;
    SystemString: string;
    AdditionalJsonData: string;
    SoftDeleteReasonJson: string;
    SoftDeleteReasonInt: number;

    /**
     *
     */
    constructor() {
    this.Id = 0;
    this.TimeCreated = null;
    this.CreatedUserId= '';
    this.CreatedUserName= '';
    this.TimeModified = null;
    this.ModifiedUserId= '';
    this.ModifiedUserName= '';
    this.SoftDeleted = false;
    this.IsVirtual= false;
    this.SystemString= '';
    this.AdditionalJsonData= '';
    this.SoftDeleteReasonJson= '';
    this.SoftDeleteReasonInt= 0;

    }
}