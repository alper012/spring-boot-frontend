import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ADD_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEES} from "../graphql/graphql.queries";
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  error: any;


  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });


  addEmployee() {

    this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: {
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        email: this.employeeForm.value.email,
      },
      refetchQueries: [{
        query: GET_EMPLOYEES
      }]
    }).subscribe(({data}: any) => {
        this.employees = data.findAllEmployees;
        this.employeeForm.reset();
      }
      , (error) => {
        this.error = error;
      }
    );

  }

  deleteEmployee(id: bigint) {
    console.log(id)
    this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: {
        id: id,
      },
      refetchQueries: [{
        query: GET_EMPLOYEES
      }]
    }).subscribe(({data}: any) => {
        this.employees = data.findAllEmployees;
      }
      , (error) => {
        this.error = error;
      }
    );
  }


  detailEmployee(id: bigint) {
    console.log(id)

  }


  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_EMPLOYEES
    }).valueChanges.subscribe(({data, error}: any) => {
        console.log(data)
        this.employees = data.findAllEmployees;
        this.error = error;
      }
    );
  }

}
