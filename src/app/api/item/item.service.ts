import {Injectable} from '@angular/core';
import {AbstractApiService} from '../abstract/abstract-api.service';
import {AbstractDomainEnum} from '../abstract/abstract-domain.enum';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends AbstractApiService {
  private domain: AbstractDomainEnum = AbstractDomainEnum.ITEM;

  override get<AbstractDomainResultsInterface>(): Observable<AbstractDomainResultsInterface> {
    return this.apiService.get(this.domain);
  }

  override getById<AbstractDomainResultsInterface>(id: number): Observable<AbstractDomainResultsInterface> {
    return this.apiService.get(this.domain, {id});
  }
}
