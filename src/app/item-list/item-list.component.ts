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

  currentPage: number = 0;
  message: string | null = null;
  noNext: boolean = false;

  siteSubscription?: Subscription;
  pageSubscription?: Subscription;

  constructor(private authService: AuthService, private storageService: DataStorageService, private sitesService: SitesService) { }
  
  ngOnInit(): void {
    
    // Avviato quando viene lanciata la NEXT su sitesChanged in sitesService
    this.siteSubscription = this.sitesService.sitesChanged.subscribe(
      (sites: Site[]) => {
        this.sites = sites;
        if(this.sites.length === 0){
          this.message = "No result match your research"
        }
        else{
          this.message = null;
        }
        if(this.sites.length < 5){
          this.noNext = true;
        }
        else
          this.noNext = false;
      }
    );

    this.pageSubscription = this.storageService.pageChanged.subscribe(
      (page:number) => {
        this.currentPage = page;
      }
    )
    
    this.sites = this.sitesService.getSites();
  }

  nextPage(){
    this.currentPage +=1;
    this.storageService.nextPage();
  }

  previousPage(){
    this.currentPage -=1;
    this.storageService.previousPage();
  }

  // Chiama lo storage service per ricevere i dati riguardo ai siti
  get() {
    this.storageService.getData().subscribe();
  }


  ngOnDestroy(): void {
    this.siteSubscription?.unsubscribe();
  }
}
