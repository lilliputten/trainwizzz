// This file should only be used in server components
'use server';

import { cache } from 'react';

import { auth } from '@/auth';
import { checkIfUserExists } from '@/features/users/actions/checkIfUserExists';
import { TOptionalExtendedUser } from '@/features/users/types/TUser';

/** Server: Get user data from auth data.
 * Use `useSessionUser` fro client components.
 */
export const getCurrentUser = cache<() => Promise<TOptionalExtendedUser>>(async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return undefined;
  }
  const userId = user.id;
  // TODO: Check also if the user really exists in the database>
  const isValidUser = !!userId && (await checkIfUserExists(userId));
  if (!isValidUser) {
    return undefined;
  }
  return user;
});
