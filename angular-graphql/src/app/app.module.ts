import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {LoginComponent} from './login/login.component';
import {AuthService} from "./auth.service";
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {RegisterComponent} from './register/register.component';
import {UpdateEmployeeComponent} from './update-employee/update-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    LoginComponent,
    EmployeeDetailComponent,
    RegisterComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
