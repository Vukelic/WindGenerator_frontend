import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  path1:any = "/assets/pic1.JPG";
  path2:any = "/assets/pic2.JPG";

  listOfDeviceType: any = [];
  constructor() { }

  ngOnInit(): void {
    this.getTypes();
  }

  edit(){

  }

  

  getTypes() {
    this.listOfDeviceType = [   
      {
       Name: "Type 1", 
       Turbines: "Radial",
       PowerOfTurbines: "3kW",
       HeightOfWing: "3.2M",
       WidthOfWing: '1.8M',
       Weight: "300kg",
       MaxPowerTurbine: "14m/s",
       MaxSpeedTurbine: "50m/s",
       GeneratorPower:"1KW",
       Guarantee:"5 Years",   
       ImageUrl: "/assets/wt1.JPG"    
      },
      {
        Name: "Type 2", 
        Turbines: "Radial",
        PowerOfTurbines: "3kW",
        HeightOfWing: "3.2M",
        WidthOfWing: '1.8M',
        Weight: "300kg",
        MaxPowerTurbine: "14m/s",
        MaxSpeedTurbine: "50m/s",
        GeneratorPower:"1KW",
        Guarantee:"5 Years",   
        ImageUrl: "/assets/wt2.JPG"   
       },   
      {
        Name: "Type 3", 
        Turbines: "Radial",
        PowerOfTurbines: "3kW",
        HeightOfWing: "3.2M",
        WidthOfWing: '1.8M',
        Weight: "300kg",
        MaxPowerTurbine: "14m/s",
        MaxSpeedTurbine: "50m/s",
        GeneratorPower:"1KW",
        Guarantee:"5 Years",  
        ImageUrl: "/assets/wt3.JPG"       
       },
       {
        Name: "Type 4", 
        Turbines: "Radial",
        PowerOfTurbines: "3kW",
        HeightOfWing: "3.2M",
        WidthOfWing: '1.8M',
        Weight: "300kg",
        MaxPowerTurbine: "14m/s",
        MaxSpeedTurbine: "50m/s",
        GeneratorPower:"1KW",
        Guarantee:"5 Years",  
        ImageUrl: "/assets/wt4.JPG"       
       },
  ]
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

}
