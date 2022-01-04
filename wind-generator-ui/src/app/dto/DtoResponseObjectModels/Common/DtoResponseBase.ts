import { DtoPaging } from "../../DtoRequestObjectModels/DtoPaging";


export class DtoResponseBase<Tdto>{

    private _Success: boolean;
    public get Success(): boolean {
        return this._Success;
    }
    public set Success(v: boolean) {
        this._Success = v;
    }

    private _Message: string;
    public get Message(): string {
        return this._Message;
    }
    public set Message(v: string) {
        this._Message = v;
    }

    private _MessageDescription: string;
    public get MessageDescription(): string {
        return this._MessageDescription;
    }
    public set MessageDescription(v: string) {
        this._MessageDescription = v;
    }


    private _PagingObject: DtoPaging;
    public get PagingObject(): DtoPaging {
        return this._PagingObject;
    }
    public set PagingObject(v: DtoPaging) {
        this._PagingObject = v;
    }


    private _Value: Tdto;
    public get Value(): Tdto {
        return this._Value;
    }
    public set Value(v: Tdto) {
        this._Value = v;
    }

    private _FailedDetails: object;
    public get FailedDetails(): object {
        return this._FailedDetails;
    }
    public set FailedDetails(v: object) {
        this._FailedDetails = v;
    }

}