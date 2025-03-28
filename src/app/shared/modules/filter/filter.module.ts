import {NgModule} from '@angular/core';
import {FilterComponent} from './filter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    FilterComponent,
  ],
  exports: [
    FilterComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class FilterModule {
}
