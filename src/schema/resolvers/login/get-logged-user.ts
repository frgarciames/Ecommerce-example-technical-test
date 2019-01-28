import { Client } from '../../../models/client';

export const getClient = async (_, params, { user }) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }
  return await Client.query().findById(user.id);
}