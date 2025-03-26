import {Injectable} from '@angular/core';
import {PokemonService} from '../pokemon/pokemon.service';
import {AbstractDomainEnum} from '../abstract/abstract-domain.enum';
import {AbstractApiService} from '../abstract/abstract-api.service';
import {ItemService} from '../item/item.service';

@Injectable({
  providedIn: 'root',
})
export class ApiBuilderService {

  constructor(
    private pokemonService: PokemonService,
    private itemService: ItemService,
  ) {
  }

  buildApiDomain(domain: AbstractDomainEnum): AbstractApiService {
    switch (domain) {
      case AbstractDomainEnum.POKEMON:
        return this.pokemonService;
      case AbstractDomainEnum.ITEM:
        return this.itemService;
      default:
        return this.pokemonService;
    }
  }
}
