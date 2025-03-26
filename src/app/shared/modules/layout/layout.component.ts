import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {RouteEnum} from '../../enum/route.enum';
import {CoreService} from '../../service/core/core.service';
import {debounceTime, takeUntil} from 'rxjs';
import {AbstractDestroyDirective} from '../../directive/abstract-destroy.directive';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends AbstractDestroyDirective implements OnInit {
  @ViewChild(MatDrawer, {static: true}) drawer!: MatDrawer;
  readonly title: string = 'Pokédex Fan';
  sideNavs: string[] = ['Pokémon', 'Items'];
  readonly Route = RouteEnum;
  loading: boolean = false;

  constructor(
    private router: Router,
    public coreService: CoreService
  ) {
    super();
    this.coreService.loading
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(50)
      )
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ngOnInit(): void {
  }

  handleRouteChange(route: string, drawerIsOpen: boolean): void {
    this.router.navigate([route]).then(() => {
      this.drawer.toggle(drawerIsOpen).then();
    });
  }

  trackNav(index: number, nav: string): string {
    return nav;
  }
}
