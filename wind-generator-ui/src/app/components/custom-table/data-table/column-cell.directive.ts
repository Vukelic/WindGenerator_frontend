import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[columnCell]'
})
export class ColumnCellDirective {
  @Input() columnCell: string;

  constructor(public template: TemplateRef<any>) { }
}