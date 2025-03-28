import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {RouteEnum} from '../../enum/route.enum';
import {CoreService} from '../../service/core/core.service';
import {debounceTime, forkJoin, takeUntil} from 'rxjs';
import {AbstractDestroyDirective} from '../../directive/abstract-destroy.directive';
import {ApiBuilderService} from '../../../api/api-builder/api-builder.service';
import {AbstractDomainEnum} from '../../../api/abstract/abstract-domain.enum';
import {NavInterface} from './nav.interface';
import {MatExpansionPanel} from '@angular/material/expansion';
import {WindowResizeService} from '../../service/window-resize/window-resize.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends AbstractDestroyDirective implements OnInit {
  @ViewChild(MatDrawer, {static: true}) drawer!: MatDrawer;
  @ViewChild(MatExpansionPanel, {static: true}) expansionPanel!: MatExpansionPanel;
  readonly title: string = 'Pokédex Fan';
  sideNavs: NavInterface[] = [];
  loading: boolean = false;
  isMobile: boolean = false;
  readonly RouteEnum = RouteEnum;

  constructor(
    private router: Router,
    private coreService: CoreService,
    private apiBuilderService: ApiBuilderService,
    private windowResizeService: WindowResizeService,
  ) {
    super();
    this.listenToLoading();
    this.listenToResize();
  }

  ngOnInit(): void {
    forkJoin([
      this.apiBuilderService.buildApiDomain(AbstractDomainEnum.POKEDEX).get(),
      this.apiBuilderService.buildApiDomain(AbstractDomainEnum.ITEM_CATEGORY).get(),
    ]).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(([region, itemCategory]) => {
        const regionNav: NavInterface[] = region.results.flat().map(item => {
          return {
            domain: AbstractDomainEnum.POKEDEX,
            ...item,
          };
        });
        const itemNav: NavInterface[] = itemCategory.results.flat().map(item => {
          return {
            domain: AbstractDomainEnum.ITEM_CATEGORY,
            route: RouteEnum.ITEM,
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
                default: true,
              },
              ...regionNav,
            ],
          },
          {
            name: 'Items',
            domain: AbstractDomainEnum.POKEMON,
            subNav: [
              ...itemNav,
            ],
          },
        ];
      });

  }

  handleRouteChange(
    route: string,
    drawerIsOpen: boolean,
    {domain, id, url, defaultPage}: { domain?: string, id?: number, url?: string, defaultPage?: boolean } = {}): void {
    this.router.navigate([route], !defaultPage ? {queryParams: {domain, id}} : {}).then(() => {
      this.handleOpenDrawer(drawerIsOpen);
    });
  }

  trackNav(index: number, nav: NavInterface): string {
    return nav.name;
  }

  handleOpenDrawer(drawerIsOpen: boolean): void {
    if (this.windowResizeService.isMobile.value) {
      if (this.expansionPanel.expanded) {
        this.expansionPanel.close();
      } else {
        this.expansionPanel.open();
      }
    } else {
      this.drawer.toggle(drawerIsOpen).then();
    }
  }

  private listenToResize(): void {
    this.windowResizeService.isMobile
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(50))
      .subscribe(isMobile => {
        this.isMobile = isMobile;
        if (!this.isMobile && this.expansionPanel.expanded) {
          this.expansionPanel.close();
        }
      });
  }

  private listenToLoading(): void {
    this.coreService.loading
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(50),
      )
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
