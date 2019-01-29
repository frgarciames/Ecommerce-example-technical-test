import * as bcrypt from 'bcrypt';
import { Client } from '../../../models/client';

export const changePassword = async (_, params, { user }) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }
  const { newPassword, lastPassword } = params;
  const hash = bcrypt.hashSync(newPassword, 10);
  const client: any = await Client.query().findById(user.id).first();
  if (client && bcrypt.compareSync(lastPassword, client.password)) {
    if (newPassword === lastPassword) {
      return client;
    }
    const clientMerged: any = { ...client, password: hash }
    try {
      const clientUpdated: any = await Client.query().where('id', user.id).update(clientMerged);
      if (clientUpdated === 1) {
        return Client.query().findById(user.id);
      }
      throw new Error(`Error trying to change password user with id: ${user.id}`);
    } catch (err) {
      throw new Error(`Error trying to change password user with id: ${user.id}`);
    }
  }
  throw new Error(`Error. Last password invalid for user whit id: ${user.id}`);
}