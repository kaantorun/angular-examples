import {Component, OnInit} from '@angular/core';
import {Batch} from 'src/app/_models/batch';
import {BatchService} from 'src/app/_services/batch.service';
import {User} from "../../_models";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services";
import { AlertService, } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  currentUser: User;
  batches: Batch[] = [];

  constructor(public batchService: BatchService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {

    if(!this.authenticationService.isUserLoggedId())
    {
      this.alertService.error('Unauthorized page!, You must login to see the content!', true);
      this.router.navigate(['/login']);
    }
    else {
      this.batchService.getAll().subscribe((data: Batch[]) => {
        this.batches = data;
        console.log(this.batches);
      });
    }
  }

  deleteBatch(id: number) {
    this.batchService.delete(id).subscribe(res => {
      this.batches = this.batches.filter(item => item.batchId !== id);
      console.log('Batch deleted successfully!');
    });
  }

}
