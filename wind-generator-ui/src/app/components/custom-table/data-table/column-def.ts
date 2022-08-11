import { TemplateRef } from '@angular/core';
import { ESortEnum } from './ESortEnum.enum';


export class ColumnDef<T> {
  key = '';
  header = '';
  cell: (element: T) => any;
  isActive = true;
  hasFiltering = true;
  stringFilter: string;
  hasSorting = true;
  headerTemplate: TemplateRef<any> = null;
  cellTemplate: TemplateRef<any> = null;
  alwaysDisplayed: false;
  sort: ESortEnum;
  tmpSortIndex: number;
}
