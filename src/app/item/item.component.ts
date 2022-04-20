import { Router } from '@angular/router';
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

  userSub?: Subscription;

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
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onModify() {
    this.selected = true;
    const id = this.siteService.getIndex(this.site);
    this.router.navigate(['/edit', id]);
  }

  onDelete(id: number[]) {
    this.dataStorageService.deleteData(id)?.subscribe((res) => {
      //this.siteService.removeSite(this.index!);
    });
  }
}
