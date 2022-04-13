import { User } from './../shared/user.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from "@angular/core";

import {tap} from "rxjs/operators"
import { BehaviorSubject } from 'rxjs';

export interface AuthResponseData {
    token: string;
    tokenExpiresIn: string;
    refreshToken: string;
    refreshTokenExpiresIn: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    //Subject utile ad "avvisare" i componenti che ne hanno bisogno del login/logout effettuato
    user = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient){}

    login(email: string, password: string){
        //console.log('loggin in');
        return this.http.post<AuthResponseData>(
            "http://localhost:3000/auth/login",
            {
                user: email,
                password: password
            }
        ).pipe(
            tap(resData => {
                this.handleLogin(resData.token, +resData.tokenExpiresIn, resData.refreshToken, +resData.refreshTokenExpiresIn)
            })
        );
    }

    logout() {
        this.user.next(null);
    }

    // Salva i dati dell'utente loggato in un oggetto User
    handleLogin(tk: string, tkExpire: number, refreshTk: string, refreshExpire: number){
        const expirationDate = new Date(new Date().getTime() + tkExpire * 1000);
        const user = new User(
            "user",
            tk,
            expirationDate
        );
        this.user.next(user);
    }

}