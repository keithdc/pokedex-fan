import {NgModule} from '@angular/core';
import {SpritePipe} from './sprite/sprite.pipe';
import {FilterDomainPipe} from './filter-domain/filter-domain.pipe';


@NgModule({
  declarations: [SpritePipe, FilterDomainPipe],
  exports: [SpritePipe, FilterDomainPipe],
})
export class SharedPipeModule {
}
