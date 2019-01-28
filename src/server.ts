import * as express from "express";
import * as bodyParser from "body-parser";
import { ApolloServer } from 'apollo-server-express';
import * as cors from "cors";
import * as jwt from 'express-jwt';
import { schema } from './schema';

export const JWT_SECRET = 'J2D5RwbFbfXxQlGYusm3NpzW0NbEf6ZC4gEMfJz0ifDtB3hh2lfyX3TI0zRrndq';

const app = express();
const PORT = 4300;

require('./database/setup');

const auth = jwt({
  secret: JWT_SECRET,
  credentialsRequired: false
})

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      user: req.user
    };
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(auth);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({
      message: err.message,
      status: err.status
    });
  }
  next();
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`App started on port: ${PORT}`);
});