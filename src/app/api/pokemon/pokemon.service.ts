import {Injectable} from '@angular/core';
import {AbstractApiService} from '../abstract/abstract-api.service';
import {Observable} from 'rxjs';
import {AbstractDomainEnum} from '../abstract/abstract-domain.enum';

@Injectable({
  providedIn: 'root',
})
export class PokemonService extends AbstractApiService {
  private domain: AbstractDomainEnum = AbstractDomainEnum.POKEMON;
  private subDomain: AbstractDomainEnum = AbstractDomainEnum.POKEMON_SPECIES;

  override get<AbstractDomainResultsInterface>(): Observable<AbstractDomainResultsInterface> {
    return this.apiService.get(this.domain);
  }

  override getById<T>(id: number): Observable<T[]> {
    return this.apiService.getByArray([this.domain, this.subDomain], {id});
  }
}
