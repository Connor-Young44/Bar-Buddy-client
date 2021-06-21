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
      user {
        id
        firstName
        isBuisness
      }
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

export const UPDATE_BAR_MUTATION = gql`
  mutation UpdateBarMutation(
    $id: Int!
    $name: String!
    $location: String!
    $desc: String!
    $imageUrl: String!
    $numberOfTables: Int!
    $userId: Int!
  ) {
    editBar(
      id: $id
      name: $name
      location: $location
      desc: $desc
      imageUrl: $imageUrl
      numberOfTables: $numberOfTables
      userId: $userId
    ) {
      id
      name
      location
      desc
      imageUrl
      numberOfTables
      userId
    }
  }
`;

export const CREATE_ITEM_MUTATION = gql`
  mutation CreateBarMutation(
    $name: String!
    $isFood: Boolean!
    $desc: String!
    $imageUrl: String!
    $price: Int!
    $barId: Int!
  ) {
    addMenuItem(
      name: $name
      isFood: $isFood
      desc: $desc
      imageUrl: $imageUrl
      price: $price
      barId: $barId
    ) {
      name
      desc
      price
      imageUrl
      barId
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserMutation($id: Int!, $currentBar: Int) {
    editUser(id: $id, currentBar: $currentBar) {
      id
      firstName
      lastName
      email
      isBuisness
    }
  }
`;
