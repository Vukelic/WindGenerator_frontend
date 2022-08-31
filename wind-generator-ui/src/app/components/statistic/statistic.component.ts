import { Component, OnInit } from '@angular/core';
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
    { key: 'TimeCreated', header: 'date', cell: e => new Date(e.TimeCreated).toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2'), sort: ESortEnum.none, hasSorting: true, hasFiltering: false },
    { key: 'ValueStr', header: 'power', cell: e => Number(e.ValueStr).toFixed(2), sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
    { key: 'Name', header: 'name', cell: e => e.ParentWindGeneratorDevice?.Name, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
    // { key: 'ceo', header: 'ceo', cell: e => e.ceo, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
  ];

  columns1: Partial<ColumnDef<DtoWindGeneratorDevice>>[] = [
    //  { key: 'actions', header: 'Selected', sort: ESortEnum.none, hasSorting: false, hasFiltering: false },
      { key: 'Name', header: 'name', cell: e => e.Name, sort: ESortEnum.none, hasSorting: true, hasFiltering: false },
      { key: 'TimeCreated', header: 'date', cell: e => new Date(e.TimeCreated).toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2'), sort: ESortEnum.none, hasSorting: true, hasFiltering: false },
      { key: 'Country', header: 'country', cell: e => e.Country, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
      { key: 'City', header: 'city', cell: e => e.City, sort: ESortEnum.none, hasSorting: true, hasFiltering: true },
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
  constructor(private historyService: WindGeneratorDeviceHistoryService,
    private generatorService: WindGeneratorDeviceService) { }

  ngOnInit(): void {
    this.getHourAllData();
    this.getAllGenerators();
  }

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

getHourAllData(){
  var startTime = new Date();
  startTime.setHours(startTime.getHours() - 5);
  this.dtoPaging.filters["TimeCreated::-->>1"] = startTime;
  this.dtoPaging.filtersType["TimeCreated::-->>1"] = "gtoe";
  this.dtoPaging.filters["TimeCreated::-->>2"] = new Date;
  this.dtoPaging.filtersType["TimeCreated::-->>2"] = "ltoe";
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
}
