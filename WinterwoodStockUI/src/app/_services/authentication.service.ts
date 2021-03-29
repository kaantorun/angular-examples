import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { User } from '../_models';
import { AlertService, } from '../_services/alert.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  apiURL = 'https://winterwoodapi.azurewebsites.net/WinterwoodStock';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private router: Router) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public isUserLoggedId(): boolean {
    if(this.currentUser == null)
    {
      this.alertService.error('Unauthorized page!, You must login to see the content!', false);
      this.router.navigate(['/login']);

      return false;
    }
    return true;
  }

  loginAuth(username: any, password: any) {
    return this.http.post<any>(`${this.apiURL}/Auth/authenticate`,{Username: username,Password: password})
      .pipe(map(data => {

        // Convert to JSON
        let stringifiedData = JSON.stringify(data);
        console.log("With Stringify :" , stringifiedData);

        let jsonObject: any = JSON.parse(stringifiedData);
        let user = <User>jsonObject;

        if(user.id > 0)
        {
          let userss = [user];
          localStorage.setItem('users', JSON.stringify(userss));
        }

        return user;

      }),catchError(this.errorHandler));
  }

  login(username: any, password: any) {
    //return this.http.post<any>(`${this.apiURL}/Auth`,{Username: username,Password: password})
      return this.http.post<any>(`${this.apiURL}/users/authenticate`, { username, password })
      .pipe(map(user => {
        //this.http.post<any>(`${this.apiURL}/users/authenticate`, { username, password });
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null

    localStorage.removeItem('currentUser');
    localStorage.clear();
    // @ts-ignore
    this.currentUserSubject.next(null);

    this.alertService.success('You have successfully logged out!', true);
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
