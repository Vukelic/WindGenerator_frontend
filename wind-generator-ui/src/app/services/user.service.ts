import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ErrorHandlingService } from 'src/app/core/services/error-handiling.service';
import { DtoUser } from '../dto/DtoModels/User/DtoUser';
import { DtoPaging } from '../dto/DtoRequestObjectModels/DtoPaging';
import { DtoUserListResponse } from '../dto/DtoResponseObjectModels/User/DtoUserListResponse';
import { DtoUserResponse } from '../dto/DtoResponseObjectModels/User/DtoUserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private errService: ErrorHandlingService) { }

  Post(user: DtoUser) {
    return this.http.post(environment.BaseAPIUrl + 'User/' + 'Post', user).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, Post');
          this.errService.displayDescriptiveErrorMessage("User", "Can't create user", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("User", "User created successfully!", resp, 5, 'popup-success');
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

  Register(user: DtoUser) {
    return this.http.post(environment.BaseAPIUrl + 'User/' + 'Register', user).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, Post');
          this.errService.displayDescriptiveErrorMessage("User", "Can't create user", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("User", "User created successfully!", resp, 5, 'popup-success');
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
    return this.http.get<DtoUserListResponse>(environment.BaseAPIUrl + 'User/' + 'Get' + '?inPaggingJson=' + objAsJson).pipe(
      map((resp: DtoUserListResponse) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, GetList');
          this.errService.displayDescriptiveErrorMessage("User", "Can't get users", resp, 5, 'popup-error');
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
    return this.http.delete(environment.BaseAPIUrl + 'User/' + 'Delete/' + id).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, Delete');
          this.errService.displayDescriptiveErrorMessage("User", "Can't delete user", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("User", "User deleted successfully!", resp, 5, 'popup-success');
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

  Put(id: number, user: DtoUser) {
    return this.http.put(environment.BaseAPIUrl + 'User/' + 'Put/' + id, user).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, Put');
          this.errService.displayDescriptiveErrorMessage("User", "Can't update user", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("User", "User updated successfully!", resp, 5, 'popup-success');
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
    return this.http.get<DtoUserResponse>(environment.BaseAPIUrl + 'User/' + 'Get/' + id).pipe(
      map((resp: DtoUserResponse) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, Get');
          this.errService.displayDescriptiveErrorMessage("User", "Can't get user", resp, 5, 'popup-error');
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

  // GetUsersWithRole(paging: DtoPaging) {
  //   var objAsJson = JSON.stringify(paging);
  //   return this.http.get<DtoUserListResponse>(environment.BaseAPIUrl + 'User/' + 'GetUsersWithRole' + '?inPaggingJson=' + objAsJson).pipe(
  //     map((resp: DtoUserListResponse) => {
  //       if (!resp.Success) {
  //         // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, GetUsersWithRole');
  //         this.errService.displayDescriptiveErrorMessage("User", "Can't get users with roles", resp, 5, 'popup-error');
  //       }
  //       resp.Value = this.globalService.convertPlainListOfObjectsToClass<DtoUser>(DtoUser, resp.Value);
  //       return resp;
  //     }),
  //     catchError(error => {
  //       // Errors 500, 403, already resolved in interceptor
  //       // return throwError(this.errService.getErrorMessage(error));
  //       return error;
  //     })
  //   );
  // }

  // GetUserWithRole(id: number) {
  //   return this.http.get<DtoUserResponse>(environment.BaseAPIUrl + 'User/' + 'GetUserWithRole/' + id).pipe(
  //     map((resp: DtoUserResponse) => {
  //       if (!resp.Success) {
  //         // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, GetUserWithRole');
  //         this.errService.displayDescriptiveErrorMessage("User", "Can't get user with roles", resp, 5, 'popup-error');
  //       }
  //       resp.Value = this.globalService.convertPlainObjectToClass(DtoUser, resp.Value);
  //       return resp;
  //     }),
  //     catchError(error => {
  //       // Errors 500, 403, already resolved in interceptor
  //       // return throwError(this.errService.getErrorMessage(error));
  //       return error;
  //     })
  //   );
  // }
}
