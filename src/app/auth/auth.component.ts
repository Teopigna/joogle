import { AuthService } from './../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy{

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

}
