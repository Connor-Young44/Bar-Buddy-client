import gql from "graphql-tag";

//for the homePage
export const GET_ALL_BARS = gql`
  query AllBars {
    bars {
      id
      name
      location
      imageUrl
      desc
      numberOfTables
      userId
      tables {
        id
        number
        occupiedBy
      }
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
      currentBar
    }
  }
`;

export const GET_MENU_ITEMS = gql`
  query MenuItems($barId: Int!) {
    menuItems(barId: $barId) {
      id
      name
      desc
      imageUrl
      price
      barId
    }
  }
`;

export const GET_TABLES = gql`
  query Tables($barId: Int!) {
    tables(barId: $barId) {
      id
      number
      seats
      occupiedBy
      isFree
    }
  }
`;

export const GET_LIVE_USERS = gql`
  subscription LiveUsers {
    userJoined {
      id
      firstName
      lastName
      currentBar
    }
  }
`;

export const GET_USERS = gql`
  query Users($barId: Int!) {
    users(barId: $barId) {
      id
      firstName
      lastName
      currentBar
    }
  }
`;

export const GET_ORDERS = gql`
  query Orders {
    orders {
      id
      served
      closed
      qty
      tableId
      menuItems {
        name
        price
        isFood
      }
    }
  }
`;
