import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardInfoDialogComponent} from './card-info-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {SharedPipeModule} from '../../../../shared/pipe/shared-pipe.module';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [CardInfoDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatCardModule,
    SharedPipeModule,
    MatExpansionModule,
  ],
  exports: [CardInfoDialogComponent]
})
export class CardInfoDialogModule {
  static get cardInfoDialogComponent(): typeof CardInfoDialogComponent {
    return CardInfoDialogComponent;
  }
}
