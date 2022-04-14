import { Site } from './../shared/site.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SitesService {
  sites: Site[] = [];

  // Subject "osservata" da item-list component
  sitesChanged = new Subject<Site[]>();

  setSites(sites: Site[]) {
    this.sites = sites;
    // Avvisa tutti i componenti subscribed a sitesChanged che i siti sono cambiati
    this.sitesChanged.next(this.sites.slice());
  }
  
  removeSite(ind: number){
    console.log(this.sites);
    this.sites = this.sites.splice(ind, 1);
    console.log(this.sites);
    this.sitesChanged.next(this.sites.slice());
  }

  getSites() {
    //console.log(this.sites);
    return this.sites.slice();
  }

  getSite(index: number) {
    return this.sites[index];
  }
}
