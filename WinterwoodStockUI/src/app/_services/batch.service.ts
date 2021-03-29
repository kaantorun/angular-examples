import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Batch} from '../_models/batch';
import {Stock} from '../_models/stock';

import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  apiURL = 'https://winterwoodapi.azurewebsites.net/WinterwoodStock';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Batch[]> {
    return this.httpClient.get<Batch[]>(this.apiURL + '/GetAllBatch/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAllStock(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(this.apiURL + '/GetAllStock/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(batch: any): Observable<Batch> {
    return this.httpClient.post<Batch>(this.apiURL, JSON.stringify(batch), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  find(batchId: number): Observable<Batch> {
    return this.httpClient.post<Batch>(this.apiURL + '/GetBatchById?batchId=' + batchId, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(batch: any): Observable<Batch> {
    return this.httpClient.put<Batch>(this.apiURL, JSON.stringify(batch), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(batchId: number) {
    return this.httpClient.delete<Batch>(this.apiURL + '?batchId=' + batchId, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
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
