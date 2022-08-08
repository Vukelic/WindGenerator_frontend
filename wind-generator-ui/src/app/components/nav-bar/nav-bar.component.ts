import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserServiceService } from 'src/app/services/user.service';
import { MyAccountComponent } from '../my-account/my-account.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @ViewChild('left', { static: true }) leftSidenav:any;
  @ViewChild('right', { static: true }) rightSidenav:any;
  emitInvalidateSizeMap: Subject<any> = new Subject<any>();
  emitLeftSidebarWidth: Subject<any> = new Subject<any>();
  options: FormGroup;
  leftSidenavOpened: boolean = true;
  rightSidenavOpened: boolean = false;
  rightSideFullscreen: boolean = false;
  constructor(    
    public dialog: MatDialog,  
    private router: Router,
    public userService: UserServiceService,
    fb: FormBuilder,) {
      this.options = fb.group({
        bottom: 0,
        fixed: false,
        top: 0,
      });
     }

  ngOnInit(): void {
  }

  gotoMyInvestments(){
    //this.router.navigate(['/map']);
  }

  gotoUserSettings() {
    this.router.navigate(['/user-settings']);
  }
  openSidebar() {
    setTimeout(() => {
      this.leftSidenav.toggle();
    }, 700);
  }

  toggleLeftSidenav(event:any) {
    this.leftSidenavOpened = !this.leftSidenavOpened;
    var tmpleft = $('#leftSidenav').width();
    this.emitLeftSidebarWidth.next(tmpleft);
    // console.log(this.leftSidenav.toggle()._animationDoneListener(event));

    this.leftSidenav.toggle();

    setTimeout(() => {
      this.emitInvalidateSizeMap.next('');
    }, 300);
  }

  toggleLeftSidenavDone() {
    var tmpleft = $('#leftSidenav').width();
    if (this.leftSidenav._opened) {
      this.emitLeftSidebarWidth.next({
        left: tmpleft,
        opened: this.leftSidenav._opened,
      });
    } else {
      this.emitLeftSidebarWidth.next({
        left: 0,
        opened: this.leftSidenav._opened,
      });
    }
  }

  gotoLogout(){
    this.userService.Logout().subscribe(()=>{

    });

  }
  gotoInvestigate(){

  }
  gotoGlobalInvestments(){

  }

  gotoAccountSettings() {
      const dialogRef = this.dialog.open(MyAccountComponent, {
       width: '400px',
      data: {},
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
