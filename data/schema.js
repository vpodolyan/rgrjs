import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from "graphql"

let linkType = new GraphQLObjectType({
  name: "Link",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});
let counter = 42;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      counter: {
        type: GraphQLInt,
        resolve: () => counter
      },
      message: {
        type: GraphQLString,
        resolve: () => "Hello GraphQL!"
      },
      links: {
          type: linkType,
          resolve: () => {} // TODO: Read from MongoDb
      }
    })
  }),

  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      incrementCounter: {
        type: GraphQLInt,
        resolve: () => ++counter
      }
    })
  })
});

export default schema;
