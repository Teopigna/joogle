import { SitesService } from './sites.service';
import { Site } from './../shared/site.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sitesService: SitesService
  ) {}

  // Richiesta al server di ricevere i siti
  getData() {
    return this.http.get('http://localhost:3000/ricerca').pipe(
      map((res: any) => {
        return res.map((site: any) => {
          return { ...site };
        });
      }),
      tap((res: any) => {
        // Setta i siti nel site Service
        this.sitesService.setSites(res);
      })
    );
  }

  /*per ora non vuol dire nulla
    changeData(){
      return this.http.get(
        "http://localhost:3000/ricerca"
    ).pipe(
        map((res:any) => {
            return res.map( (site:any) => {
                return {...site}
            });
        }),
        tap((res: any) => {
            // Setta i siti nel site Service
            this.sitesService.setSites(res);
        })
    );
    }*/
}
