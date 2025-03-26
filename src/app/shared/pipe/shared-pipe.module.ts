import {NgModule} from '@angular/core';
import {SpritePipe} from './sprite/sprite.pipe';


@NgModule({
  declarations: [SpritePipe],
  exports: [SpritePipe],
})
export class SharedPipeModule {
}
