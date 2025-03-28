import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {WindowDimensionsInterface} from './window-dimensions.interface';

@Injectable({
  providedIn: 'root',
})
export class WindowResizeService {
  isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  windowDimensions: BehaviorSubject<WindowDimensionsInterface> = new BehaviorSubject<WindowDimensionsInterface>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

  constructor() {
    this.onResize()
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize(): void {
    this.isMobile.next(window.matchMedia('(max-width: 959px)').matches);
    this.windowDimensions.next({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      },
    );
  }
}
