import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/passport/login/login.component";
import {RegisterComponent} from "./pages/passport/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {DetailComponent} from "./pages/home/detail/detail.component";
import {UserComponent} from "./pages/user/user.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'home/detail', component: DetailComponent },
  { path: 'userInfo', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
