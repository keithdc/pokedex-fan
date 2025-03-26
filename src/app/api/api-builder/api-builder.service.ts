import {Injectable} from '@angular/core';
import {PokemonService} from '../pokemon/pokemon.service';
import {AbstractDomainEnum} from '../abstract/abstract-domain.enum';
import {AbstractApiService} from '../abstract/abstract-api.service';
import {ItemService} from '../item/item.service';
import {RegionService} from '../region/region.service';
import {PokedexService} from '../pokedex/pokedex.service';

@Injectable({
  providedIn: 'root',
})
export class ApiBuilderService {

  constructor(
    private pokemonService: PokemonService,
    private regionService: RegionService,
    private pokedexService: PokedexService,
    private itemService: ItemService,
  ) {
  }

  buildApiDomain(domain: AbstractDomainEnum): AbstractApiService {
    switch (domain) {
      case AbstractDomainEnum.POKEMON:
        return this.pokemonService;
      case AbstractDomainEnum.REGION:
        return this.regionService;
      case AbstractDomainEnum.POKEDEX:
        return this.pokedexService;
      case AbstractDomainEnum.ITEM:
        return this.itemService;
      default:
        return this.pokemonService;
    }
  }
}
