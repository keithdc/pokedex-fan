import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemCardDialogComponent} from './item-card-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {SharedPipeModule} from '../../pipe/shared-pipe.module';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [ItemCardDialogComponent],
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
  exports: [ItemCardDialogComponent]
})
export class ItemCardDialogModule {
  static get itemCardDialogComponent(): typeof ItemCardDialogComponent {
    return ItemCardDialogComponent;
  }
}
