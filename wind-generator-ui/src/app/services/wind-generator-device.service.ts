import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorHandlingService } from '../core/services/error-handiling.service';
import { DtoWindGeneratorDevice } from '../dto/DtoModels/WindGeneratorDevice/DtoWindGeneratorDevice';
import { DtoPaging } from '../dto/DtoRequestObjectModels/DtoPaging';
import { DtoWindGeneratorDeviceListResponse } from '../dto/DtoResponseObjectModels/WindGeneratorDevice/DtoWindGeneratorDeviceListResponse';
import { DtoWindGeneratorDeviceResponse } from '../dto/DtoResponseObjectModels/WindGeneratorDevice/DtoWindGeneratorDeviceResponse';

@Injectable({
  providedIn: 'root'
})
export class WindGeneratorDeviceService {

  constructor(private http: HttpClient, private errService: ErrorHandlingService) { }

  Post(WindGeneratorDevice: DtoWindGeneratorDevice) {
    return this.http.post(environment.BaseAPIUrl + 'WindGeneratorDevice/' + 'Post', WindGeneratorDevice).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDeviceService, Post');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice", "Can't create WindGeneratorDevice", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("WindGeneratorDevice", "WindGeneratorDevice created successfully!", resp, 5, 'popup-success');
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
    return this.http.get<DtoWindGeneratorDeviceListResponse>(environment.BaseAPIUrl + 'WindGeneratorDevice/' + 'Get' + '?inPaggingJson=' + objAsJson).pipe(
      map((resp: DtoWindGeneratorDeviceListResponse) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDeviceService, GetList');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice", "Can't get WindGeneratorDevices", resp, 5, 'popup-error');
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
    return this.http.delete(environment.BaseAPIUrl + 'WindGeneratorDevice/' + 'Delete/' + id).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDeviceService, Delete');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice", "Can't delete WindGeneratorDevice", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("WindGeneratorDevice", "WindGeneratorDevice deleted successfully!", resp, 5, 'popup-success');
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

  Put(id: number, WindGeneratorDevice: DtoWindGeneratorDevice) {
    return this.http.put(environment.BaseAPIUrl + 'WindGeneratorDevice/' + 'Put/' + id, WindGeneratorDevice).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDeviceService, Put');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice", "Can't update WindGeneratorDevice", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("WindGeneratorDevice", "WindGeneratorDevice updated successfully!", resp, 5, 'popup-success');
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
    return this.http.get<DtoWindGeneratorDeviceResponse>(environment.BaseAPIUrl + 'WindGeneratorDevice/' + 'Get/' + id).pipe(
      map((resp: DtoWindGeneratorDeviceResponse) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'WindGeneratorDeviceService, Get');
          this.errService.displayDescriptiveErrorMessage("WindGeneratorDevice", "Can't get WindGeneratorDevice", resp, 5, 'popup-error');
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
