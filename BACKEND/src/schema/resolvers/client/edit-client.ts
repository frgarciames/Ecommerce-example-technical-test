import { Client } from '../../../models/client';
import { handleUserNotAuth, handleError } from '../../../helpers/handle-error';

export const editClient = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }
  const { age, email } = params;
  const clientWithEmail: any = await Client.query().where('email', email).first();
  if (clientWithEmail && clientWithEmail.email !== user.email) {
    return handleError({
      message: `You have no permission`
    })
  }

  const client = await Client.query().findById(user.id).first();
  const clientMerged: any = { ...client, age, email }

  try {
    const clientUpdated: any = await Client.query().findById(user.id).update(clientMerged);
    if (clientUpdated === 1) {
      return Client.query().findById(user.id)
    }
    return handleError({
      message: `Error trying to edit client`
    })
  } catch (err) {
    return handleError({
      message: `Error trying to edit client`
    })
  }
}