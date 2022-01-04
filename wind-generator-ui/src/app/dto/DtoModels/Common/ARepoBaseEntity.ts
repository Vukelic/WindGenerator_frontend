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
    SoftDeleteReasonInt: string;

}