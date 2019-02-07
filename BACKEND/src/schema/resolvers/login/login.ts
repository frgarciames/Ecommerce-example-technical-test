import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { Client } from '../../../models/client';
import { JWT_SECRET } from '../../../server';
import { handleError } from '../../../helpers/handle-error';

export const logIn = async (_, params) => {
  const { email, password } = params;
  const client: any = await Client.query().where('email', email).first();
  if(client && bcrypt.compareSync(password, client.password)) {
    return jsonwebtoken.sign(
      { id: client.id, email: client.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    )
  }
  return handleError({
    message: `Error trying to login`
  })
}