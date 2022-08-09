import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(private router: Router,public dialog: MatDialogRef<UserSettingsComponent>, ) { }

  ngOnInit(): void {
  }

  cancel(){
    this.dialog.close({userChoiceOk: false});
  }

  save() {
    this.dialog.close({userChoiceOk: true});
  }

  logout(){
    
  }

}