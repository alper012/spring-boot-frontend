import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE} from '../graphql/graphql.queries';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  updateForm: FormGroup;
  employee: any;
  employeeId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.detailEmployee(this.employeeId);
  }

  onSubmit(): void {
    console.log(this.employee)
    const {firstName, lastName, email} = this.employee;
    this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        id: this.employee.id,
        firstName,
        lastName,
        email
      }
    }).subscribe(({data}) => {
      this.goBack();
    }, (error) => {
      console.log('Error updating employee:', error);
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  detailEmployee(id: any): void {
    this.apollo.mutate({
      mutation: GET_EMPLOYEE_BY_ID,
      variables: {
        id: id,
      },
    }).subscribe(({data}: any) => {
      this.employee = data.findEmployeeById;
      this.updateForm.patchValue({
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        email: this.employee.email
      });
    }, (error) => {
      console.log('Error fetching employee by id:', error);
    });
  }
}
