import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LazyDialogService} from '../../service/lazy-dialog/lazy-dialog.service';
import {MatDialogConfig} from '@angular/material/dialog';
import {AbstractDestroyDirective} from '../../directive/abstract-destroy.directive';
import {debounceTime, of, switchMap, takeUntil} from 'rxjs';
import {CardInfoDialogComponent} from '../../../modules/item/components/card-info-dialog/card-info-dialog.component';
import {AbstractDomainEnum} from '../../../api/abstract/abstract-domain.enum';
import {ApiBuilderService} from '../../../api/api-builder/api-builder.service';
import {DialogDataInterface} from '../../../modules/item/components/card-info-dialog/dialog-data.interface';
import {PokemonTypeEnum} from '../../enum/pokemon-type.enum';
import {CoreService} from '../../service/core/core.service';
import {CardContentLayoutEnum} from './card-content-layout.enum';
import {DomainResultsInterface} from '../../../api/abstract/abstract-domain-results.interface';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss'],
})
export class CardContentComponent extends AbstractDestroyDirective implements OnInit {
  @Input() domain!: AbstractDomainEnum;
  @Input() domainData!: DomainResultsInterface;
  @Input() layout: CardContentLayoutEnum = CardContentLayoutEnum.COLUMN;
  @Input() srcProps!: string;
  @Output() cardClicked: EventEmitter<DomainResultsInterface> = new EventEmitter<DomainResultsInterface>();
  cardStyle!: Object;
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

  ngOnInit(): void {
    this.buildCardClass();
  }

  handleShowPokemon(): void {
    if (this.domainData.id) {
      this.apiBuilderService.buildApiDomain(this.domain).getById(+this.domainData.id)
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
            import('../../../modules/item/components/card-info-dialog/card-info-dialog.module'), 'CardInfoDialogModule', 'cardInfoDialogComponent', config)
            .pipe(switchMap((pokemon) => {
              return of(pokemon);
            }));
        }))
        .subscribe();
    }

  }

  private buildCardClass(): void {
    const style: {
      'flex-direction'?: string;
      'align-items'?: string;
      'width'?: string;
      'height'?: string;
    } = {};
    style['flex-direction'] = this.layout;
    style['align-items'] = 'center';
    switch (this.layout) {
      case CardContentLayoutEnum.COLUMN:
        style.width = '100px';
        style.height = '150px';
        break;
      case CardContentLayoutEnum.ROW:
        style.width = '200px';
        style.height = '100px';
        break;
    }
    this.cardStyle = style;
  }

}
