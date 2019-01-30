import Api from './api';

const api = new Api();
const baseUri = 'http://localhost:4300/graphql';

const headers = {
  'Content-Type': 'application/json',
}

export const graphqlRequestWithToken = ({ query, token }) => {
  return api.post(baseUri, { body: query, headers: { ...headers, 'authorization': `Bearer ${token}` } })
};

export const graphqlRequestWithNoToken = ({ query }) => {
  return api.post(baseUri, { body: { query }, headers })
}