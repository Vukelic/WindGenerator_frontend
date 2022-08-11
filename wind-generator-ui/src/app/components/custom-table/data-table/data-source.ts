import { EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


interface Filters {
  columns: { [field: string]: string; };
  global: string;
  //paginatorCount: number;
}

export class DataSource<T> extends MatTableDataSource<T> {
  filters: Filters = { columns: {}, global: '', };

  constructor(data: T[]) {
    super(data);

    this.filterPredicate = (item:any, filter: string) => {
      const globalMatch = Object.keys(<any>item).some((field: any) => {
        return item[field].toString().toLocaleLowerCase().includes(this.filters.global);
      });
      const colMatch = !Object.keys(this.filters.columns).reduce((remove, field) => {
        return remove || !item[field].toString().toLocaleLowerCase()
          .includes(this.filters.columns[field]);
      }, false);
      return globalMatch && colMatch;
    };
  }


  filtering(filterValue: string, col: string): void {
    //  this.filters.columns[col] = filterValue.trim().toLocaleLowerCase();
    //this.filter = JSON.stringify(this.filters);
    console.log(filterValue, col)
  }
  filterColumn(filterValue: string, col: string): void {
    //  this.filters.columns[col] = filterValue.trim().toLocaleLowerCase();
    //this.filter = JSON.stringify(this.filters);
    console.log(filterValue)
    console.log(col)
  }

  filterGlobal(filterValue: string): void {
    this.filters.global = filterValue.trim().toLocaleLowerCase();
    this.filter = JSON.stringify(this.filters);
  }
}