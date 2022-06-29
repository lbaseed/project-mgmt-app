import { gql } from "@apollo/client"

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
      client {
        id
        name
        email
      }
    }
  }
`; // end GET_PROJECTS

const GET_PROJECT = gql `
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {  id name email phone }
    }
  }
`; // end GET_PROJECT


export { GET_PROJECTS, GET_PROJECT };
