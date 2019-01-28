import * as bcrypt from 'bcrypt';
import { Client } from '../../../models/client';

export const signIn = async (_, params) => {
  const { email, age, password } = params;
  const hash = bcrypt.hashSync(password, 10);
  const client = await Client.query().where('email', email);
  if(client.length > 0) throw new Error('Email is already exists');

  return Client.query<any>().insert({
    email,
    age,
    password: hash
  })
}