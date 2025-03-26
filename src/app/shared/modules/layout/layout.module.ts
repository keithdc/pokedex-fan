import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {OverlayModule} from '@angular/cdk/overlay';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    MatSidenavModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    CommonModule,
    MatProgressSpinnerModule,
    OverlayModule,
  ],
  exports: [
    LayoutComponent,
  ],
})
export class LayoutModule {
}
