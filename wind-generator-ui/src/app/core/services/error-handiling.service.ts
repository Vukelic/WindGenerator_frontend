import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  // devMode: boolean = true;

  constructor(private snackbarService: SnackBarService) { }

  displayDescriptiveErrorMessage(title:any, message:any, errorResp:any, time = 5, cssClass = 'popup-info') {
    if (!environment.production) {
      //dev error
      this.snackbarService.openSnackBar(`${title}: ${message} (Ref. id: ${this.getRefIdFromDate()})`, null, time, cssClass);
    } else {
      //prod error
      this.snackbarService.openSnackBar(`${message} (${this.getRefIdFromDate()})`, null, time, cssClass);
    }

    this.updateLogWithErrorMessage(errorResp);
  }

  displayDescriptiveMessage(title:any, message:any, errorResp:any, time = 5, cssClass = 'popup-info') {
    if (!environment.production) {
      //dev error
      this.snackbarService.openSnackBar(`${title}: ${message}`, null, time, cssClass);
    } else {
      //prod error
      this.snackbarService.openSnackBar(`${message} (${this.getRefIdFromDate()})`, null, time, cssClass);
    }

    this.updateLogWithErrorMessage(errorResp);
  }

  displayErrorMessage(title:any, message:any, inError:any, from:any) {
    if (!environment.production) {
      // var fromArr = from.split(',');
      // var fromService = fromArr[0] ?? '';
      // var fromFunction = fromArr[1] ?? '';
      this.snackbarService.openSnackBar(`${title}: ${message} (${from})`, null, 5, 'snack-bar-warning');
    } else {
      this.snackbarService.openSnackBar(`${title}: ${message}`, null, 5, 'snack-bar-warning');
    }
  }

  getRefIdFromDate() {
    let refId = '';
    let datetime = new Date();

    let formattedTime = {
      date: datetime.getDate(),
      hours: datetime.getHours(),
      minutes: datetime.getMinutes(),
      seconds: datetime.getSeconds(),
      milliseconds: ('00' + datetime.getMilliseconds()).slice(-3)
    }

    return refId = `${formattedTime.date}.${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}.${formattedTime.milliseconds}`;
  }

  updateLogWithErrorMessage(errorResp:any) {
    // web api call for updating log list of errors with ref ids 
    console.log(errorResp);
  }

  getErrorMessage(error:any) {
    let errorMsg: string;
    if (error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = this.getServerErrorMessage(error);
    }
    return errorMsg;
  }

  getServerErrorMessage(error: any): string {
    switch (error.code) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 415: {
        return `Unsupported Media: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }

}
