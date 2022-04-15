import { SitesService } from './sites.service';
import { Site } from './../shared/site.model';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {

    currentResearch: string = '';
    currentPage: number = 0;

    pageChanged = new Subject<number>();

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

    search(research: string) {
        this.currentResearch = research;
        this.currentPage = 1;

        this.pageChanged.next(this.currentPage);

        return this.http
        .get('http://localhost:3000/ricerca?_page=1&_limit=5&q=' + research)
        .pipe(
            map((res: any) => {
            return res.map((site: any) => {
                return { ...site };
            });
            }),
            tap((res: any) => {
            // Setta i siti nel site Service
            this.sitesService.setSites(res);
            })
        )
        .subscribe();
    }

    nextPage(){
        this.currentPage +=1;
        this.pageChanged.next(this.currentPage);

        return this.http
        .get('http://localhost:3000/ricerca?_page='+this.currentPage+'&_limit=5&q='+this.currentResearch)
        .pipe(
            map((res: any) => {
            return res.map((site: any) => {
                return { ...site };
            });
            }),
            tap((res: any) => {
            // Setta i siti nel site Service
            this.sitesService.setSites(res);
            })
        )
        .subscribe();
    }

    previousPage(){
        this.currentPage -=1;
        this.pageChanged.next(this.currentPage);

        return this.http
        .get('http://localhost:3000/ricerca?_page='+this.currentPage+'&_limit=5&q='+this.currentResearch)
        .pipe(
            map((res: any) => {
            return res.map((site: any) => {
                return { ...site };
            });
            }),
            tap((res: any) => {
            // Setta i siti nel site Service
            this.sitesService.setSites(res);
            })
        )
        .subscribe();
    }

    deleteData(id: number[]) {
        let token: string | null = this.authService.user.getValue()!.token;

        if (token == null) {
        return;
        }

        return this.http.delete(
        'http://localhost:3000/eliminaRisultati?id=' + id[0], //per id multipli ?id=1&id=2&id=3
        { headers: new HttpHeaders({ authorization: 'Bearer ' + token }) }
        );
    }

    addData(data: Site) {
        let token: string | null = this.authService.user.getValue()!.token;

        if (token == null) {
        return;
        }
        
        return this.http
        .post(
            'http://localhost:3000/ricerca', 
            data, 
            {headers: new HttpHeaders({ authorization: 'Bearer ' + token }),
        })
        .subscribe();
    }

    modifieData(data:Site, removeIndex: number) {
        let token: string | null = this.authService.user.getValue()!.token;

        if (token == null) {
            return;
        }

        return this.http.patch(
            'http://localhost:3000/ricerca/'+data.id, 
            data, 
            {headers: new HttpHeaders({ authorization: 'Bearer ' + token }),
        }).pipe(
            map((res: any) => {
                return {...res};
            }),
            tap((res: any) => {
                // Setta i siti nel site Service
                this.search(this.currentResearch);
            })
        ).subscribe();
    }
}
