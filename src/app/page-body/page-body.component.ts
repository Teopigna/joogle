import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-body',
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.css']
})
export class PageBodyComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin;
  }

}
