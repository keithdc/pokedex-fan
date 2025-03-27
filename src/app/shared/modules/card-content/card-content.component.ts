import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractDestroyDirective} from '../../directive/abstract-destroy.directive';
import {debounceTime, takeUntil} from 'rxjs';
import {AbstractDomainEnum} from '../../../api/abstract/abstract-domain.enum';
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
