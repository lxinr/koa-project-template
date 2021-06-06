import { ApolloServer, gql } from 'apollo-server-koa'
export const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String,
    info: [String]
  }
`

export const resolvers = {
  Query: {
    hello: () => 'world',
    info: () => ['hhahah', 'tttt']
  }
}

export default new ApolloServer({ typeDefs, resolvers })