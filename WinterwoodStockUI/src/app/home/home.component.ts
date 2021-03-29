import { Component, OnInit } from '@angular/core';

import { User } from '../_models/';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import {AlertService} from "../_services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    if(!this.authenticationService.isUserLoggedId())
    {
      this.alertService.error('Unauthorized page!, You must login to see the content!', false);
      this.router.navigate(['/login']);
    }
  }
}
