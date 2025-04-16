import {Hono} from 'hono';

import {sessionMiddleware} from '@/lib/session-middleware';

const app = new Hono().get('/current', sessionMiddleware, async (c) => {
  const session = c.get('session');
  return c.json({data: session.user});
});

export default app;
