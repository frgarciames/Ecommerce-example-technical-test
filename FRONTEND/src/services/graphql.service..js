import Api from './api';
import { getCookie } from '../helpers/cookie';

const api = new Api();
const baseUri = 'http://localhost:4300/graphql';

const headers = {
  'Content-Type': 'application/json',
}

export const graphqlRequestWithToken = async ({ query }) => {
  return (await api.post(baseUri, { body: { query }, headers: { ...headers, 'authorization': `Bearer ${getCookie('token')}` } })).data
};

export const graphqlRequestWithNoToken = async ({ query }) => {
  return (await api.post(baseUri, { body: { query }, headers })).data
}