import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { DtoWindGeneratorDevice } from 'src/app/dto/DtoModels/WindGeneratorDevice/DtoWindGeneratorDevice';
import { DtoWindGeneratorDevice_History } from 'src/app/dto/DtoModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_History';
import { WindGeneratorDevice_History } from 'src/app/dto/DtoModels/WindGeneratorDevice_History/WindGeneratorDevice_History';
import { DtoPaging } from 'src/app/dto/DtoRequestObjectModels/DtoPaging';
import { DtoWindGeneratorDevice_HistoryListResponse } from 'src/app/dto/DtoResponseObjectModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_HistoryListResponse';
import { DtoWindGeneratorDevice_HistoryResponse } from 'src/app/dto/DtoResponseObjectModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_HistoryResponse';
import { WindGeneratorDeviceHistoryService } from 'src/app/services/wind-generator-device-history.service';
import { WindGeneratorDeviceService } from 'src/app/services/wind-generator-device.service';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss']
})
export class HistoriesComponent implements OnInit  {

  isReadyPreviewChart = false;
 paginatorCount: any;
 pageSize: any;
 page: any;
 dtoPaging = new DtoPaging();
 parentGenerator = new DtoWindGeneratorDevice();

 displayedColumnsItemChart: any[] = ['time'];
 selectedItems: any;
 historyItems: any;
constructor(public dialog: MatDialogRef<HistoriesComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: any, private historyService: WindGeneratorDeviceHistoryService,
  private windService: WindGeneratorDeviceService) {

}
selectedType: any;
allTypes:any = [
  {Name: "Line Chart",Value:"LineChart"},
  {Name: "Area Chart",Value:"AreaChart"},
  {Name: "Column Chart",Value:"ColumnChart"},
  {Name: "Pie Chart",Value:"PieChart"},
  {Name: "Histogram",Value:"Histogram"},

]
  displayedColumns: string[] = ['Name', 'ValueDec', 'TimeCreated'];
  dataSource: MatTableDataSource<DtoWindGeneratorDevice_History>;
  selectedInterval:any;
  listOfIntervals:any[] = [
    {Title: "One hour ago", Value: "Hour"},
    {Title: "One day ago", Value: "Day"},
    {Title: "One week ago", Value: "Week"},
    {Title: "A month ago", Value: "Month"},
    {Title: "A year ago", Value: "Year"},
    {Title: "Custom interval", Value: "Custom"},
  ]

  startDate:any;
  endDate:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
   // this.dataSource.paginator = this.paginator;
   console.warn('data',this.data);
    if(this.data){
      this.parentGenerator = this.data;
    }
   // this.getAllHistories();
  }
  cancel(){
    this.dialog.close();
  }

  selectedEvent(value:any){
    console.warn('value',value);
  }

  selectedTypeEvent(value:any){

  }


  ok(){
    this.dialog.close();
  }

  view(){
    var utcStr = new Date().toUTCString();
    var now = new Date(utcStr);

    var startTime = new Date(
      now.getFullYear() || null,
      now.getMonth() || null,
      now.getDate() || null,
      now.getHours() || null,
      now.getMinutes() || null,
      now.getSeconds() || null,
    );

    var endTime = new Date(
      now.getFullYear() || null,
      now.getMonth() || null,
      now.getDate() || null,
      now.getHours() || null,
      now.getMinutes() || null,
      now.getSeconds() || null,
    );

    if(this.selectedInterval == "Hour"){
      startTime.setHours(startTime.getHours() - 1);
    }
    else if(this.selectedInterval == "Day"){
      startTime.setDate(startTime.getDate() - 1);
      startTime.setHours(0);
      endTime.setHours(23);
    }
    else if(this.selectedInterval == "Week"){
      startTime.setDate(startTime.getDate() - 7);
      startTime.setHours(0);
      endTime.setHours(23);
    }
    else if(this.selectedInterval == "Month"){
      startTime.setMonth(startTime.getMonth() - 1);
      // startTime.setDate(1);
      // endTime.setMonth(endTime.getMonth() - 1);
      // endTime.setDate(30);
    }
    else if(this.selectedInterval == "Year"){
      startTime.setFullYear(startTime.getFullYear() - 1);
    }
    else if(this.selectedInterval == "Custom"){
      startTime = new Date(this.startDate.toUTCString());
      endTime = new Date(this.endDate.toUTCString());
    }
    console.warn('startTime',startTime);
    console.warn('endTime',endTime);
    this.getAllHistories(startTime,endTime);
  }

  getAllHistories(startTime:any, endTime:any){
    this.historyItems = [];
    if(this.parentGenerator && this.parentGenerator.Id != 0){

    
    this.windService.Get(this.parentGenerator.Id).subscribe((resp: any)=>{
     
      if(resp && resp.Success){
        console.warn('resp',resp);
        this.selectedItems = resp.Value;
        if(this.selectedItems.Name == ""){this.selectedItems.Name = "generator";}
        this.AddColumnName(this.selectedItems.Name);
        this.dtoPaging.filters["ParentWindGeneratorDeviceId"] = this.parentGenerator.Id;
        this.dtoPaging.filtersType["ParentWindGeneratorDeviceId"] = "eq";
        this.dtoPaging.filters["TimeCreated::-->>1"] = startTime;
        this.dtoPaging.filtersType["TimeCreated::-->>1"] = "gtoe";
        this.dtoPaging.filters["TimeCreated::-->>2"] = endTime;
        this.dtoPaging.filtersType["TimeCreated::-->>2"] = "ltoe";
        this.historyService.GetList(this.dtoPaging).subscribe((resp: any) => {
          console.warn('historyService',resp);
        if(resp && resp.Success){
          this.isReadyPreviewChart = true;
          this.AddColumn(resp);
        }
        });
      }

    })
  }
    console.warn('parentGenerator',this.parentGenerator);
  
  }


  AddColumn(historyItem: any) {
    this.historyItems = [];
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
}



