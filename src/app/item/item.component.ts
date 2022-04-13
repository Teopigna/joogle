import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Site } from './../shared/site.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  isAdmin: boolean = false;

  userSub?: Subscription;

  @Input() site?: Site;
  
  @Input() index?: number;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAdmin = !!user;
    })
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe()
  }
}
