import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {SearchRoutingModule} from './search-routing.module';
import {EmptyPageContentModule} from '../../shared/modules/empty-page-content/empty-page-content.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    EmptyPageContentModule,
    MatIconModule,
  ],
})
export class SearchModule {
}
