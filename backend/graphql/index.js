const express = require('express');
const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = require('./schema')
const resolver = require('./resolver')

router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true
}))

module.exports = router