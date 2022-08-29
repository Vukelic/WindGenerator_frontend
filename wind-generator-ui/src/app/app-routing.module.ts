import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './components/account/user-settings/user-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvestComponent } from './components/invest/invest.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StatisticComponent } from './components/statistic/statistic.component';
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
  canActivate: [AuthGuard],
  path: 'dashboard',
  component: DashboardComponent,
},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
