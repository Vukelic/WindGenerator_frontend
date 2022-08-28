import { Component, Input, TemplateRef, ContentChildren, QueryList, ViewChild, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { DtoPaging } from '../../../dto/DtoRequestObjectModels/DtoPaging';
import { DataSource } from './data-source';
import { ColumnDef } from './column-def';
import { ESortEnum } from './ESortEnum.enum';
import { ColumnCellDirective } from './column-cell.directive';
import { ColumnHeaderDirective } from './column-header.directive';



@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> implements OnInit {

  removable = true;
  listOfSort: any[] = [];
  @ViewChild(MatTable) table: MatTable<T>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() filterChangeEvent = new EventEmitter<any>();
  @Output() sortChangeEvent = new EventEmitter<any>();
  @Output() pagingChangeEvent = new EventEmitter<any>();
  @Output() allFiltersChangeEvent = new EventEmitter<any>();
  @Output() selectedChangeEvent = new EventEmitter<any>();
  @Input() dataSource: DataSource<T> = null;
  @Input() dtoPaging: DtoPaging = new DtoPaging();
  @Input() globalSettings: any;
  @Input() set columnDefs(cols: Partial<ColumnDef<T>>[]) {
    this.columns = cols.map(c => ({ ...new ColumnDef<T>(), ...c }));
    this.updateColumns();
  }

  @Input() theme: string;
  @Input() isMultiple: boolean = false;
  @Input() isSelectedEnabled: boolean = false;

  @Input() changedDataSourceEmitter: EventEmitter<any>;
  columnsListCopy:any = [];
  sortColumns: ColumnDef<T>[] = [];
  columns: ColumnDef<T>[] = [];

  activeColumns: string[] = [];

  //selection = new SelectionModel<T>(this.isMultiple, []);
  selection: any;
  constructor() {

  }


  selectionRow(row:any) {
    if (this.isSelectedEnabled) {
     this.selection.toggle(row); // objekat u selection: Set(1)
      console.warn('selection',this.selection);
  
      this.selectedChangeEvent.emit(row);
     
    }

  }

  ngOnInit(): void {
    this.regenerateColumnCopyList(false);
    this.selection = new SelectionModel<T>(this.isMultiple, []);
    if (this.changedDataSourceEmitter) {
      this.changedDataSourceEmitter.subscribe(response => {
        if (this.isSelectedEnabled) {
          this.selection.clear();
        }
      })
    }

  }

  regenerateColumnCopyList(inGenerateEmit: boolean = true) {
    for (var i = 0; i < this.columns.length; i++) {
      this.columns[i].tmpSortIndex = this.columns.length + 1;
    }
    for (var i = 0; i < this.columnsListCopy.length; i++) {
      this.columnsListCopy[i].tmpSortIndex = i;
    }
    this.columnsListCopy = this.columns.filter(col => col.hasSorting && col.sort != 2);
    this.columnsListCopy = this.columnsListCopy.sort((a:any, b:any) => { return a.tmpSortIndex - b.tmpSortIndex });
    if (inGenerateEmit) {
      if (!this.dtoPaging) { this.dtoPaging = new DtoPaging(); }
      this.dtoPaging.orders = {};
      if (this.columnsListCopy && this.columnsListCopy.length > 0) {
        this.columnsListCopy.forEach((element:any) => {
          if (element && this.dtoPaging.orders) {
            if (element.sort == ESortEnum.Ascending) {
              this.dtoPaging.orders[element.key] = "as";
            } else {
              this.dtoPaging.orders[element.key] = "de";
            }
          }
        });
      }
      this.sortChangeEvent.emit(this.dtoPaging);
    }
  }

  filterChange(data: any) {
    this.dtoPaging.filters[data.key] = data.stringFilter;
    this.dtoPaging.filtersType[data.key] = "co";
    this.filterChangeEvent.emit(this.dtoPaging);
    this.allFiltersChange();
  }


  resetFilters() {
    this.dtoPaging.filters = {};
    this.dtoPaging.filtersType = {};
  }

  pagingChange(event:any) {
    // if(event.pageSize != this.localTablePaging.countPerPage){
    //   this.paginator.pageIndex = 0;
    //   this.localTablePaging.page = 1;
    // }else{
    //   this.localTablePaging.page = event.pageIndex + 1;
    // }
    this.dtoPaging.page = event.pageIndex + 1;
    this.dtoPaging.countPerPage = event.pageSize;
    this.pagingChangeEvent.emit(this.dtoPaging);
    this.allFiltersChange();
  }

  allFiltersChange() {
    this.allFiltersChangeEvent.emit(this.dtoPaging);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  dropColumns(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columnsListCopy, event.previousIndex, event.currentIndex);
    this.regenerateColumnCopyList();
  }

  sortData(column:any) {
    if (column.hasSorting) {
      if (column.sort == ESortEnum.none || column.sort == ESortEnum.Descending) {
        column.sort = ESortEnum.Ascending
      } else if (column.sort == ESortEnum.Ascending) {
        column.sort = ESortEnum.Descending
      }
      this.regenerateColumnCopyList();

    }


  }

  remove(column: any): void {
    column.sort = ESortEnum.none;
    this.regenerateColumnCopyList();
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  updateColumns(): void {
    this.activeColumns = [...this.columns
      .filter(col => col.isActive)
      .map(col => col.key)];
  }

  reorderCols(event: CdkDragDrop<ColumnDef<T>[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.updateColumns();
  }

  drop(event: CdkDragDrop<T[]>): void {
    const prevIndex = this.dataSource.data.findIndex(d => d === event.item.data);
    moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
    this.dataSource.data = this.dataSource.data.slice();
    this.table.renderRows();
  }



  @ContentChildren(ColumnCellDirective)
  set cellTemplates(defs: QueryList<ColumnCellDirective>) {
    defs.forEach(def => {
      const col = this.columns.find(x => x.key === def.columnCell) || <any>{ cellTemplate: null, key: null, };
      col.cellTemplate = def.template;
      if (!col.key) {
        col.key = def.columnCell;
        this.columns = [...this.columns, {
          ...new ColumnDef(),
          ...col
        }];
      }
    });
  }

  @ContentChildren(ColumnHeaderDirective)
  set headerTemplates(defs: QueryList<ColumnHeaderDirective>) {
    defs.forEach(def => {
      const col = this.columns.find(x => x.key === def.columnHeader) || <any>{ headerTemplate: null, field: null, key: null };
      col.headerTemplate = def.template;

      if (!col.key) {
        col.key = def.columnHeader;

        //  col.sort.direction = "asc";

        this.columns = [...this.columns, {
          ...new ColumnDef(),
          ...col
        }];
      }
    });
  }
}



