import { HostListener, HostBinding, AfterViewInit, Directive, ElementRef, OnDestroy, Input } from '@angular/core';
import { LinkedColumnsMapService } from './linked-columns-map.service';

@Directive({
  selector: '[matchRowHeights]'
})
export class MatchRowHeightsDirective implements AfterViewInit, OnDestroy {

  @Input() matchRowHeights: string;

  @HostListener('window:resize')
  private resize(): void {
    this.resizeRows();
  }

  @HostBinding('class.sub-table') subTable = true;

  private rows: HTMLElement[] = [];

  constructor(public el: ElementRef, private linkedColumns: LinkedColumnsMapService) { }

  ngAfterViewInit(): void {
    this.linkedColumns.add(this.matchRowHeights, this);
    this.rows = Array.from(this.el.nativeElement.querySelectorAll('div'));
    this.resizeRows();
  }

  ngOnDestroy(): void {
    this.linkedColumns.remove(this.matchRowHeights, this);
  }

  resizeRows(): void {
    const allDirs = this.linkedColumns.get(this.matchRowHeights);
    for (let i = 0; i < this.rows.length; ++i) {
      const linkedRows = allDirs.map(d => d.rows[i]);
      linkedRows.forEach(r => r.style.flexBasis = 'initial');

      const maxHeight = Math.max(...linkedRows.map(r => r.offsetHeight));
      linkedRows.forEach(r => r.style.flexBasis = maxHeight + 'px');
    }
  }
}
