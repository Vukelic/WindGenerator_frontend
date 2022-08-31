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

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  user: DtoUser = new DtoUser();
  constructor(private router: Router,  public dialog: MatDialog,private userService:UserServiceService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.objSetConfigFormSubscription();
  }

  onLogin() {
    this.userService.Login(this.user).subscribe(res => {
     
        // this.getAllGenerators();
     });
   
  }
  onRegister(){
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
