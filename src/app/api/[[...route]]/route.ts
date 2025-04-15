import {Hono} from 'hono';
import {logger} from 'hono/logger';
import {handle} from 'hono/vercel';

const app = new Hono();

app.use('*', logger());

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
