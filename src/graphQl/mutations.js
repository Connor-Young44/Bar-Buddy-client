import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $isBuisness: Boolean!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      isBuisness: $isBuisness
    ) {
      id
      firstName
      lastName
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
