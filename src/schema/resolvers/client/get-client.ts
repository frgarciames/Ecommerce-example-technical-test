import { Client } from '../../../models/client';

export const getClient = async (_, params, { user }) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }
  const { id } = params

  return await Client.query().findById(id);
}