import { AuthDataValidator, objectToAuthDataMap } from '@telegram-auth/server';
import CredentialsProvider from 'next-auth/providers/credentials';

import { envServer } from '@/env/envServer';
import { getErrorText } from '@/lib/helpers/strings';
import { createUserOrUpdateTelegramUser } from '@/features/users/actions/';

export const telegramProvider = CredentialsProvider({
  id: 'telegram-auth',
  name: 'Telegram Login',
  credentials: {},
  async authorize(_credentials, req) {
    const validator = new AuthDataValidator({
      botToken: `${envServer.BOT_TOKEN}`,
    });
    const queryStr = req.url.split('?').pop();
    const sp = new URLSearchParams(queryStr);
    const queryParams = Object.fromEntries(sp);
    const data = objectToAuthDataMap(queryParams);

    const user = await validator.validate(data);

    const isOk = user.id && user.first_name;

    if (isOk) {
      const returned = {
        id: user.id.toString(),
        email: user.id.toString(),
        name: [user.first_name, user.last_name || ''].join(' '),
        image: user.photo_url,
      };
      try {
        await createUserOrUpdateTelegramUser(user);
        // TODO: Create account?
      } catch (error) {
        const description = getErrorText(error);
        const title = 'Something went wrong while creating the user.';
        // eslint-disable-next-line no-console
        console.error(title, {
          error,
          description,
        });
        debugger; // eslint-disable-line no-debugger
      }
      return returned;
    }
    return null;
  },
});
