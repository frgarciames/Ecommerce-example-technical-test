import { handleUserNotAuth } from './../../../helpers/handle-error';
import { Client } from '../../../models/client';

export const getLoggedUser = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }
  return await Client.query().findById(user.id);
}