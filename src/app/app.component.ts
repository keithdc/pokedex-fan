import {Component} from '@angular/core';
import {AbstractDestroyDirective} from './shared/directive/abstract-destroy.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends AbstractDestroyDirective {
  title = 'pokedex-fan';
}
