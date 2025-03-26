import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SharedPipeModule} from '../../shared/pipe/shared-pipe.module';
import { CardComponent } from './components/card/card.component';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedPipeModule,
    MatCardModule,
    ScrollingModule,
  ],
})
export class HomeModule {
}
