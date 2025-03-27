import {Component} from '@angular/core';
import {ApiBuilderService} from '../../api/api-builder/api-builder.service';
import {AbstractDomainEnum} from '../../api/abstract/abstract-domain.enum';
import {AbstractDestroyDirective} from '../../shared/directive/abstract-destroy.directive';
import {map, of, switchMap, takeUntil} from 'rxjs';
import {
  AbstractDomainResultsInterface,
  DomainResultsInterface,
  PokemonEntries,
} from '../../api/abstract/abstract-domain-results.interface';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {PokemonTypeEnum} from '../../shared/enum/pokemon-type.enum';
import {MatDialogConfig} from '@angular/material/dialog';
import {LazyDialogService} from '../../shared/service/lazy-dialog/lazy-dialog.service';
import {ItemCardDialogComponent} from '../../shared/modules/item-card-dialog/item-card-dialog.component';
import {ItemCardDialogDataInterface} from '../../shared/modules/item-card-dialog/item-card-dialog-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AbstractDestroyDirective {
  pokemonDomain: AbstractDomainResultsInterface | undefined;

  constructor(
    private apiBuilderService: ApiBuilderService,
    private lazyDialogService: LazyDialogService<ItemCardDialogComponent>,
    private route: ActivatedRoute,
  ) {
    super();
    this.listenToParam();
  }

  trackPokemon(index: number, pokemon: DomainResultsInterface): string {
    return pokemon.url;
  }

  handleShowPokemon(domain: DomainResultsInterface): void {
    if (domain.id && this.pokemonDomain) {
      this.apiBuilderService.buildApiDomain(this.pokemonDomain.domain).getById(+domain.id)
        .pipe(switchMap((domains) => {
          // Need to use any the interface of these api are huge
          const pokemon = domains[0] as any;
          const species = domains[1] as any;
          const description = species.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text;
          const data: ItemCardDialogDataInterface = {
            id: `No. ${pokemon.id}`,
            name: pokemon.name,
            description,
            types: pokemon.types.map((type: any) => {
              return {
                type: type.type.name,
                color: PokemonTypeEnum[type.type.name as keyof typeof PokemonTypeEnum],
              };
            }),
            imageUrl: pokemon.sprites.other['official-artwork'].front_default,
            cries: pokemon.cries.latest,
          };
          const config: MatDialogConfig = {
            data,
          };
          return this.lazyDialogService.createDialog(
            import('../../shared/modules/item-card-dialog/item-card-dialog.module'), 'ItemCardDialogModule', 'itemCardDialogComponent', config)
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
          const domain = params['domain'];
          if (domain) {
            return this.apiBuilderService.buildApiDomain(domain)
              .getById<PokemonEntries>(params['id'])
              .pipe(
                switchMap((pokedex) => {
                  const pokemonEntriesMap = pokedex[0].pokemon_entries.map(species => {
                    const pokemon_species = species.pokemon_species.url.split(/\/+/).filter((uri: string) => uri !== '');
                    const id = pokemon_species.pop();
                    return {
                      name: species.pokemon_species.name,
                      id,
                      url: `${environment.apiUrl}${AbstractDomainEnum.POKEMON.toLowerCase()}/${id}`,
                    };
                  });

                  return of({
                    domain: AbstractDomainEnum.POKEMON,
                    results: pokemonEntriesMap,
                  } as AbstractDomainResultsInterface);
                }),
              );
          }
          return this.apiBuilderService.buildApiDomain(AbstractDomainEnum.POKEMON).get().pipe(
            map((pokemon) => {
              const results = pokemon.results.map((pokemon, index) => {
                return {
                  ...pokemon,
                  id: index + 1,
                };
              });
              return {
                ...pokemon,
                results,
              } as AbstractDomainResultsInterface;
            }),
          );
        }),
      )
      .subscribe((pokemonDomain: AbstractDomainResultsInterface) => {
        this.pokemonDomain = pokemonDomain;
      });
  }
}
