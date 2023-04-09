import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GET_EMPLOYEE_BY_ID} from "../graphql/graphql.queries";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee: any;
  employeeId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
  ) {
  }

  ngOnInit(): void {

    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.detailEmployee(this.employeeId);
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  detailEmployee(id: bigint) {
    this.apollo.mutate({
      mutation: GET_EMPLOYEE_BY_ID,
      variables: {
        id: id,
      },
    }).subscribe(({data}: any) => {
      this.employee = data.findEmployeeById;
    }, (error) => {
      console.log('Error fetching employee by id:', error);
    });
  }
}
