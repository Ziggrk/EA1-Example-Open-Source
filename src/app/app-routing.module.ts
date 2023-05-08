import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/pages/home/home.component";
import {SignUpComponent} from "./sign-up/pages/sign-up/sign-up.component";
import {TableService} from "./table/services/table.service";
import {TableComponent} from "./table/pages/table/table.component";
import {EditComponent} from "./edit/pages/edit/edit.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'table', component: TableComponent },
  { path: 'edit/:id', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
