import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../_models';
import {Observable, throwError} from "rxjs";
import {catchError, first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = 'https://winterwoodapi.azurewebsites.net/WinterwoodStock';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  registerAuth(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiURL}/Auth/registerauth`, JSON.stringify(user), this.httpOptions);
  }

  register(user: any): Observable<User> {
    return this.httpClient.post<any>(`${this.apiURL}/users/register`, JSON.stringify(user), this.httpOptions);
  }

  delete(id: number) {
    return this.httpClient.delete(`${config.apiUrl}/users/${id}`);
  }
}
