import { AuthService } from './../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy{

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm){

    if(!form.valid){
      return;
    }
    
    const email = form.value.user;
    const password = form.value.password;

    let authObs: Observable<any>;

    authObs = this.authService.login(email, password);
    
    authObs.subscribe(
      responseData => {
        this.errorMessage = null;
        this.router.navigate(['']);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    
    );

    form.reset();
  }

  ngOnDestroy(): void {
    
  }

}
