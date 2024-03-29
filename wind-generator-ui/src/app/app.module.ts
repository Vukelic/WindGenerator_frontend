import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MarkerInfoBoxComponent } from './components/marker-info-box/marker-info-box.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//Angular Material Components
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WindGeneratorConfigComponent } from './components/modals/wind-generator-config/wind-generator-config.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { UsersComponent } from './components/users/users.component';
import { RegistrationComponent } from './components/registration/registration.component'; 
import { AuthInterceptorInterceptor } from './core/interceptor/auth-interceptor.interceptor';
import { HistoriesComponent } from './components/modals/histories/histories.component';
import { ChartItemsComponent } from './components/chart-items/chart-items.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { UserSettingsComponent } from './components/account/user-settings/user-settings.component';
import { MapForSelectionComponent } from './components/map-for-selection/map-for-selection.component';
import { SelectLocationMapModalComponent } from './components/select-location-map-modal/select-location-map-modal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LandingComponent } from './components/landing/landing.component';
import { InvestComponent } from './components/invest/invest.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { PersonalContributesComponent } from './components/personal-contributes/personal-contributes.component';
import { ProfitComponent } from './components/profit/profit.component';
import { DataTableComponent } from './components/custom-table/data-table/data-table.component';
import { DeviceTypeModalComponent } from './components/modals/device-type-modal/device-type-modal.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MarkerInfoBoxComponent,
    MapComponent,
    WindGeneratorConfigComponent,
    MyAccountComponent,
    UsersComponent,
    RegistrationComponent,
    HistoriesComponent,
    ChartItemsComponent,
    UserSettingsComponent,
    MapForSelectionComponent,
    SelectLocationMapModalComponent,
    NavBarComponent,
    LandingComponent,
    InvestComponent,
    StatisticComponent,
    PersonalContributesComponent,
    ProfitComponent,
    DataTableComponent,
    DeviceTypeModalComponent,
    AllUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    DragDropModule,
    GoogleChartsModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
