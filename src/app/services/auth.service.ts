import { User } from './../shared/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from "@angular/core";

import {tap, map, catchError} from "rxjs/operators"
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    //Subject utile ad "avvisare" i componenti che ne hanno bisogno del login/logout effettuato
    user = new BehaviorSubject<User | null>(null);

    private tkExpirationTimer: any;

    constructor(private http: HttpClient){}


    // Gestisce la richiesta di login
    login(email: string, password: string){
        
        return this.http.post(
            "http://localhost:3000/auth/login",
            {
                user: email,
                password: password
            }
        ).pipe(
            map( (resData:any) => {
                return {...resData};
            }),
            tap( (resData:any) => {
                this.handleLogin(resData.access_token, +resData.tokenExpireIn, resData.refreshToken, +resData.refreshTokenExpireIn)
            })
        );
    }

    // Recupera i dati relativi all'utente dal local storage quando la pagina viene refreshata
    autoLogin() {
        const userData: {
            id : string;
            _token: string;
            _tokenExpirationDate : string;
            
        } = JSON.parse(localStorage.getItem('user') || '{}');

        if(!userData){
            return;
        }

        const loadedUser = new User(userData.id, userData._token, +userData._tokenExpirationDate);

        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expi = loadedUser._tokenExpirationDate - ((new Date()).getTime());
            this.autoLogout(expi);
        }

    }

    // Logout - setta la subject user a null e rimuove i dati utente dallo storage locale
    logout() {
        this.user.next(null);
        localStorage.removeItem('user');
        if(this.tkExpirationTimer){
            clearTimeout(this.tkExpirationTimer);
        }
        this.tkExpirationTimer = null;
    }

    // Automatically logout after expirationTime (in mseconds)
    autoLogout(expirationTime: number) {
        this.tkExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationTime );
    }

    // Salva i dati dell'utente loggato in un oggetto User
    handleLogin(tk: string, tkExpire: number, refreshTk: string, refreshExpire: number){
        const expi = tkExpire - ((new Date()).getTime());

        const user = new User(
            "user",
            tk,
            tkExpire
        );
        
        this.user.next(user);
        
        localStorage.setItem('user', JSON.stringify(user));

        this.autoLogout(expi);
    }

}