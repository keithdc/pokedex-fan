import {Directive, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Directive()
export abstract class AbstractDestroyDirective implements OnDestroy {
  protected unsubscribeAll: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
