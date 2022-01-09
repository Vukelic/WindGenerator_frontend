import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable, switchMap, timer } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserServiceService } from 'src/app/services/user.service';

const regenerateTokenTimeInSeconds = 1800;
const jwtHelper = new JwtHelperService();
var regenerateTokenInProgress = false;
var accessRight;
@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private userService: UserServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor');
    const tokenFromLocalStorage = localStorage.getItem('token');
    const expirationDate = jwtHelper.getTokenExpirationDate(tokenFromLocalStorage);
    const isExpired = jwtHelper.isTokenExpired(tokenFromLocalStorage);

    // console.warn('intercept');
    if (tokenFromLocalStorage) {
      if (isExpired) {
        // token expired logout
      //  this.userService.clearToken();
        return EMPTY;
      } else {
        // token valid      
        var tmpSeconds = ((expirationDate.getTime() - Date.now()) / 1000);
        if (tmpSeconds < regenerateTokenTimeInSeconds) { //session is expiring in 30min
          console.log(`istice za ${tmpSeconds} sekundi`);

          if (!regenerateTokenInProgress) {
            regenerateTokenInProgress = true;
            this.userService
              .RegenerateToken()
              .subscribe(
                (res: any) => {
                  regenerateTokenInProgress = false;
                }, (error: any) => {
                  console.log(error);
                  regenerateTokenInProgress = false;
                });
          } else {

          }

        }
        //var requestIdentifier = this.resolveResourceAndAction(req.url, req.method);
        // if (requestIdentifier && requestIdentifier.isAnonimus == false) {
        //   var isWebApiAlowed = this.globalHelperService.accessToResourceActionAllowed(requestIdentifier);
        //   if (!isWebApiAlowed) {
        //     //req is canceled
        //     return EMPTY;
        //   }
        // }



        const cloned = req.clone({
          headers: req.headers.set("Authorization",
            "Bearer " + tokenFromLocalStorage)
        });

        if (regenerateTokenInProgress) {
          return timer(2000).pipe(         // <== Wait 2 Seconds
            switchMap(() => next.handle(cloned))   // <== Switch to the Http Stream
          )
        } else {
          return next.handle(cloned);
        }

      }

    }
    else {
      return next.handle(req);
    }
  }
}

