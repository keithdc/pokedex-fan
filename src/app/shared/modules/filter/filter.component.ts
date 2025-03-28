import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FilterFormControlInterface} from './filter-form-control.interface';
import {AbstractDestroyDirective} from '../../directive/abstract-destroy.directive';
import {debounceTime, takeUntil} from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent extends AbstractDestroyDirective {
  @Output() filter = new EventEmitter<FilterFormControlInterface>();
  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.filterForm = this.formBuilder.group({
      search: new FormControl(''),
    });
    this.filterForm.valueChanges
      .pipe(
        debounceTime(100),
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((filter: FilterFormControlInterface) => this.filter.emit(filter));
  }
}
