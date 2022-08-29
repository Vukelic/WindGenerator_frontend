import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user.service';
import { MyAccountComponent } from '../../my-account/my-account.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
 public currentUsername:any;
  constructor(private router: Router,public userSettingsComponent: MatDialogRef<UserSettingsComponent>,
    public userService: UserServiceService ,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.currentUsername = this.userService.currentUser.UserName;
    console.warn('currentUsername',this.currentUsername)
  }

  cancel(){
    this.userSettingsComponent.close({userChoiceOk: false});
  }

  save() {
    this.userSettingsComponent.close({userChoiceOk: true});
  }

  logout(){
    this.userService.Logout().subscribe(()=>{
      this.userSettingsComponent.close();
    });
  }

  changePassword(){
    this.userSettingsComponent.close({userChoiceOk: false});
    const dialogRef = this.dialog.open(MyAccountComponent, {
      width: '400px',
     data: {},
     autoFocus: false,
   });
   dialogRef.afterClosed().subscribe((result) => {
    // if(result?.userClickOk){
    //   this.userSettingsComponent.close({userChoiceOk: false});
    // }
   });
  }

}