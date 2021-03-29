import {Component, OnInit} from '@angular/core';
import {BatchService} from 'src/app/_services/batch.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from "../../_models";
import {AuthenticationService} from "../../_services";
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  // @ts-ignore
  currentUser: User;
  form = new FormGroup({
    fruitType: new FormControl('', Validators.required),
    varietyType: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
  });

  constructor(
    public batchService: BatchService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    if(this.currentUser == null)
    {
      this.alertService.error('Unauthorized page!, You must login to see the content!', false);
      this.router.navigate(['/login']);
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.batchService.create(this.form.value).subscribe(res => {
      console.log('Batch created successfully!');
      this.alertService.success('Batch created successfully!', true);
      this.router.navigateByUrl('batch/index');
    });
  }

}
