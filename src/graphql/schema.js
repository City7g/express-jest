const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type User {
    id: ID!
    name: String!
    password: String!
    createdAt: String!  
    updatedAt: String!  
  }

  type Query {
    getUsers: [User!]!
  }
`)