import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found.component';
import {PageNotFoundRoutingModule} from './page-not-found-routing.module';
import {EmptyPageContentModule} from '../empty-page-content/empty-page-content.module';

@NgModule({

  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    PageNotFoundRoutingModule,
    EmptyPageContentModule,
  ],
})
export class PageNotFoundModule {
}
