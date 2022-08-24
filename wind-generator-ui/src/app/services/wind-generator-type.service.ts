import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorHandlingService } from '../core/services/error-handiling.service';
import { DtoWindGeneratorType } from '../dto/DtoModels/WindGeneratorType/DtoWindGeneratorType';
import { DtoPaging } from '../dto/DtoRequestObjectModels/DtoPaging';
import { DtoWindGeneratorTypeListResponse } from '../dto/DtoResponseObjectModels/WindGeneratorType/DtoWindGeneratorTypeListResponse';
import { DtoWindGeneratorTypeResponse } from '../dto/DtoResponseObjectModels/WindGeneratorType/DtoWindGeneratorTypeResponse';

@Injectable({
  providedIn: 'root'
})
export class WindGeneratorTypeService {
  constructor(private http: HttpClient, private errService: ErrorHandlingService) { }

  PreProcessingDtoObject(url: string): string {
    var toRet = environment.ImageUrl + url;
    return toRet;
  }

  PreprocessObjectFromServer(objectToProcess: any) {
    if (objectToProcess) {
      objectToProcess.Angular_FullUrl = this.PreProcessingDtoObject(objectToProcess.ImageUrl);
    }
  }

  Post(WindGeneratorType: DtoWindGeneratorType) {
    return this.http.post(environment.BaseAPIUrl + 'WindGeneratorType/' + 'Post', WindGeneratorType).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorTypeService, Post');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorType", "Can't create WindGeneratorType", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("WindGeneratorType", "WindGeneratorType created successfully!", resp, 5, 'popup-success');
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
    console.warn('get list');
    var objAsJson = JSON.stringify(paging);
    return this.http.get<DtoWindGeneratorTypeListResponse>(environment.BaseAPIUrl + 'WindGeneratorType/' + 'Get' + '?inPaggingJson=' + objAsJson).pipe(
      map((resp: DtoWindGeneratorTypeListResponse) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorTypeService, GetList');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorType", "Can't get WindGeneratorTypes", resp, 5, 'popup-error');
      
        }

        if (resp != null){
          resp.Value.forEach((v, i, a) => {
            this.PreprocessObjectFromServer(v);
          })
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
    return this.http.delete(environment.BaseAPIUrl + 'WindGeneratorType/' + 'Delete/' + id).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorTypeService, Delete');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorType", "Can't delete WindGeneratorType", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("WindGeneratorType", "WindGeneratorType deleted successfully!", resp, 5, 'popup-success');
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

  Put(id: number, WindGeneratorType: DtoWindGeneratorType) {
    return this.http.put(environment.BaseAPIUrl + 'WindGeneratorType/' + 'Put/' + id, WindGeneratorType).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorTypeService, Put');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorType", "Can't update WindGeneratorType", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("WindGeneratorType", "WindGeneratorType updated successfully!", resp, 5, 'popup-success');
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
    return this.http.get<DtoWindGeneratorTypeResponse>(environment.BaseAPIUrl + 'WindGeneratorType/' + 'Get/' + id).pipe(
      map((resp: DtoWindGeneratorTypeResponse) => {
        if (resp != null) {
          this.PreprocessObjectFromServer(resp.Value);
          return resp;
        }
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorTypeService, Get');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorType", "Can't get WindGeneratorType", resp, 5, 'popup-error');
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
