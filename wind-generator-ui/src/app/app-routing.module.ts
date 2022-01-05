import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'dashboard',
  component: DashboardComponent,
},
{
  path: 'users',
  component: UsersComponent,
},
{
  path: 'account',
  component: MyAccountComponent,
},
{
  path: 'registration',
  component: RegistrationComponent,
},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
