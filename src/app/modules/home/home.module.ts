import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SharedPipeModule} from '../../shared/pipe/shared-pipe.module';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CardContentModule} from '../../shared/modules/card-content/card-content.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedPipeModule,
    MatCardModule,
    ScrollingModule,
    CardContentModule,
  ],
})
export class HomeModule {
}
