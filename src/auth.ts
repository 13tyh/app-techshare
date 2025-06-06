import {DrizzleAdapter} from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import {db} from '@/db';
import {accounts, sessions, users} from '@/db/schema';

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  providers: [Google],
});
