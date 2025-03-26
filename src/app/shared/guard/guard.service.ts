import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ApiService} from '../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {

  constructor(private apiService: ApiService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.apiService.clearCache();
    return of(true);
  }


}

