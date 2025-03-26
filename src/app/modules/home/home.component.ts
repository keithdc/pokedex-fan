import {Component} from '@angular/core';
import {ApiBuilderService} from '../../api/api-builder/api-builder.service';
import {AbstractDomainEnum} from '../../api/abstract/abstract-domain.enum';
import {AbstractDestroyDirective} from '../../shared/directive/abstract-destroy.directive';
import {of, switchMap, takeUntil} from 'rxjs';
import {
  AbstractDomainResultsInterface,
  DomainResultsInterface,
} from '../../api/abstract/abstract-domain-results.interface';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AbstractDestroyDirective {
  pokemonDomain: AbstractDomainResultsInterface | undefined;

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
          const domain = params['domain'];
          if (domain) {
            return this.apiBuilderService.buildApiDomain(params['domain'])
              .getById(params['id'])
              .pipe(
                switchMap((region) => {
                  // Need to use any the interface of Region are huge
                  const id = (region[0] as any).pokedexes[0].url.split(/\/+/).filter((uri: string) => uri !== '');
                  return this.apiBuilderService.buildApiDomain(AbstractDomainEnum.POKEDEX)
                    .getById(id.pop())
                    .pipe(
                      switchMap((res) => {
                        // Need to use any the interface of Pokedex are huge
                        const pokemonEntriesMap = ((res[0]) as any).pokemon_entries.map((entry: any) => {
                            const pokemon_species = entry.pokemon_species.url.split(/\/+/).filter((uri: string) => uri !== '');
                            const id = pokemon_species.pop();
                            return {
                              name: entry.pokemon_species.name,
                              id,
                              url: `${environment.apiUrl}${AbstractDomainEnum.POKEMON.toLowerCase()}/${id}`,
                            };
                          },
                        );
                        return of({
                          domain: AbstractDomainEnum.POKEMON,
                          results: pokemonEntriesMap,
                        });
                      }),
                    );
                }),
              );
          }
          return this.apiBuilderService.buildApiDomain(AbstractDomainEnum.POKEMON).get();
        }),
      )
      .subscribe((pokemonDomain: AbstractDomainResultsInterface) => {
        this.pokemonDomain = pokemonDomain;
      });
  }
}
