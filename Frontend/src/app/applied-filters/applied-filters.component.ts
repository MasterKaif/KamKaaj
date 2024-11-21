import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.scss']
})
export class AppliedFiltersComponent {
  @Input() filters: { key: string; value: string }[] = [];
  @Output() removeFilter = new EventEmitter<number>(); // Emit index of filter to parent

  removeFilterAtIndex(index: number) {
    this.removeFilter.emit(index); // Emit the index
  }
}
