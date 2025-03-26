import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiService} from './api/api.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LayoutModule} from './shared/modules/layout/layout.module';
import {MatDialogModule} from '@angular/material/dialog';
import {PokemonHttpInterceptorService} from './shared/interceptor/pokemon-http-interceptor.service';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    LayoutModule,
    OverlayModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ApiService,
    {provide: HTTP_INTERCEPTORS, useClass: PokemonHttpInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
