import {Injectable} from '@angular/core';
import {AbstractApiService} from '../abstract/abstract-api.service';
import {AbstractDomainEnum} from '../abstract/abstract-domain.enum';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BerryService extends AbstractApiService {
  private domain: AbstractDomainEnum = AbstractDomainEnum.BERRY;

  override get<AbstractDomainResultsInterface>(): Observable<AbstractDomainResultsInterface> {
    return this.apiService.get(this.domain);
  }

  override getById<T>(id: number): Observable<T[]> {
    return this.apiService.getByArray([this.domain], {id});
  }
}
