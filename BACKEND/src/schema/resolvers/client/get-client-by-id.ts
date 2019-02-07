import { handleUserNotAuth } from './../../../helpers/handle-error';
import { Client } from '../../../models/client';

export const getClient = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }
  const { id } = params

  return await Client.query().findById(id);
}