import {Component, OnInit} from '@angular/core';
import {BatchService} from 'src/app/_services/batch.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Batch} from 'src/app/_models/batch';
import {AlertService, AuthenticationService, UserService} from "../../_services";
import {User} from "../../_models";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  currentUser: User;
  firstName = '';
  batchId = this.route.snapshot.params['batchId'];
  // @ts-ignore
  batch: Batch;


  constructor(
    public batchService: BatchService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    if(!this.authenticationService.isUserLoggedId())
    {
      this.alertService.error('Unauthorized page!, You must login to see the content!', false);
      this.router.navigate(['/login']);
    }
    else {
      this.batchService.find(this.batchId).subscribe((data: Batch) => {
        this.batch = data;
      });
    }
  }

}
