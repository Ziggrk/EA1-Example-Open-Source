import {Component, OnInit} from '@angular/core';
import {FoodTrucks} from "../../../shared/model/food-trucks";
import {TableService} from "../../services/table.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  data: Array<FoodTrucks> = [];
  displayedColumns: string[] = ['id', 'ownerLastName', 'ownerFirstName', 'brandName', 'email', 'address', 'websiteUrl', 'menuUrl'];

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.tableService.getAll().subscribe((response:any)=>{
      this.data = response
    });
  }
}
