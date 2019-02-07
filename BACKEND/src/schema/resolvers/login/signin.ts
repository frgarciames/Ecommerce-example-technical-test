import * as bcrypt from 'bcrypt';
import { Client } from '../../../models/client';
import { handleError } from '../../../helpers/handle-error';

export const signIn = async (_, params) => {
  const { email, age, password } = params;
  const hash = bcrypt.hashSync(password, 10);
  const client = await Client.query().where('email', email);
  if(client.length > 0) {
    return handleError({
      message: `Error trying to signin`
    })
  }

  return Client.query<any>().insert({
    email,
    age,
    password: hash
  })
}