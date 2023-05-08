import {Component, OnInit} from '@angular/core';
import {FoodTrucks} from "../../../shared/model/food-trucks";
import {EditService} from "../../services/edit.service";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  id!: number;
  foodTruck!: FoodTrucks;

  ownerFirstName: string = "";
  ownerLastName: string = "";
  brandName: string = "";
  email: string = "";
  address: string = "";
  websiteUrl: string = "-";
  menuUrl: string = "-";

  //FormControl
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  brandFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private editService: EditService, private router: ActivatedRoute) {
  }

  ngOnInit(){
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.editService.getById(this.id).subscribe((response: any)=>{
      console.log(response);
      this.ownerFirstName = response.ownerFirstName;
      this.ownerLastName = response.ownerLastName;
      this.brandName = response.brandName ;
      this.email = response.email;
      this.address = response.address;
      this.websiteUrl = response.websiteUrl;
      this.menuUrl = response.menuUrl;
    })
  }

  edit(){
    if (this.emailFormControl.valid && this.brandFormControl.valid && this.lastNameFormControl.valid && this.firstNameFormControl.valid){
      const item: FoodTrucks = {
        id: this.id,
        ownerFirstName: this.ownerFirstName,
        ownerLastName: this.ownerLastName,
        brandName: this.brandName,
        email: this.email,
        address: this.address,
        websiteUrl: this.websiteUrl,
        menuUrl: this.menuUrl
      };

      this.editService.update(this.id, item).subscribe((response: any)=>{
        console.log(response);
      });
    }
  }
}
