
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DtoUser } from 'src/app/dto/DtoModels/User/DtoUser';
import { DtoPaging } from 'src/app/dto/DtoRequestObjectModels/DtoPaging';
import { UserServiceService } from 'src/app/services/user.service';
import { ColumnDef } from '../custom-table/data-table/column-def';
import { DataSource } from '../custom-table/data-table/data-source';

import { ESortEnum } from '../custom-table/data-table/ESortEnum.enum';
import { RegistrationComponent } from '../registration/registration.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  dataSource: any; 
  columns: Partial<ColumnDef<DtoUser>>[] = [
   //  { key: 'actions', header: 'actions',sort: ESortEnum.none, hasSorting: false, hasFiltering: false },
      { key: 'Name', header: 'Name', cell: e => e.Name, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      { key: 'Surname', header: 'Surname', cell: e => e.Surname, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      { key: 'UserName', header: 'UserName', cell: e => e.UserName, sort: ESortEnum.none, hasSorting: true, hasFiltering: false },
      { key: 'Phone', header: 'Phone', cell: e => e.Phone, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      { key: 'Susspend', header: 'Susspend', cell: e => e.Susspend, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
    ];

      
  globalSettingsObject = {
    tableHasFiltering: false,
    tableHasSorting: true,
    tableHasPaging: true
  }
  dtoPaging: DtoPaging = new DtoPaging();
  constructor(private userService: UserServiceService,
    private dialog:MatDialog) { }

  updateFilters(data:any) {
    this.dtoPaging = data;
   // this.getAllAppointments();
  }

  updateSelect(data:any) {
    console.warn('***data',data);
   this.openUserConfigurationDialog(data);
  }

  updateSorting(data:any) {
    this.dtoPaging = data;
    this.getAllUsers();
  }

  updatePaging(data:any) {
    this.dtoPaging = data;
    this.getAllUsers();
  }

  updateAllFilters(data:any) {
    this.dtoPaging = data;
   this.getAllUsers();
  }

  getAllUsers(){
    this.userService.GetList(this.dtoPaging).subscribe((resp: any)=>{
      console.warn('**',resp)
      this.dataSource = new DataSource(resp.Value);
      this.dtoPaging = resp.PagingObject;
    })
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
  addNew(){
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '400px',
      data: {isNewUser: true},
      //autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result.userClickOk){
        this.getAllUsers();
      }
    });
  }

  openUserConfigurationDialog(user: any){
    console.warn('user', user);
    if(user != null){
    const dialogRef = this.dialog.open(UsersComponent, {
      width: '400px',
      data: {user: user},
      //autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        if(result.userClickOk){
          if(result.currentUser){
            this.userService.Put(result.currentUser.Id,result.currentUser).subscribe(res => {
              this.getAllUsers();
            });
          
          }
      }
      this.getAllUsers();
    }
    
    });
  }

}
  removeUser(user:any){

  }
}
