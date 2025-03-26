import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, forkJoin, map, Observable, publishReplay, refCount, throwError} from 'rxjs';
import {AbstractDomainEnum} from './abstract/abstract-domain.enum';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  limit: BehaviorSubject<number> = new BehaviorSubject<number>(999);
  offset: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  clearCache(): void {
    this.limit.next(30);
    this.offset.next(0);
  }

  get<T>(domain: AbstractDomainEnum, {id}: { id?: number } = {}): Observable<T> {
    const hasLimit = (id === undefined) ? `/?offset=${this.offset.value}&limit=${this.limit.value}` : '';
    const url = `${environment.apiUrl}${domain.toLowerCase().replace('_', '-')}${hasLimit}`;
    return this.http.get<T>(`${url}${id ? '/' + id : ''}`).pipe(
      catchError(this.handleError<T>(domain.toLowerCase())),
      map(res => this.mapDomain(res, domain)),
      publishReplay(1), // this tells Rx to cache the latest emitted
      refCount(), // and this tells Rx to keep the Observable alive as long as there are any Subscribers
    );
  }

  getByArray<T>(domains: AbstractDomainEnum[], {id}: { id?: number } = {}): Observable<T[]> {
    const domainObs = domains.map(domain => {
      const hasLimit = (id === undefined) ? `/?offset=${this.offset.value}&limit=${this.limit.value}` : '';
      const url = `${environment.apiUrl}${domain.toLowerCase().replace('_', '-')}${hasLimit}`;
      return this.http.get<T>(`${url}${id ? '/' + id : ''}`);
    });
    return forkJoin(domainObs).pipe(
      map(res => res.map((obj, index) => this.mapDomain(obj, domains[index]))),
    );
  }

  private mapDomain<T>(res: T, domain: AbstractDomainEnum): T {
    return {domain, ...res};
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation: string = 'operation') {
    return (error: unknown): Observable<T> => {
      // Let the app keep running by returning an empty result if rethrowError is false...
      return throwError(error);
    };
  }
}
