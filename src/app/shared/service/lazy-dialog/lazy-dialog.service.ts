import {Compiler, Component, Injectable, Injector, NgModule, NgModuleFactory, Type} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {from, mergeAll, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LazyDialogService<R> {
  ref: MatDialogRef<R> | undefined;

  constructor(private dialog: MatDialog,
              private compiler: Compiler,
              private injector: Injector) {
  }

  createDialog<T>(
    callBack: Promise<T>,
    module: string,
    component: string,
    config: MatDialogConfig): Observable<void | R | undefined> {

    return from(callBack.then(m => {
      return this.compileModule(m[module as keyof typeof NgModule]).then(() => {
        const myComponent = m[module as keyof typeof NgModule][component as keyof typeof Component];
        const matDialogConfig: MatDialogConfig = {
          width: '25vw',
          height: '80vh',
        };
        this.ref = this.dialog
          .open(
            myComponent,
            {...matDialogConfig, ...config},
          );
        return this.ref.afterClosed().pipe();
      });
    })).pipe(
      mergeAll(),
    );
  }


  async compileModule<T>(t: Type<T>): Promise<NgModuleFactory<T>> {
    if (t instanceof NgModuleFactory) {
      return t;
    } else {
      return await this.compiler.compileModuleAsync(t);
    }
  }
}

