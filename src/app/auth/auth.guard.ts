import { AuthService } from './../services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import {map, take} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),//Just take 1 user then unsubscribe
            map(
                user => {
                    const isAuth = !!user;
                    if(isAuth){
                        console.log("It is auth")
                        return true;
                    }
                    console.log("It is not")
                    return this.router.createUrlTree([''])
                }
            )
        );
    }
}