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
    this.sites.splice(ind, 1);
    this.sitesChanged.next(this.sites.slice());
  }

  addSite(data: Site){
    this.sites.push(data);
    this.sitesChanged.next(this.sites.slice());
  }

  getSites() {
    return this.sites.slice();
  }

  getSite(index: number) {
    return this.sites[index];
  }

  getIndex(site: Site | undefined){
    if(site)
      return this.sites.indexOf(site);
    else
      return
  }
}
