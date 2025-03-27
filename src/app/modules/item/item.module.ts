import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemRoutingModule} from './item-routing.module';
import {ItemComponent} from './item.component';
import {SharedPipeModule} from '../../shared/pipe/shared-pipe.module';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CardContentComponent} from '../../shared/modules/item-card/card-content.component';
import {CardContentModule} from '../../shared/modules/item-card/card-content.module';


@NgModule({
  declarations: [
    ItemComponent,
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    SharedPipeModule,
    MatCardModule,
    ScrollingModule,
    CardContentModule
  ],
})
export class ItemModule {
}
