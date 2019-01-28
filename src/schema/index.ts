import { makeExecutableSchema } from 'graphql-tools' ;
import { importSchema } from 'graphql-import';

import { resolvers } from './resolvers';

const typeDefs = importSchema(`${__dirname}/schema.graphql`)

export const schema = makeExecutableSchema({ typeDefs, resolvers })