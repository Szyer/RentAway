import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdatepopComponent } from './updatepop/updatepop.component';
import { AuthGuard } from './guard/auth.guard';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {path:'', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'aboutus', component: AboutusComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'updatepop', component: UpdatepopComponent},
  {path:'user', component:UserlistingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
