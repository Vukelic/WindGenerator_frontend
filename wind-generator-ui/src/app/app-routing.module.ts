import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './core/guards/auth.guard';

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
  path: 'registration',
  component: RegistrationComponent,
},
{
  canActivate: [AuthGuard],
  path: 'dashboard',
  component: DashboardComponent,
},
{ canActivate: [AuthGuard],
  path: 'users',
  component: UsersComponent,
},
{ canActivate: [AuthGuard],
  path: 'account',
  component: MyAccountComponent,
},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
