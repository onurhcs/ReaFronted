import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './singup/singup.component';
import { DashnavbarComponent } from './dashboard/dashnavbar/dashnavbar.component';
import { AlluserComponent } from './dashboard/alluser/alluser.component';
import { DashcommentComponent } from './dashboard/dashcomment/dashcomment.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CommentComponent } from './comment/comment.component';
import { ListComponent } from './dashboard/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, 
  { path: 'navbar', component: NavbarComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'sign', component: SignupComponent }, 
  { path: 'admin', component: DashnavbarComponent }, 
  { path: 'user', component: AlluserComponent }, 
  {path: 'yorum',component: DashcommentComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'Twitler',component: CommentComponent},
  {path: 'List',component: ListComponent},



  






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
