import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ItemComponent} from './item.component';


const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {
}
