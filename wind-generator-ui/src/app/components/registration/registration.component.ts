import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DtoUser } from 'src/app/dto/DtoModels/User/DtoUser';
import { GlobalService } from 'src/app/services/global.service';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  currentUser: DtoUser = new DtoUser();
  constructor(public dialog: MatDialog, 
    private globalService: GlobalService,  
    private formBuilder: FormBuilder,
    public diag: MatDialogRef<RegistrationComponent>, 
    private userService: UserServiceService) { }

  ngOnInit(): void {
   
    this.objSetConfigFormSubscription();
  }

   //#region  forms

   objSetConfigFormSubscription() {
    this.registerForm.valueChanges.subscribe((x:any) => {
      setTimeout(() => {
        this.updatePropertiesFromFormGroupToObject(this.registerForm, this.currentUser);
      }, 0);
    });
  }

    updatePropertiesFromFormGroupToObject(formGroup:any, object:DtoUser) {
      console.warn('updatePropertiesFromFormGroupToObject');
      if (object) {
        object.UserName = formGroup.getRawValue().email;
        object.Password = formGroup.getRawValue().password;
        object.Surname = formGroup.getRawValue().lastName;
        object.Name = formGroup.getRawValue().firstName;
        object.Phone = formGroup.getRawValue().phone;
      }
    }
  
    updatePropertiesFromObjectSetToFormGroup(formGroup:any, object:DtoUser) {
      if (object) {
        formGroup.setValue({
          email: object.UserName || '',
          password: object.Password || '',
          lastName: object.Surname || '',
          firstName: object.Name || '',
          phone: object.Phone || '',
        });
      }
    }
  //#endregion

  onRegistration(){
    console.warn('current user:', this.currentUser);
    //SEND REQ TO SERVICE

    // this.userService.Register(this.currentUser).subscribe(res => {
     
    //  // this.getAllGenerators();
    // });

     this.diag.close();
  }
}
