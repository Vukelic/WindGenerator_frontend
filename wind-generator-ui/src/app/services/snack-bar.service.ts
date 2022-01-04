import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message:any, action:any, duration:any, cssClass:any) {
    this._snackBar.open(`${message ?? ''}`, `${action ?? 'Ok'}`, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: (duration ?? this.durationInSeconds) * 1000,
      panelClass: cssClass ?? null
    });
  }
}
