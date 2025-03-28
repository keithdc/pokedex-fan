import {Pipe, PipeTransform} from '@angular/core';
import {DomainResultsInterface} from '../../../api/abstract/abstract-domain-results.interface';
import {FilterFormControlInterface} from '../../modules/filter/filter-form-control.interface';

@Pipe({
  name: 'filterDomain',
})
export class FilterDomainPipe implements PipeTransform {

  constructor() {
  }

  transform<T>(results: DomainResultsInterface[], filter: FilterFormControlInterface | undefined): DomainResultsInterface[] {
    if (!filter || (filter && !filter.search)) {
      return results;
    }
    return results.filter(result => result.name.toLowerCase().includes(filter.search.toLowerCase()));
  }

}
