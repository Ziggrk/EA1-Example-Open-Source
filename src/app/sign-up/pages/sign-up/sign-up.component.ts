import { Component } from '@angular/core';
import {FoodTrucks} from "../../../shared/model/food-trucks";
import {SignUpService} from "../../services/sign-up.service";
import {FormControl, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  id: number = 0;
  ownerFirstName: string = "";
  ownerLastName: string = "";
  brandName: string = "";
  email: string = "";
  address: string = "";
  websiteUrl: string = "-";
  menuUrl: string = "-";
  emailValid: boolean = false;
  brandValid: boolean =false;

  //FormControl
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  brandFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  constructor(private signUpService: SignUpService, private router:Router){}

  async generateId() {
    const trucks: Array<any> = await this.signUpService.getAll().toPromise();
    return trucks.length + 1
  }
  async signUp() {

    if (this.emailFormControl.valid && this.brandFormControl.valid && this.lastNameFormControl.valid && this.firstNameFormControl.valid) {

      forkJoin([
        this.signUpService.getByEmail(this.email),
        this.signUpService.getByBrandName(this.brandName)
      ]).subscribe(async ([emailResponse, brandResponse]) => {
        // @ts-ignore
        this.emailValid = emailResponse.length <= 0;
        // @ts-ignore
        this.brandValid = brandResponse.length <= 0;

        if (this.emailValid && this.brandValid) {
          this.id = await this.generateId();
          const truck: FoodTrucks = {
            id: this.id,
            ownerFirstName: this.ownerFirstName,
            ownerLastName: this.ownerLastName,
            brandName: this.brandName,
            email: this.email,
            address: this.address,
            websiteUrl: this.websiteUrl,
            menuUrl: this.menuUrl
          };

          this.signUpService.post(truck).subscribe((response: any) => {
            console.log(`Track registered: `, response);
          });

          this.router.navigate(['/home']);
        }else{
          if(!this.brandValid) console.log("Error: This brand name is already register");
          if(!this.emailValid) console.log("Error: This email is already register");
        }

      });
    }
  }

}
