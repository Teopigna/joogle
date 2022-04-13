import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {

    isAdmin: boolean = true;
    

    login(email: string, password: string){

    }

    logout() {
        
    }

}