import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services/alert.service';
import {  AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  // @ts-ignore
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  // @ts-ignore
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.loginAuth(this.f.username.value, this.f.password.value)
      .subscribe(
        user => {

          if(user.status == 0)
          {
            this.authenticationService.login(this.f.username.value, this.f.password.value)
              .pipe(first())
              .subscribe(
                data => {
                  this.router.navigate([this.returnUrl]);
                },
                error => {
                  this.alertService.error(error);
                  this.loading = false;
                })
          }
          else
            {
              this.alertService.success(user.message, false);
              this.loading = false;
            }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

