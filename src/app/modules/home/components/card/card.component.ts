import {Component, Input} from '@angular/core';
import {LazyDialogService} from '../../../../shared/service/lazy-dialog/lazy-dialog.service';
import {MatDialogConfig} from '@angular/material/dialog';
import {AbstractDestroyDirective} from '../../../../shared/directive/abstract-destroy.directive';
import {debounceTime, of, switchMap, takeUntil} from 'rxjs';
import {CardInfoDialogComponent} from '../card-info-dialog/card-info-dialog.component';
import {AbstractDomainEnum} from '../../../../api/abstract/abstract-domain.enum';
import {ApiBuilderService} from '../../../../api/api-builder/api-builder.service';
import {DialogDataInterface} from '../card-info-dialog/dialog-data.interface';
import {PokemonTypeEnum} from '../../../../shared/enum/pokemon-type.enum';
import {CoreService} from '../../../../shared/service/core/core.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends AbstractDestroyDirective {
  @Input() domain!: AbstractDomainEnum;
  @Input() src!: string;
  @Input() description!: string;
  @Input() id: number | undefined;
  loading: boolean = false;

  constructor(
    private apiBuilderService: ApiBuilderService,
    private lazyDialogService: LazyDialogService<CardInfoDialogComponent>,
    private coreService: CoreService,
  ) {
    super();
    this.coreService.loading
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(50),
      )
      .subscribe((loading) => {
        this.loading = loading;
      });
  }


  handleShowPokemon(): void {
    if (this.id) {
      this.apiBuilderService.buildApiDomain(this.domain).getById(this.id)
        .pipe(switchMap((domains) => {
          // Need to use any the interface of these api are huge
          const pokemon = domains[0] as any;
          const species = domains[1] as any;
          const data: DialogDataInterface = {
            id: pokemon.id,
            name: pokemon.name,
            description: species.flavor_text_entries[0].flavor_text,
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
            import('../card-info-dialog/card-info-dialog.module'), 'CardInfoDialogModule', 'cardInfoDialogComponent', config)
            .pipe(switchMap((pokemon) => {
              return of(pokemon);
            }));
        }))
        .subscribe();
    }

  }

}
