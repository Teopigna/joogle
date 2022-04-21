import {
  NavigationEnd,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { SitesService } from './../services/sites.service';
import { DataStorageService } from './../services/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Site } from './../shared/site.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { faTrash, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit, OnDestroy {
  //Icons
  faTrash = faTrash;
  faGear = faGear;

  isAdmin: boolean = false;
  selected: boolean = false;
  currentUrl: string = '';

  userSub?: Subscription;
  urlSubscribe?: Subscription;

  @Input() site?: Site;

  @Input() index?: number;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private siteService: SitesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAdmin = !!user;
    });
    this.urlSubscribe = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url;
          if (this.currentUrl.includes('/edit/' + String(this.index))) {
            this.selected = true;
          } else {
            this.selected = false;
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onModify() {
    const id = this.siteService.getIndex(this.site);
    this.router.navigate(['/edit', id]);
    console.log('ngoonModify' + this.currentUrl);
  }

  onDelete(id: number[]) {
    this.dataStorageService.deleteData(id)?.subscribe((res) => {});
  }
}
