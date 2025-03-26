import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, finalize, Observable, tap, throwError} from 'rxjs';
import {CoreService} from '../service/core/core.service';


@Injectable({
  providedIn: 'root',
})
export class PokemonHttpInterceptorService implements HttpInterceptor {
  private loadInitiated: number = 0;
  private loadCompleted: number = 0;

  constructor(private coreService: CoreService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.coreService.loading.next(true);
    this.loadInitiated += 1;
    let headers = request.headers.set('X-Requested-With', 'XMLHttpRequest')
      .set('Accept', 'application/json');

    const requestUpdateMap = {
      headers,
    };
    const xhr = request.clone(requestUpdateMap);
    return next.handle(xhr).pipe(
      tap((info) => {
      }),
      catchError((err) => {
        return throwError(err);
      }),
      finalize(() => {
        this.loadCompleted += 1;
        this.loadComplete();
      })
    );
  }

  private loadComplete(): void {
    if (this.loadInitiated === this.loadCompleted) {
      this.coreService.loading.next(false);
    }
  }
}


