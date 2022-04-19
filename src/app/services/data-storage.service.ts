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

  // Richiede al server l'intera lista di siti
    getData() {
        this.currentResearch = '';
        this.currentPage = 1;

        this.pageChanged.next(this.currentPage);

        return this.http.get('http://localhost:3000/ricerca?_page=1&_limit=5').pipe(
        map((res: any) => {
            return res.map((site: any) => {
            return { ...site };
            });
        }),
        tap((res: any) => {
            // Setta i siti nel site Service
            this.sitesService.setSites(res);
        })
        ).subscribe();
    }

    // Funzione di ricerca 
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

     // Funzione di ricerca
     searchAtPage(research: string, page: number) {
        this.currentResearch = research;

        this.pageChanged.next(page);

        return this.http
        .get('http://localhost:3000/ricerca?_page='+page+'&_limit=5&q='+research)
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

    //Carica la pagina successiva
    nextPage(){
        this.currentPage +=1;
        this.pageChanged.next(this.currentPage);

        return this.http.get(
            'http://localhost:3000/ricerca?_page='+this.currentPage+'&_limit=5&q='+this.currentResearch
        )
        .pipe(
            //Mappo i siti presenti nella risposta sotto forma di Oggetto
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

    //Carica la pagina precedente
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

    //Elimina il sito con id specificato
    deleteData(id: number[]) {
        let token: string | null = this.authService.user.getValue()!.token;

        if (token == null) {
            return;
        }

        return this.http.delete(
            'http://localhost:3000/eliminaRisultati?id=' + id[0], //per id multipli ?id=1&id=2&id=3
            { headers: new HttpHeaders({ authorization: 'Bearer ' + token }) }
        ).pipe(
            tap(res => {
                this.searchAtPage(this.currentResearch, this.currentPage);
            }));
    }

    //Aggiunge il sito definito
    addData(data: Site) {
        let token: string | null = this.authService.user.getValue()!.token;

        if (token == null) {
            return;
        }
        
        return this.http.post(
            'http://localhost:3000/ricerca', 
            data, 
            {headers: new HttpHeaders({ authorization: 'Bearer ' + token }),
        }).pipe(
            tap(res => {
                if(this.currentPage == 0){
                    this.searchAtPage(data.title, 1);
                }
                else{
                    this.searchAtPage(this.currentResearch, this.currentPage);
                }
            })
        ).subscribe();
    }

    // Modifica il sito specificato
    modifieData(data:Site) {
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
                //Per ora non ce ne facciamo nulla
                return {...res};
            }),
            tap((res: any) => {
                // Setta i siti nel site Service
                this.searchAtPage(this.currentResearch, this.currentPage);
            })
        ).subscribe();
    }
}
