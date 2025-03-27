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
import {MatDialogConfig} from '@angular/material/dialog';
import {LazyDialogService} from '../../shared/service/lazy-dialog/lazy-dialog.service';
import {CardInfoDialogDataInterface} from '../../shared/modules/card-info-dialog/card-info-dialog-data.interface';
import {CardContentLayoutEnum} from '../../shared/modules/card-content/card-content-layout.enum';

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
    private lazyDialogService: LazyDialogService<CardInfoDialogDataInterface>,
    private route: ActivatedRoute,
  ) {
    super();
    this.listenToParam();
  }

  trackPokemon(index: number, pokemon: DomainResultsInterface): string {
    return pokemon.url;
  }

  handleShowItem(domain: DomainResultsInterface): void {
    if (domain.id && this.itemDomain) {
      this.apiBuilderService.buildApiDomain(this.itemDomain.domain).getById(+domain.id)
        .pipe(switchMap((domains) => {
          const item = domains[0] as any;
          console.log(item);
          const description = item.flavor_text_entries.find((entry: any) => entry.language.name === 'en').text;
          const data: CardInfoDialogDataInterface = {
            id: `Entry no. ${item.id}`,
            name: item.name,
            category: item.category.name,
            description,
            effect: item.effect_entries[0].effect,
            imageUrl: item.sprites['default'],
          };
          const config: MatDialogConfig = {
            data,
          };
          return this.lazyDialogService.createDialog(
            import('../../shared/modules/card-info-dialog/card-info-dialog.module'), 'CardInfoDialogModule', 'cardInfoDialogComponent', config)
            .pipe(switchMap((pokemon) => {
              return of(pokemon);
            }));
        }))
        .subscribe();
    }
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
      });
  }
}
