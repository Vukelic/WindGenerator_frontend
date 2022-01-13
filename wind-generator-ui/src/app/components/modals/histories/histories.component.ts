import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DtoWindGeneratorDevice } from 'src/app/dto/DtoModels/WindGeneratorDevice/DtoWindGeneratorDevice';
import { DtoWindGeneratorDevice_History } from 'src/app/dto/DtoModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_History';
import { WindGeneratorDevice_History } from 'src/app/dto/DtoModels/WindGeneratorDevice_History/WindGeneratorDevice_History';
import { DtoPaging } from 'src/app/dto/DtoRequestObjectModels/DtoPaging';
import { DtoWindGeneratorDevice_HistoryListResponse } from 'src/app/dto/DtoResponseObjectModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_HistoryListResponse';
import { DtoWindGeneratorDevice_HistoryResponse } from 'src/app/dto/DtoResponseObjectModels/WindGeneratorDevice_History/DtoWindGeneratorDevice_HistoryResponse';
import { WindGeneratorDeviceHistoryService } from 'src/app/services/wind-generator-device-history.service';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss']
})
export class HistoriesComponent implements OnInit  {
 paginatorCount: any;
 pageSize: any;
 page: any;
 dtoPaging = new DtoPaging();
 parentGenerator = new DtoWindGeneratorDevice();

constructor(public dialog: MatDialogRef<HistoriesComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: any, private historyService: WindGeneratorDeviceHistoryService) {

}
  displayedColumns: string[] = ['Name', 'ValueDec', 'TimeCreated'];
  dataSource: MatTableDataSource<DtoWindGeneratorDevice_History>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
   // this.dataSource.paginator = this.paginator;
   console.warn('data',this.data);
    if(this.data){
      this.parentGenerator = this.data;
    }
    this.getAllHistories();
  }
  cancel(){
    this.dialog.close();
  }


  ok(){
    this.dialog.close();
  }


  getAllHistories(){
    console.warn('parentGenerator',this.parentGenerator);
    this.dtoPaging.filters["ParentWindGeneratorDeviceId"] = this.parentGenerator.Id;
    this.dtoPaging.filtersType["ParentWindGeneratorDeviceId"] = "eq";
    this.historyService.GetList(this.dtoPaging).subscribe((resp: any) => {
    if(resp && resp.Success){
      console.warn('resp',resp);
      this.dtoPaging = resp.PagingObject;
      this.paginatorCount = this.dtoPaging.totalCount;
      this.dataSource = new MatTableDataSource<DtoWindGeneratorDevice_History>(resp.Value);
    }
    });
  }

  pageChanged(event: any) {
    try {
      this.pageSize = event.pageSize;
      this.page = event.pageIndex + 1;
      this.dtoPaging.countPerPage = this.pageSize;
      this.dtoPaging.page = this.page;
      this.getAllHistories();
    } catch (ex) {

    }
  }
}



