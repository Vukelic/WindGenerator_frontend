import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DtoUser } from 'src/app/dto/DtoModels/User/DtoUser';
import { UserServiceService } from 'src/app/services/user.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginStatus: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required]),
  });

  user: DtoUser = new DtoUser();
  constructor(private router: Router,  public dialog: MatDialog,private userService:UserServiceService) { }
  passwordFieldType: any = false;
  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.objSetConfigFormSubscription();
  }
  togglePasswordFieldType(){
    this.passwordFieldType = !this.passwordFieldType;
  }
  onLogin() {
    this.loginStatus = true;
    this.userService.Login(this.user).subscribe(res => {
      this.loginStatus = false;
        // this.getAllGenerators();
     });
   
  }
  onRegister(){
   // this.loginStatus = true;
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '400px',
     data: {},
     autoFocus: false,
   });
   dialogRef.afterClosed().subscribe((result) => {
    if(result && result.userClickedOk){
      if(result.user){
        
      }
    }
   });
  }

   //#region  forms

   objSetConfigFormSubscription() {
    this.loginForm.valueChanges.subscribe((x:any) => {
      setTimeout(() => {
        this.updatePropertiesFromFormGroupToObject(this.loginForm, this.user);
      }, 0);
    });
  }

    updatePropertiesFromFormGroupToObject(formGroup:any, object:DtoUser) {
      console.warn('updatePropertiesFromFormGroupToObject');
      if (object) {
        object.UserName = formGroup.getRawValue().username;
        object.Password = formGroup.getRawValue().password;
      }
    }
  
   
  //#endregion
}
