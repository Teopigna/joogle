import { AuthService } from './../services/auth.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean = false;
  isLogin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  setState(){
    this.isLogin = !this.isLogin;
  }

}
