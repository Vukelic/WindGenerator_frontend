import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DtoChangePassword } from 'src/app/dto/DtoModels/ChangePassword/DtoChangePassword';
import { DtoUser } from 'src/app/dto/DtoModels/User/DtoUser';
import { GlobalService } from 'src/app/services/global.service';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  accountForm = new FormGroup({
    newPassword: new FormControl('',[Validators.required]),
    oldPassword: new FormControl('',[Validators.required]),
  });

  current: DtoChangePassword = new DtoChangePassword();
  constructor(public dialog: MatDialog, 
    private globalService: GlobalService,  
    private formBuilder: FormBuilder,
    public myAccountComponent: MatDialogRef<MyAccountComponent>, 
    private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.objSetConfigFormSubscription();
  }

   //#region  forms

   objSetConfigFormSubscription() {
    this.accountForm.valueChanges.subscribe((x:any) => {
      setTimeout(() => {
        this.updatePropertiesFromFormGroupToObject(this.accountForm, this.current);
      }, 0);
    });
  }

    updatePropertiesFromFormGroupToObject(formGroup:any, object:DtoChangePassword) {
      console.warn('updatePropertiesFromFormGroupToObject');
      if (object) {
        object.NewPassword = formGroup.getRawValue().newPassword;
        object.OldPassword = formGroup.getRawValue().oldPassword;
      }
    }
  
   
  //#endregion
  changePassword(){
    this.current.UserId = this.userService.currentUser.Id;
    this.userService.ChangePassword(this.current).subscribe((resp:any)=>{
      if(resp.Success){
      this.userService.Logout().subscribe(resp=>{

        this.myAccountComponent.close({userClickOk: true});
      });
    }
    })
  }

  cancel(){
    this.myAccountComponent.close();
  }
}
