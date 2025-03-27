import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardContentComponent} from './card-content.component';
import {MatCardModule} from '@angular/material/card';
import {SharedPipeModule} from '../../pipe/shared-pipe.module';


@NgModule({
  declarations: [CardContentComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SharedPipeModule,
  ],
  exports: [
    CardContentComponent,
  ],
})
export class CardContentModule {
}
