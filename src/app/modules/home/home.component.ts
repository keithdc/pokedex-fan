import {Component} from '@angular/core';
import {ApiBuilderService} from '../../api/api-builder/api-builder.service';
import {AbstractDomainEnum} from '../../api/abstract/abstract-domain.enum';
import {AbstractDestroyDirective} from '../../shared/directive/abstract-destroy.directive';
import {of, switchMap, takeUntil} from 'rxjs';
import {
  AbstractDomainResultsInterface,
  DomainResultsInterface, PokemonEntries,
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
                  });
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
