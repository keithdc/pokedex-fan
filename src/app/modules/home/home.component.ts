import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiBuilderService} from '../../api/api-builder/api-builder.service';
import {AbstractDomainEnum} from '../../api/abstract/abstract-domain.enum';
import {AbstractDestroyDirective} from '../../shared/directive/abstract-destroy.directive';
import {takeUntil} from 'rxjs';
import {
  AbstractDomainResultsInterface,
  DomainResultsInterface,
} from '../../api/abstract/abstract-domain-results.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AbstractDestroyDirective implements OnInit {
  pokemonDomain: AbstractDomainResultsInterface | undefined;

  constructor(private apiBuilderService: ApiBuilderService) {
    super();
  }

  ngOnInit(): void {
    this.apiBuilderService.buildApiDomain(AbstractDomainEnum.POKEMON).get()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((pokemonDomain: any) => {
        this.pokemonDomain = pokemonDomain;
      });
  }

  trackPokemon(index: number, pokemon: DomainResultsInterface): string {
    return pokemon.name;
  }
}
