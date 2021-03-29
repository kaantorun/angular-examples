import {Component, OnInit} from '@angular/core';
import {BatchService} from 'src/app/_services/batch.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Batch} from 'src/app/_models/batch';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from "../../_models";
import {AuthenticationService} from "../../_services";
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  currentUser: User;
  batchId = this.route.snapshot.params['batchId'];
  // @ts-ignore
  batch: Batch;
  form = new FormGroup({
    batchId: new FormControl('', Validators.required),
    fruitType: new FormControl('', Validators.required),
    varietyType: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
  });

  constructor(
    public batchService: BatchService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
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

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.batchService.update(this.form.value).subscribe(res => {
      console.log('Batch updated successfully!');
      this.alertService.success('Batch updated successfully!', true);
      this.router.navigateByUrl('batch/index');
    });
  }
}
