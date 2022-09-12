import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DtoWindGeneratorDevice } from 'src/app/dto/DtoModels/WindGeneratorDevice/DtoWindGeneratorDevice';
import { DtoWindGeneratorDevice_History } from 'src/app/dto/DtoModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_History';
import { DtoPaging } from 'src/app/dto/DtoRequestObjectModels/DtoPaging';
import { WindGeneratorDeviceHistoryService } from 'src/app/services/wind-generator-device-history.service';
import { WindGeneratorDeviceService } from 'src/app/services/wind-generator-device.service';
import { ColumnDef } from '../custom-table/data-table/column-def';
import { DataSource } from '../custom-table/data-table/data-source';
import { ESortEnum } from '../custom-table/data-table/ESortEnum.enum';
import { Mockup, testData } from './Mockup';
import { Mockup1, testData1 } from './Mockup1';
import { Mockup2, testData2 } from './Mockup2';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  dataSource:any;
  dataSource1:any; 

  dataSource2 = new DataSource(testData2); 
  dtoPaging: DtoPaging = new DtoPaging();
  dtoPaging1: DtoPaging = new DtoPaging();
  columns: Partial<ColumnDef<DtoWindGeneratorDevice_History>>[] = [
  //  { key: 'actions', header: 'Selected', sort: ESortEnum.none, hasSorting: false, hasFiltering: false },
  { key: 'Name', header: 'Name of Turbine', cell: e => e.ParentWindGeneratorDevice?.Name, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
  { key: 'ValueStr', header: 'Power of turbine', cell: e => Number(e.ValueStr).toFixed(2), sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
  { key: 'TimeCreated', header: 'Time created', cell: e => new Date(e.TimeCreated).toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2'), sort: ESortEnum.none, hasSorting: true, hasFiltering: false },
    
  
    // { key: 'ceo', header: 'ceo', cell: e => e.ceo, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
  ];

  columns1: Partial<ColumnDef<DtoWindGeneratorDevice>>[] = [
    //  { key: 'actions', header: 'Selected', sort: ESortEnum.none, hasSorting: false, hasFiltering: false },
      { key: 'Name', header: 'Name of Investment', cell: e => e.Name, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      { key: 'ValueStr', header: 'Current Power of Turbine', cell: e => Number(e.ValueStr).toFixed(2), sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      { key: 'PowerOfTurbines', header: 'Max Power Of Turbine', cell: e => e.ParentWindGeneratorType.PowerOfTurbines, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      { key: 'Country', header: 'Country', cell: e => e.Country, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      { key: 'FullPrice', header: 'Full Price of Investment', cell: e => e.ParentWindGeneratorType.BasePrice + e.ParentWindGeneratorType.InstallationCosts, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      { key: 'TimeCreated', header: 'Time created', cell: e => new Date(e.TimeCreated).toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2'), sort: ESortEnum.none, hasSorting: true, hasFiltering: false },
    ];
    
    columns2: Partial<ColumnDef<Mockup2>>[] = [
      //  { key: 'actions', header: 'Selected', sort: ESortEnum.none, hasSorting: false, hasFiltering: false },
        { key: 'Jan', header: 'Jan', cell: e => e.Jan, sort: ESortEnum.none, hasSorting: true, hasFiltering: false },
        { key: 'Feb', header: 'Feb', cell: e => e.Feb, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
        { key: 'March', header: 'March', cell: e => e.March, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
        { key: 'Apr', header: 'Apr', cell: e => e.Apr, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      ];
  
  globalSettingsObject = {
    tableHasFiltering: true,
    tableHasSorting: true,
    tableHasPaging: true
  }

  title = 'googlechart';  
  type:any = 'PieChart';  
  type2:any = 'BarChart';
  type3:any = 'AreaChart';
  data = [  
     ['Name1', 5.0],  
     ['Name2', 36.8],  
     ['Name3', 42.8],  
     ['Name4', 18.5],  
     ['Name5', 16.2]  
  ];  
  columnNames = ['Name', 'Percentage'];  
  options = {      
  };  
  width = 500;  
  height = 300;  

  widthChart = 550;
  heightChart = 400;
  historyItems:any[]=[];
  selectedItems:any[] = [];
  displayedColumnsItemChart:any[] =['time'];
  selectedType:any = "Histogram";
  constructor(private historyService: WindGeneratorDeviceHistoryService,
    private generatorService: WindGeneratorDeviceService) { }

  ngOnInit(): void {
    this.getHourAllData();
    this.getAllGenerators();
   // this.getAllHistories();
  }
//#region table functions
  updateFilters(data:any) {
    this.dtoPaging = data;
    this.getHourAllData();
   // this.getAllAppointments();
  }

  updateSelect(data:any) {
  //  this.router.navigate(["/app/details-examination/" + data?.Id]);
  }

  updateSorting(data:any) {
    this.dtoPaging = data;
    this.getHourAllData();
   // this.getAllAppointments();
  }

  updatePaging(data:any) {
    this.dtoPaging = data;
    this.getHourAllData();
    //this.getAllAppointments();
  }

  updateAllFilters(data:any) {
    this.dtoPaging = data;
    this.getHourAllData();
   // this.getAllAppointments();
  }

  updateFilters1(data:any) {
    this.dtoPaging1 = data;
    this.getAllGenerators();
   // this.getAllAppointments();
  }

  updateSelect1(data:any) {
  //  this.router.navigate(["/app/details-examination/" + data?.Id]);
  }

  updateSorting1(data:any) {
    this.dtoPaging1 = data;
    this.getAllGenerators();
   // this.getAllAppointments();
  }

  updatePaging1(data:any) {
    this.dtoPaging1 = data;
    this.getAllGenerators();
    //this.getAllAppointments();
  }

  updateAllFilters1(data:any) {
    this.dtoPaging1 = data;
    this.getAllGenerators();
   // this.getAllAppointments();
  }
//#endregion

  getHourAllData(){
  // var startTime = new Date();
  // startTime.setHours(startTime.getHours() - 24);
  // this.dtoPaging.filters["TimeCreated::-->>1"] = startTime;
  // this.dtoPaging.filtersType["TimeCreated::-->>1"] = "gtoe";
  // this.dtoPaging.filters["TimeCreated::-->>2"] = new Date;
  // this.dtoPaging.filtersType["TimeCreated::-->>2"] = "ltoe";
  this.historyService.GetList(this.dtoPaging).subscribe((resp: any) => {
        console.warn('historyService',resp);
      if(resp && resp.Success){
        this.dataSource = new DataSource(resp.Value);
        this.dtoPaging = resp.PagingObject;
      }
    });
  }
  getAllGenerators(){
    this.generatorService.GetList(this.dtoPaging1).subscribe((resp: any) => {
      console.warn('generatorService',resp);
      if(resp && resp.Success){
        this.dataSource1 = new DataSource(resp.Value);
        this.dtoPaging1 = resp.PagingObject;
      }
    });
  }

  //#region 
  getAllHistories(){
    this.historyItems = [];
  

    
    this.generatorService.GetList(null).subscribe((resp: any)=>{
     
      if(resp && resp.Success){
       // console.warn('resp',resp);
       
        this.selectedItems = resp.Value;
        this.selectedItems.sort(function(a, b) {
          return a.Id - b.Id;
        });
      console.warn('selectedItems',this.selectedItems);
        this.selectedItems.forEach((element:any) => {
          console.warn('element',element);
          if(element.Name == ""){element.Name = "Turbine";}
           this.AddColumnName(element.Name);
           this.dtoPaging.filters = {};
           this.dtoPaging.filtersType = {};
           this.dtoPaging.filters["ParentWindGeneratorDeviceId"] = element.Id;
           this.dtoPaging.filtersType["ParentWindGeneratorDeviceId"] = "eq";

            this.historyService.GetList(this.dtoPaging).subscribe((resp: any) => {
                console.warn('historyService',resp);
                if(resp && resp.Success){
                  this.AddColumn(resp);
                }
            });
        });
       
      }

    })
  
  }


  AddColumn(historyItem: any) {
 //   this.historyItems = [];
    //console.warn('allItemsIds', this.allItemsIds);
    if (historyItem && historyItem.Value.length > 0) {
      this.pushInitTime(historyItem);


      if (this.historyItems && this.historyItems.length > 0) {

        this.historyItems.forEach((clockHistory: any, clockHistoryIndex: any) => {
          //ulazimo u svaki clock

        //  this.allItemsIds.forEach((itemId: any) => {
            //ulazim u svaki id itema
            var valueToPush = 0;
            
            for (var i = 0; i < historyItem.Value.length; i++) {
             // console.warn('historyItem',historyItem);
              //ulazim u svaki history koji je dosao sa servera
              var elementHistory = historyItem.Value[i];
              //if (itemId == elementHistory.Id) {
                if (moment(elementHistory.TimeCreated, 'DD-MM/YY HH:mm:ss').minute() == moment(clockHistory, 'DD-MM/YY HH:mm:ss').minute()) {
                  if (elementHistory.ValueStr) {
                    valueToPush = Math.trunc(Number(elementHistory.ValueStr));
                    break;
                  }

                }
              }
           // };
            clockHistory.push(valueToPush);
        //  });       
        });   
      }
    }
  }

  pushInitTime(historyItem: any) {

    if (historyItem && historyItem.Value.length > 0) {
      historyItem.Value.forEach((element: any, index: any) => {
        var isExists = this.historyItems.findIndex((p: any) => {
          return moment(p, 'DD-MM/YY HH:mm:ss').minute() == moment(element.TimeCreated, 'DD-MM/YY HH:mm:ss').minute();
        }
        );

        if (isExists < 0) {
          var clock = moment(element.TimeCreated).format("DD-MM/YY HH:mm:ss").toString();
          this.historyItems.push([clock]);
        }
      });
    }
    console.warn('historyItems', this.historyItems);
  }

  AddColumnName(name: string) {
    var toAdd = false;
    if(name == ""){name="generator"}

    var isExistsColumnIndex = this.displayedColumnsItemChart.findIndex(k => k == name);
    if (isExistsColumnIndex < 0) {
      toAdd = true;
    }

    if (toAdd) {
      this.displayedColumnsItemChart.push(name);
    }
  }
  //#endregion
}
