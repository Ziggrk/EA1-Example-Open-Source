import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignUpService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'http://localhost:3000/api/v1/food-trucks';
  }

  getByEmail(email: string){
    return this.http.get(`${this.basePath}?email=${email}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getByBrandName(brandName: string){
    return this.http.get(`${this.basePath}?brandName=${brandName}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));  }

}
