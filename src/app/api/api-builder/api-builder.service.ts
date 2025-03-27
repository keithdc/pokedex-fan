import {Injectable} from '@angular/core';
import {PokemonService} from '../pokemon/pokemon.service';
import {AbstractDomainEnum} from '../abstract/abstract-domain.enum';
import {AbstractApiService} from '../abstract/abstract-api.service';
import {RegionService} from '../region/region.service';
import {PokedexService} from '../pokedex/pokedex.service';
import {ItemCategoryService} from '../item-category/item-category.service';
import {BerryService} from '../berry/berry.service';
import {ItemService} from '../item/item.service';

@Injectable({
  providedIn: 'root',
})
export class ApiBuilderService {

  constructor(
    private pokemonService: PokemonService,
    private regionService: RegionService,
    private pokedexService: PokedexService,
    private itemService: ItemService,
    private itemCategoryService: ItemCategoryService,
    private berryService: BerryService,
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
      case AbstractDomainEnum.ITEM_CATEGORY:
        return this.itemCategoryService;
      case AbstractDomainEnum.BERRY:
        return this.berryService;
      default:
        return this.pokemonService;
    }
  }
}
