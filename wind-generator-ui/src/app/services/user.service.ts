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
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public currentUser:DtoUser = null;

  isLoggedIn: boolean = false;
  jwtTokenValue: any;
  tokenValue: any;
  decodedTokenValue: any;

  constructor(private http: HttpClient, private errService: ErrorHandlingService,private router: Router) { }

  getUser(){
    this.currentUser = JSON.parse (localStorage.getItem('currentUser'));  
  }
  doesJwtTokenExists(): boolean {
    var jwtTokenValue = localStorage.getItem('token');
    if (jwtTokenValue) {
      return true;
    }
    return false;
  }

  decodeJwtToken() {
    if(!this.jwtTokenValue){
    this.jwtTokenValue = localStorage.getItem('token');

    if (this.jwtTokenValue) {
      this.tokenValue = atob(this.jwtTokenValue.split('.')[1]);

      if (this.tokenValue) {
        this.decodedTokenValue = JSON.parse(this.tokenValue);
        console.log('decodedTokenValue', this.decodedTokenValue);
        this.currentUser = new DtoUser();
        if (this.decodedTokenValue.role) {
          this.currentUser.currentRoleName = this.decodedTokenValue.role;
        }

        if (this.decodedTokenValue.name) {
          this.currentUser.UserName = this.decodedTokenValue.name;
        }

        if (this.decodedTokenValue.UserId) {
          this.currentUser.Id = this.decodedTokenValue.UserId;
        }

        if (this.decodedTokenValue.RoleId) {
          this.currentUser.AssignRoleId = this.decodedTokenValue.RoleId;
        }
        if (this.decodedTokenValue.roleSettingsKey) {
          this.currentUser.roleSettingsKey = this.decodedTokenValue.roleSettingsKey;
        }

        console.warn('currentUser', this.currentUser);
      }
    }
   }
  }

  clearToken(){
    localStorage.removeItem('token');
    this.jwtTokenValue = null;
    this.tokenValue = null;
    this.decodedTokenValue = null;
    this.currentUser = null;
  }

  Login(user: DtoUser) {
    return this.http.post(environment.BaseAPIUrl + 'User/' + 'Login', user).pipe(
      map((resp: any) => {
        if (resp.Success && resp.Value != null) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', resp.Value.UserToken);  
          this.decodeJwtToken();
          this.router.navigateByUrl("/dashboard");

          this.Get(this.currentUser.Id).subscribe((resp: any)=>{
            
            this.currentUser = resp.Value;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser)); 
          })
        }
        else if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, Post');
          this.errService.displayDescriptiveErrorMessage("User", resp.Message, resp, 5, 'popup-error');
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

  Logout() {
    return this.http.get(environment.BaseAPIUrl + 'User/' + 'Logout').pipe(
      map((resp: any) => {       
          this.clearToken();
          this.router.navigateByUrl("/login");       
      }),
      catchError(error => {
        // Errors 500, 403, already resolved in interceptor
        // return throwError(this.errService.getErrorMessage(error));
        return error;
      })
    );
  }

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

  RegisterAdmin(user: DtoUser) {
    return this.http.post(environment.BaseAPIUrl + 'User/' + 'RegisterAdmin', user).pipe(
      map((resp: any) => {
        if (!resp.Success) {
          // this.errService.displayErrorMessage('Unknown error', 'Success false', null, 'UserService, Post');
          this.errService.displayDescriptiveErrorMessage("User", "Can't create administrator", resp, 5, 'popup-error');
        }
        else if (resp.Success) {
          this.errService.displayDescriptiveMessage("User", "Administrator created successfully!", resp, 5, 'popup-success');
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

  RegenerateToken() {
    return this.http.get<DtoUserResponse>(environment.BaseAPIUrl + 'AcUsercount/' + 'RegenerateToken').pipe(map((response: DtoUserResponse) => {
      if (response.Success && response.Value != null) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', response.Value.UserToken);
      
      }
      return response.Value;
    }));
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

export  class RoleKeys{
  public static SuperAdmin_GlobalSettings_Key: string = "{system-admin-role}";
  public static RegularUser_GlobalSettings_Key: string = "{system-user-role}}";
}
