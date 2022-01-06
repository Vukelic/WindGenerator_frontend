export class DtoPaging {

    constructor() {

        this.filters = {};
        this.filtersType = {};
        this.orders = {};

    }

    page: number;
    countPerPage: number;
    totalPages: number;
    totalCount: number;

    filters: any;
    filtersType: any;
    orders: any;

    private _nextPageToken: string;
    public get nextPageToken(): string {
        return this._nextPageToken;
    }
    public set nextPageToken(v: string) {
        this._nextPageToken = v;
    }

    InsertSoftDeletedFilter(inSoftDeleteValue: boolean) {
        if (this.filters == null) {
            this.filters = {};
        }
        else {
            this.filters.SoftDeleted = inSoftDeleteValue;
        }

        if (this.filtersType == null) {
            this.filtersType = {};
        }
        else {
            this.filtersType.SoftDeleted = 'eq';
        }
    }

}