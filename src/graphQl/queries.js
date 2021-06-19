import gql from "graphql-tag";

//for the homePage
export const GET_ALL_BARS = gql`
  query AllBars {
    bars {
      id
      name
      imageUrl
      desc
      numberOfTables
      userId
    }
  }
`;

//single loged in user
export const GET_CURRENT_USER = gql`
  query LoggedInUser {
    me {
      id
      firstName
      lastName
      isBuisness
    }
  }
`;
