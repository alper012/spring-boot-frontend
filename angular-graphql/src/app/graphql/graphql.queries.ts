import {gql} from 'apollo-angular'

const GET_EMPLOYEES = gql`
  query {
    findAllEmployees {
      firstName
      lastName
      email
      id
    }
  }
`

const ADD_EMPLOYEE = gql`
  mutation createEmployee($firstName: String!, $lastName: String!, $email: String!) {
    createEmployee(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`

const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($id: ID!, $firstName: String!, $lastName: String!, $email: String!) {
    updateEmployee(id: $id, firstName: $firstName, lastName: $lastName, email: $email){
    id
    firstName
    lastName
    email
  }
}
`;

const GET_EMPLOYEE_BY_ID = gql`
  mutation findEmployeeById($id: ID!) {
    findEmployeeById(id: $id){
    id
    firstName
    lastName
    email
  }
 }
`;


export {GET_EMPLOYEES, ADD_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE}
