import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/pages/home/home.component";
import {SignUpComponent} from "./sign-up/pages/sign-up/sign-up.component";
import {TableComponent} from "./table/pages/table/table.component";
import {EditComponent} from "./edit/pages/edit/edit.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full"},
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'table', component: TableComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
