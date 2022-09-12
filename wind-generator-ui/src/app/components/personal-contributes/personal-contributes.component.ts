import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DtoWindGeneratorDevice } from 'src/app/dto/DtoModels/WindGeneratorDevice/DtoWindGeneratorDevice';
import { DtoPaging } from 'src/app/dto/DtoRequestObjectModels/DtoPaging';
import { UserServiceService } from 'src/app/services/user.service';
import { WindGeneratorDeviceService } from 'src/app/services/wind-generator-device.service';
import { WindGeneratorTypeService } from 'src/app/services/wind-generator-type.service';
import { MapForSelectionComponent } from '../map-for-selection/map-for-selection.component';
import { HistoriesComponent } from '../modals/histories/histories.component';
import { SelectLocationMapModalComponent } from '../select-location-map-modal/select-location-map-modal.component';

@Component({
  selector: 'app-personal-contributes',
  templateUrl: './personal-contributes.component.html',
  styleUrls: ['./personal-contributes.component.scss']
})
export class PersonalContributesComponent implements OnInit {

  showFiller = false;
  listOfPages: any = [];
  listOfDashboards: DtoWindGeneratorDevice[] = [];
  user: any;
  dtoPagging: DtoPaging;

  constructor(private router: Router, private dialog: MatDialog, private windProviderDeviceService: WindGeneratorDeviceService,
    private userService: UserServiceService)
 {
   
  }

  ngOnInit(): void {
    this.initialDtoPagging();
    this.getInvestments();
  }

  initialDtoPagging(){
    this.dtoPagging = new DtoPaging();
    this.dtoPagging.filters = {};
    this.dtoPagging.filtersType = {};
    this.dtoPagging.page= 1;
    this.dtoPagging.totalPages= 10;
  }

  getInvestments(){
    this.dtoPagging.filters["ParentUserId"] = this.userService.currentUser.Id;
    this.dtoPagging.filtersType["ParentUserId"] = "eq";
    console.warn('dtoPagging',this.dtoPagging);
    this.windProviderDeviceService.GetList(this.dtoPagging).subscribe((resp:any)=>{
      console.warn('resp',resp);
      this.listOfDashboards = resp.Value;

      if(this.listOfDashboards){
        this.listOfDashboards.forEach(element => {
          var startTime = new Date(element.TimeCreated);
          var startYear = startTime.getFullYear() + 1;
          element.EndTime= startYear;
          element.TimeCreated2 = startTime.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
          element.ValueStr = Number(element.ValueStr).toFixed(2) + "";
          if(element.ParentWindGeneratorType){
          element.ParentWindGeneratorType.FullPrice = element.ParentWindGeneratorType.BasePrice + element.ParentWindGeneratorType.InstallationCosts;
          }
        });
      }
    })
  }

  getDashboards() {
  //   this.listOfDashboards = [   
  //     {
  //      Name: "Investment 1", 
  //      Country: "Serbia",
  //      City: "Belgrade",
  //      TimeCreated: "12.2.2022",
  //      WindPower: '3052 kW',
  //      Profit: "35%",
  //      FullPrice: "2M",
  //      Paid:"1M",
  //      PaymentYear:"2025",
  //      StartYear:"2015",
  //     },
  //     {
  //       Name: "Investment 2", 
  //       Country: "Serbia",
  //       City: "Belgrade",
  //       TimeCreated: "12.2.2022",
  //       WindPower: '3052 kW',
  //       Profit: "35%",
  //       FullPrice: "2M",
  //       Paid:"1M",
  //       PaymentYear:"2025",
  //       StartYear:"2015",
  //     },
  //     {
  //       Name: "Investment 3", 
  //       Country: "Serbia",
  //       City: "Belgrade",
  //       TimeCreated: "12.2.2022",
  //       WindPower: '3052 kW',
  //       Profit: "35%",
  //       FullPrice: "2M",
  //       Paid:"1M",
  //       PaymentYear:"2025",
  //       StartYear:"2015",
  //   },
  //   {
  //     Name: "Investment 4", 
  //     Country: "Serbia",
  //     City: "Belgrade",
  //     TimeCreated: "12.2.2022",
  //     WindPower: '3052 kW',
  //     Profit: "35%",
  //     FullPrice: "2M",
  //     Paid:"1M",
  //     PaymentYear:"2025",
  //     StartYear:"2015",
  // },
  // ]
    // var dtoEntityIds = new DtoEntityIds();
    // dtoEntityIds.Ids = this.auth.userPermitions.DashboardLive.View.EntityIds;
    // console.warn(this.auth.userPermitions);
    // if (this.auth.userPermitions.role == "SuperAdmin" || this.auth.userPermitions.DashboardLive.View.ClaimForAllEntities) {
    //   console.warn(this.auth.userPermitions);
    //   dtoEntityIds.ReturnAll = true;
    // }

    // this.dashboardService.GetDashboardsByIds(dtoEntityIds).subscribe((dashboardResp: DtoDashboardListResponse) => {
    //   console.log(`%cdashboardResp`, 'color: lime');
    //   console.log(dashboardResp);
    //   if (dashboardResp.Success) {
    //     if (dashboardResp.Value == null || dashboardResp.Value.length == 0) {
    //       //There is not active dashboards 
    //     }

    //   } else {
    //     //There is not active dashboards and error

    //   }

    //   this.listOfDashboards = dashboardResp.Value;
    // });
  }


  getHistory(data:any){
    const dialogRef = this.dialog.open(HistoriesComponent, {
      width: '800px',
      height:'700px',
      data: data,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // kad se ovaj zatvori treba refreshovati mapu
      
    });
  }

  gotoMap(dashboard:any){
    const dialogRef = this.dialog.open(SelectLocationMapModalComponent, {
      width: '800px',
      data: {object: dashboard},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.blockUI.start('');
      if(result != null && result != undefined) {
        if (result.latlon != null && result.latlon != undefined) {
          // this.realEstateFilters.patchValue({landFrom: result.latlon.lat, landTo: result.latlon.lng})
          // // console.log(this.windForm.value);

          // this.globalService.getAdressFromCoords(this.realEstateFilters.value.landFrom, this.realEstateFilters.value.landTo)
          // .subscribe(res => {
          //   if(res != null && res != undefined) {
          //     // console.log(res)
          //     this.realEstateFilters.patchValue({city: res.address.city, country: res.address.country});
          //   }
          // });
        }
      }
    });
  }

  goToLiveDashboard(db: any){

  }
 

}
