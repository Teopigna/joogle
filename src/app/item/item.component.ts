import { AuthService } from './../services/auth.service';
import { Site } from './../shared/site.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  isAdmin: boolean = false;

  @Input() site?: Site;

  @Input() index?: number;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin;
  }

}
