import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractDomainResultsInterface} from './abstract-domain-results.interface';
import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractApiService {

  constructor(protected apiService: ApiService) {
  }

  abstract get(): Observable<AbstractDomainResultsInterface>;
  abstract getById<T>(id: number): Observable<T[]>;

  // abstract search(searchQuery): Observable<AbstractDomainResultsInterface>;
}
