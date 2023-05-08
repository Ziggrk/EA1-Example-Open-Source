import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/services/base.service";
import {formatNumber} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {
  trucks: Array<any>= [];
  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'http://localhost:3000/api/v1/food-trucks';
  }

  async registerCount(){
    this.trucks = await this.getAll().toPromise();
    return this.trucks;
  }
}
