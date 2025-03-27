import {Component} from '@angular/core';
import {ApiBuilderService} from '../../api/api-builder/api-builder.service';
import {AbstractDomainEnum} from '../../api/abstract/abstract-domain.enum';
import {AbstractDestroyDirective} from '../../shared/directive/abstract-destroy.directive';
import {of, switchMap, takeUntil} from 'rxjs';
import {
  AbstractDomainResultsInterface,
  DomainResultsInterface,
  Item,
} from '../../api/abstract/abstract-domain-results.interface';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {CardContentLayoutEnum} from '../../shared/modules/item-card/card-content-layout.enum';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent extends AbstractDestroyDirective {
  itemDomain: AbstractDomainResultsInterface | undefined;
  readonly CardLayoutEnum = CardContentLayoutEnum;

  constructor(
    private apiBuilderService: ApiBuilderService,
    private route: ActivatedRoute,
  ) {
    super();
    this.listenToParam();
  }

  trackPokemon(index: number, pokemon: DomainResultsInterface): string {
    return pokemon.url;
  }

  private listenToParam(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribeAll),
        switchMap((params) => {
          return this.apiBuilderService.buildApiDomain(params['domain'])
            .getById<Item>(params['id'])
            .pipe(switchMap((item) => {
              const pokemonEntriesMap = item[0].items.map(item => {
                const pokemon_species = item.url.split(/\/+/).filter((uri: string) => uri !== '');
                const id = pokemon_species.pop();
                return {
                  name: item.name,
                  id,
                  url: `${environment.apiUrl}${AbstractDomainEnum.ITEM.toLowerCase()}/${id}`,
                };
              });
              return of({
                domain: AbstractDomainEnum.ITEM,
                results: pokemonEntriesMap,
              } as AbstractDomainResultsInterface);
            }));
        }),
      )
      .subscribe((itemDomain: AbstractDomainResultsInterface) => {
        this.itemDomain = itemDomain;
        console.log(itemDomain);
      });
  }
}
