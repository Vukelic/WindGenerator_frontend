import { Injectable } from '@angular/core';
import { MatchRowHeightsDirective } from './match-row-heights.directive';

@Injectable()
export class LinkedColumnsMapService {
  private columnsMap = new Map<string, MatchRowHeightsDirective[]>();

  add(key: string, directive: MatchRowHeightsDirective): void {
    if (key) {
      const dirs = this.columnsMap.get(key) || [];
      this.columnsMap.set(key, [...dirs, directive]);
    }
  }

  remove(key: string, directive: MatchRowHeightsDirective): void {
    const dirs = (this.columnsMap.get(key) || []).filter(d => d !== directive);
    if (dirs.length > 0) {
      this.columnsMap.set(key, dirs);
    } else {
      this.columnsMap.delete(key);
    }
  }

  get(key: string): MatchRowHeightsDirective[] {
    return this.columnsMap.get(key);
  }
}
