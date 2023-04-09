import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";
import {AuthGuard} from "./auth-guard";
import {RegisterComponent} from "./register/register.component";
import {UpdateEmployeeComponent} from "./update-employee/update-employee.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard]},
  {path: 'employee/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard]},
  {path: 'employee/update/:id', component: UpdateEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
