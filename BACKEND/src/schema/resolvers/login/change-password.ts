import { handleUserNotAuth, handleError } from './../../../helpers/handle-error';
import * as bcrypt from 'bcrypt';
import { Client } from '../../../models/client';

export const changePassword = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
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
      const clientUpdated: any = await Client.query().findById(user.id).update(clientMerged);
      if (clientUpdated === 1) {
        return Client.query().findById(user.id);
      }
      return handleError({
        message: `Error trying to change password`
      })
    } catch (err) {
      return handleError({
        message: `Error trying to change password`
      })
    }
  }
  return handleError({
    message: `Error trying to change password`
  })
}