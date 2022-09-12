import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DtoWindGeneratorType } from 'src/app/dto/DtoModels/WindGeneratorType/DtoWindGeneratorType';
import { UserServiceService } from 'src/app/services/user.service';
import { WindGeneratorTypeService } from 'src/app/services/wind-generator-type.service';
import { DeviceTypeModalComponent } from '../modals/device-type-modal/device-type-modal.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  path1:any = "/assets/pic1.JPG";
  path2:any = "/assets/pic2.JPG";

  listOfDeviceType:  DtoWindGeneratorType[] = [];
  constructor(
    public dialog: MatDialog,
    public windGeneratorTypeService: WindGeneratorTypeService,
    public userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.getTypes();
  }

  edit(newType: DtoWindGeneratorType){
    const dialogRef = this.dialog.open(DeviceTypeModalComponent, {
      width: '800px',
      height:'600px',
      data: { type: newType },
      //autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result && result.userClickOk){
        this.windGeneratorTypeService.Put(result.currentType.Id, result.currentType).subscribe((resp: any)=>{
          this.getTypes();
        })
      }
    });
    this.getTypes();
  }

  delete(type: any){
    this.windGeneratorTypeService.Delete(type.Id).subscribe((resp: any)=>{
      this.getTypes();
    })
  }

  addNew(type: DtoWindGeneratorType){
      const dialogRef = this.dialog.open(DeviceTypeModalComponent, {
      width: '800px',
      height:'600px',
      data: {type: type},
      //autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result && result.userClickOk){
        this.windGeneratorTypeService.Post(result.currentType).subscribe((resp: any)=>{
          this.getTypes();
        })
      }
    });
    this.getTypes();
  }

  

  getTypes() {
    // this.listOfDeviceType = [   
      // {
      //  Name: "Type 1", 
      //  Turbines: "Radial",
      //  PowerOfTurbines: "3kW",
      //  HeightOfWing: "3.2M",
      //  WidthOfWing: '1.8M',
      //  Weight: "300kg",
      //  MaxPowerTurbine: "14m/s",
      //  MaxSpeedTurbine: "50m/s",
      //  GeneratorPower:"1KW",
      //  Guarantee:"5 Years",   
      //  ImageUrl: "/assets/wt1.JPG"    
      // },
      // {
      //   Name: "Type 2", 
      //   Turbines: "Radial",
      //   PowerOfTurbines: "3kW",
      //   HeightOfWing: "3.2M",
      //   WidthOfWing: '1.8M',
      //   Weight: "300kg",
      //   MaxPowerTurbine: "14m/s",
      //   MaxSpeedTurbine: "50m/s",
      //   GeneratorPower:"1KW",
      //   Guarantee:"5 Years",   
      //   ImageUrl: "/assets/wt2.JPG"   
      //  },   
      // {
      //   Name: "Type 3", 
      //   Turbines: "Radial",
      //   PowerOfTurbines: "3kW",
      //   HeightOfWing: "3.2M",
      //   WidthOfWing: '1.8M',
      //   Weight: "300kg",
      //   MaxPowerTurbine: "14m/s",
      //   MaxSpeedTurbine: "50m/s",
      //   GeneratorPower:"1KW",
      //   Guarantee:"5 Years",  
      //   ImageUrl: "/assets/wt3.JPG"       
      //  },
      //  {
      //   Name: "Type 4", 
      //   Turbines: "Radial",
      //   PowerOfTurbines: "3kW",
      //   HeightOfWing: "3.2M",
      //   WidthOfWing: '1.8M',
      //   Weight: "300kg",
      //   MaxPowerTurbine: "14m/s",
      //   MaxSpeedTurbine: "50m/s",
      //   GeneratorPower:"1KW",
      //   Guarantee:"5 Years",  
      //   ImageUrl: "/assets/wt4.JPG"       
      //  },
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


    this.windGeneratorTypeService.GetList(null).subscribe((resp: any)=>{
        this.listOfDeviceType = resp.Value;
    })
  }

}
