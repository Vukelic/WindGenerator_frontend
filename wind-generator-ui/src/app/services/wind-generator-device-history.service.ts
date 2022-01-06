import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlingService } from '../core/services/error-handiling.service';
import { DtoWindGeneratorDevice_History } from '../dto/DtoModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_History';
import { DtoPaging } from '../dto/DtoRequestObjectModels/DtoPaging';
import { DtoWindGeneratorDevice_HistoryListResponse } from '../dto/DtoResponseObjectModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_HistoryListResponse';
import { DtoWindGeneratorDevice_HistoryResponse } from '../dto/DtoResponseObjectModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_HistoryResponse';

@Injectable({
  providedIn: 'root'
})
export class WindGeneratorDeviceHistoryService {

  constructor(private http: HttpClient, private errService: ErrorHandlingService) { }

  Post(WindGeneratorDevice_History: DtoWindGeneratorDevice_History) {
    return this.http.post(environment.BaseAPIUrl + 'WindGeneratorDevice_History/' + 'Post', WindGeneratorDevice_History).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDevice_HistoryService, Post');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice_History", "Can't create WindGeneratorDevice_History", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("WindGeneratorDevice_History", "WindGeneratorDevice_History created successfully!", resp, 5, 'popup-success');
        }
        return resp;
      }),
      catchError(error => {
        // Errors 500, 403, already resolved in interceptor
        // return throwError(this.errService.getErrorMessage(error));
        return error;
      })
    );
  }

  GetList(paging: DtoPaging) {
    var objAsJson = JSON.stringify(paging);
    return this.http.get<DtoWindGeneratorDevice_HistoryListResponse>(environment.BaseAPIUrl + 'WindGeneratorDevice_History/' + 'Get' + '?inPaggingJson=' + objAsJson).pipe(
      map((resp: DtoWindGeneratorDevice_HistoryListResponse) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDevice_HistoryService, GetList');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice_History", "Can't get WindGeneratorDevice_Historys", resp, 5, 'popup-error');
        }
        return resp;
      }),
      catchError(error => {
        // Errors 500, 403, already resolved in interceptor
        // return throwError(this.errService.getErrorMessage(error));
        return error;
      })
    );
  }

  Delete(id: number) {
    return this.http.delete(environment.BaseAPIUrl + 'WindGeneratorDevice_History/' + 'Delete/' + id).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDevice_HistoryService, Delete');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice_History", "Can't delete WindGeneratorDevice_History", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("WindGeneratorDevice_History", "WindGeneratorDevice_History deleted successfully!", resp, 5, 'popup-success');
        }
        return resp;
      }),
      catchError(error => {
        // Errors 500, 403, already resolved in interceptor
        // return throwError(this.errService.getErrorMessage(error));
        return error;
      })
    );
  }

  Put(id: number, WindGeneratorDevice_History: DtoWindGeneratorDevice_History) {
    return this.http.put(environment.BaseAPIUrl + 'WindGeneratorDevice_History/' + 'Put/' + id, WindGeneratorDevice_History).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDevice_HistoryService, Put');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice_History", "Can't update WindGeneratorDevice_History", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("WindGeneratorDevice_History", "WindGeneratorDevice_History updated successfully!", resp, 5, 'popup-success');
        }
        return resp;
      }),
      catchError(error => {
        // Errors 500, 403, already resolved in interceptor
        // return throwError(this.errService.getErrorMessage(error));
        return error;
      })
    );
  }

  Get(id: number) {
    return this.http.get<DtoWindGeneratorDevice_HistoryResponse>(environment.BaseAPIUrl + 'WindGeneratorDevice_History/' + 'Get/' + id).pipe(
      map((resp: DtoWindGeneratorDevice_HistoryResponse) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDevice_HistoryService, Get');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice_History", "Can't get WindGeneratorDevice_History", resp, 5, 'popup-error');
        }
        return resp;
      }),
      catchError(error => {
        // Errors 500, 403, already resolved in interceptor
        // return throwError(this.errService.getErrorMessage(error));
        return error;
      })
    );
  }
}
