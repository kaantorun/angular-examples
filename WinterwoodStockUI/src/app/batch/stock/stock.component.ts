import {Component, OnInit} from '@angular/core';
import {Stock} from 'src/app/_models/stock';
import {BatchService} from 'src/app/_services/batch.service';
import {AuthenticationService} from "../../_services";
import {User} from "../../_models";
import { AlertService, } from 'src/app/_services/alert.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  currentUser: User;
  stocks: Stock[] = [];

  constructor(public batchService: BatchService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router) {
  this.currentUser = this.authenticationService.currentUserValue;
}

  ngOnInit(): void {
    if(!this.authenticationService.isUserLoggedId())
    {
      this.alertService.error('Unauthorized page!, You must login to see the content!', false);
      this.router.navigate(['/login']);
    }
    else {
      this.batchService.getAllStock().subscribe((data: Stock[]) => {
        this.stocks = data;
        console.log(this.stocks);
      });
    }
  }
}
