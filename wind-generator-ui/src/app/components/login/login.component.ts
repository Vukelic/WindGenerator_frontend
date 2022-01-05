import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,  public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.router.navigate(['/dashboard']);
  }
  onRegister(){
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '400px',
     data: {},
     autoFocus: false,
   });
   dialogRef.afterClosed().subscribe((result) => {

   });
  }
}
