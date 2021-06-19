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

export const CREATE_BAR_MUTATION = gql`
  mutation CreateBarMutation(
    $name: String!
    $location: String!
    $desc: String!
    $imageUrl: String!
    $numberOfTables: Int!
    $userId: Int!
  ) {
    createBar(
      name: $name
      location: $location
      desc: $desc
      imageUrl: $imageUrl
      numberOfTables: $numberOfTables
      userId: $userId
    ) {
      id
      name
    }
  }
`;
