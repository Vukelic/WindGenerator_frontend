import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlingService } from '../core/services/error-handiling.service';
import { DtoRole } from '../dto/DtoModels/Role/DtoRole';
import { DtoPaging } from '../dto/DtoRequestObjectModels/DtoPaging';
import { DtoRoleListResponse } from '../dto/DtoResponseObjectModels/Role/DtoRoleListResponse';
import { DtoRoleResponse } from '../dto/DtoResponseObjectModels/Role/DtoRoleResponse';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private errService: ErrorHandlingService) { }

  Post(Role: DtoRole) {
    return this.http.post(environment.BaseAPIUrl + 'Role/' + 'Post', Role).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'RoleService, Post');
          this.errService.displayDescriptiveErrorMessage("Role", "Can't create Role", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("Role", "Role created successfully!", resp, 5, 'popup-success');
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
    return this.http.get<DtoRoleListResponse>(environment.BaseAPIUrl + 'Role/' + 'Get' + '?inPaggingJson=' + objAsJson).pipe(
      map((resp: DtoRoleListResponse) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'RoleService, GetList');
          this.errService.displayDescriptiveErrorMessage("Role", "Can't get Roles", resp, 5, 'popup-error');
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
    return this.http.delete(environment.BaseAPIUrl + 'Role/' + 'Delete/' + id).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'RoleService, Delete');
          this.errService.displayDescriptiveErrorMessage("Role", "Can't delete Role", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("Role", "Role deleted successfully!", resp, 5, 'popup-success');
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

  Put(id: number, Role: DtoRole) {
    return this.http.put(environment.BaseAPIUrl + 'Role/' + 'Put/' + id, Role).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'RoleService, Put');
          this.errService.displayDescriptiveErrorMessage("Role", "Can't update Role", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("Role", "Role updated successfully!", resp, 5, 'popup-success');
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
    return this.http.get<DtoRoleResponse>(environment.BaseAPIUrl + 'Role/' + 'Get/' + id).pipe(
      map((resp: DtoRoleResponse) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'RoleService, Get');
          this.errService.displayDescriptiveErrorMessage("Role", "Can't get Role", resp, 5, 'popup-error');
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
