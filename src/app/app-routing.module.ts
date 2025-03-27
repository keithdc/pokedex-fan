import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteEnum} from './shared/enum/route.enum';
import {GuardService} from './shared/guard/guard.service';

const routes: Routes = [
  {
    path: RouteEnum.HOME,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [GuardService],
  },
  {
    path: RouteEnum.ITEM,
    loadChildren: () => import('./modules/item/item.module').then(m => m.ItemModule),
    canActivate: [GuardService],
  },
  {path: '', redirectTo: RouteEnum.HOME, pathMatch: 'full'},
  {
    path: '**',
    loadChildren: () => import('./shared/modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
