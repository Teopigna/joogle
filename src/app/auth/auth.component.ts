import { AuthService, AuthResponseData } from './../services/auth.service';
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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm){

    if(!form.valid){
      return;
    }
    
    const email = form.value.user;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.login(email, password);
    
    authObs.subscribe(responseData => {
      //console.log(responseData);
      this.router.navigate(['']);
    });

    form.reset();
  }

  ngOnDestroy(): void {
    
  }

}
