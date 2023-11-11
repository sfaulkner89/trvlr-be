import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  type Mutations {
    postMessage(id: String!, message: MessageInput!): MessageGroupType
    createGroup(id: String!): MessageGroupType
    createUser(user: UserInput!): User
    follow(id: String!, user: String!): User
    unfollow(id: String!, user: String!): User
    createPlace(place: PlaceInput!): Place
    createList(list: ListInput!): List
    addPlaceToList(list: String!, place: String!): List
    putUser(user: UserInput!): User
    deleteList(list: String!): User
  }

  type Query {
    user(id: String!): User
    users: [User!]!
    place(id: String!): Place
    places: [Place!]!
    list(id: String!): List
    lists: [List!]!
    messageGroup(id: String!): MessageGroupType
    messageGroups: [MessageGroupType!]!
  }

  type Subscriptions {
    newMessages(ids: [String!]!): [MessageGroupType!]!
  }

  input MessageInput {
    to: [String!]!
    from: String!
    message: String!
  }
  type MessageGroupType {
    id: String!
    messages: [Message!]!
  }
  type Message {
    to: [String!]!
    from: String!
    message: String!
  }
  type User {
    id: String!
    name: String!
    email: String!
    followers: [String!]!
    following: [String!]!
    lists: [String!]!
  }
  type Place {
    id: String!
    name: String!
    address: String!
    lat: Float!
    lng: Float!
  }
  type List {
    id: String!
    name: String!
    places: [String!]!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  input PlaceInput {
    name: String!
    address: String!
    lat: Float!
    lng: Float!
  }
  input ListInput {
    name: String!
    places: [String!]!
  }
`
