import { SitesService } from './../services/sites.service';
import { DataStorageService } from './../services/data-storage.service';
import { AuthService } from './../services/auth.service';
import { Site } from './../shared/site.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  sites: Site[] = [];

  subscription?: Subscription;

  constructor(private authService: AuthService, private storageService: DataStorageService, private sitesService: SitesService) { }
  
  ngOnInit(): void {
    
    // Avviato quando viene lanciata la NEXT su sitesChanged in sitesService
    this.subscription = this.sitesService.sitesChanged.subscribe(
      (sites: Site[]) => {
        this.sites = sites;
      }
    );
    
    this.sites = this.sitesService.getSites();
  }

  // Chiama lo storage service per ricevere i dati riguardo ai siti
  get() {
    this.storageService.getData().subscribe();
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
