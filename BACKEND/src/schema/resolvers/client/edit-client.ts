import { Client } from '../../../models/client';

export const editClient = async (_, params, { user }) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }
  const { age, email } = params;
  const clientWithEmail: any = await Client.query().where('email', email).first();
  if (clientWithEmail && clientWithEmail.email !== user.email) {
    throw new Error('Email already exist');
  }

  const client = await Client.query().findById(user.id).first();
  const clientMerged: any = { ...client, age, email }

  try {
    const clientUpdated: any = await Client.query().where('id', user.id).update(clientMerged);
    if (clientUpdated === 1) {
      return Client.query().findById(user.id)
    }
    throw new Error(`Error trying to update user with id: ${user.id}`);
  } catch (err) {
    throw new Error(`Error trying to update user with id: ${user.id}`);
  }
}