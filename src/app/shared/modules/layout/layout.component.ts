import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {RouteEnum} from '../../enum/route.enum';
import {CoreService} from '../../service/core/core.service';
import {debounceTime, takeUntil} from 'rxjs';
import {AbstractDestroyDirective} from '../../directive/abstract-destroy.directive';
import {ApiBuilderService} from '../../../api/api-builder/api-builder.service';
import {AbstractDomainEnum} from '../../../api/abstract/abstract-domain.enum';
import {AbstractDomainResultsInterface} from '../../../api/abstract/abstract-domain-results.interface';
import {NavInterface} from './nav.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends AbstractDestroyDirective implements OnInit {
  @ViewChild(MatDrawer, {static: true}) drawer!: MatDrawer;
  readonly title: string = 'Pokédex Fan';
  sideNavs: NavInterface[] = [];
  loading: boolean = false;
  readonly RouteEnum = RouteEnum;

  constructor(
    private router: Router,
    private coreService: CoreService,
    private apiBuilderService: ApiBuilderService,
  ) {
    super();
    this.coreService.loading
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(50),
      )
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ngOnInit(): void {
    this.apiBuilderService.buildApiDomain(AbstractDomainEnum.POKEDEX).get()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((region: AbstractDomainResultsInterface) => {
        const regionNav: NavInterface[] = region.results.flat().map(item => {
          return {
            domain: AbstractDomainEnum.POKEDEX,
            ...item,
          };
        });
        this.sideNavs = [
          {
            name: 'Pokémon',
            domain: AbstractDomainEnum.POKEMON,
            subNav: [
              {
                name: 'All Pokemon',
                domain: AbstractDomainEnum.POKEMON,
                route: RouteEnum.HOME,
              },
              ...regionNav,
            ],
          },
          {
            name: 'Items',
            domain: AbstractDomainEnum.POKEMON,
          },
        ];
      });
  }

  handleRouteChange(
    route: string,
    drawerIsOpen: boolean,
    {domain, id, url}: { domain?: string, id?: number, url?: string } = {}): void {
    this.router.navigate([route], url ? {queryParams: {domain, id}} : {}).then(() => {
      this.drawer.toggle(drawerIsOpen).then();
    });
  }

  trackNav(index: number, nav: NavInterface): string {
    return nav.name;
  }
}
