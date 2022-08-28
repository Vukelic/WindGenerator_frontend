import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DtoUser } from 'src/app/dto/DtoModels/User/DtoUser';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

 userForm:FormGroup = new FormGroup({
  UserName: new FormControl('',[Validators.required]),
  Surname: new FormControl(''),
  Name: new FormControl(''),
  Phone: new FormControl(''),
  Susspend: new FormControl(''),
  });
  typeOfSuspend:any[]=[{Title: 'Suspended', Value: true},{Title: 'Not suspended', Value: false}]
  currentUser: DtoUser;
  constructor(  public userModalComponent: MatDialogRef<UsersComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public userService: UserServiceService) { }

  ngOnInit(): void {
  
    console.warn('data',this.data);
    if(this.data?.user){
      this.currentUser = this.data?.user;  
    }else{
      this.currentUser = new DtoUser();
    }
    this.updatePropertiesFromObjectSetToFormGroup(this.userForm, this.currentUser);
    this.objSetConfigFormSubscription();
   
  }

   //#region  forms

   objSetConfigFormSubscription() {
    this.userForm.valueChanges.subscribe(x => {
      setTimeout(() => {
        this.updatePropertiesFromFormGroupToObject(this.userForm, this.currentUser);
      }, 0);
    });
  }

    updatePropertiesFromFormGroupToObject(formGroup:any, object:any) {
      console.warn('updatePropertiesFromFormGroupToObject');
      if (object) {
        object.Name = formGroup.getRawValue().Name;
        object.UserName = formGroup.getRawValue().UserName;
        object.Surname = formGroup.getRawValue().Surname;
        object.Phone = formGroup.getRawValue().Phone;
        object.Susspend = formGroup.getRawValue().Susspend;     
      }
    }
  
    updatePropertiesFromObjectSetToFormGroup(formGroup:any, object:any) {
      if (object) {
        formGroup.setValue({
          Name: object?.Name,
          UserName: object?.UserName,
          Surname: object?.Surname,
          Phone: object?.Phone,
          Susspend: object?.Susspend || false,      
        });
      }
    }
  //#endregion

  save(){
    console.warn('currentUser', this.currentUser);
    this.userModalComponent.close({ userClickOk: true, currentUser: this.currentUser });
  }

  cancel(){
    this.userModalComponent.close({ userClickOk: false });
  }


}
