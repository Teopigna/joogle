import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';

import { faJ } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  faIcon = faJ;

  isAdmin: boolean = false;
  isLogin: boolean = false;

  userSub?: Subscription;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    //Si iscrive alla Subject user nell'authService, che sarà null in caso in cui non si sia fatto il login come Admin
    this.userSub = this.authService.user.subscribe(user => {
      this.isAdmin = !!user;
      this.isLogin = false;
    })
  }
  
  onLogout(){
    this.authService.logout();
  }

  //Cambia il link in alto a destra dell'Header in base alla pagina in cui ci troviamo
  setState(){
    this.isLogin = !this.isLogin;
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
