import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteEnum} from './shared/enum/route.enum';

const routes: Routes = [
  {
    path: RouteEnum.HOME,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: '**',
    loadChildren: () => import('./shared/modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
  },
  {path: '', redirectTo: RouteEnum.HOME, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
