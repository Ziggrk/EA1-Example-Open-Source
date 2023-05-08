import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  basePath = 'http://localhost:3000/api/v1';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  handleError(error: HttpErrorResponse) {
    // Default error handling
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError(() =>
      new Error('Something happened with request, please try again later'));
  }
  getAll(){
    return this.http.get<any>(`${this.basePath}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }

  getById(id: any){
    return this.http.get<any>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

   post(item:any){
    return this.http.post<any>(`${this.basePath}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  update(id: any, item: any) {
    return this.http.put(`${this.basePath}/${id}`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
