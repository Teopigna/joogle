import { User } from './../shared/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from "@angular/core";

import {tap, map, catchError} from "rxjs/operators"
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    //Subject utile ad "avvisare" i componenti che ne hanno bisogno del login/logout effettuato
    user = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient){}

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
        }

    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('user');
    }

    // Salva i dati dell'utente loggato in un oggetto User
    handleLogin(tk: string, tkExpire: number, refreshTk: string, refreshExpire: number){
        
        const user = new User(
            "user",
            tk,
            tkExpire
        );
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error){
            return new Error(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case '401':
                errorMessage = "Wrong user or password"
        }

        return throwError(errorMessage);
        
    }

}