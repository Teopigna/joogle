import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { faShieldCat } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-body',
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.css']
})
export class PageBodyComponent implements OnInit, OnDestroy {

  faIcon = faShieldCat;

  isAdmin: boolean = false;

  userSub?: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAdmin = !!user;
    })
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

}
