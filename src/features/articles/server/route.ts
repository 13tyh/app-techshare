import {Hono} from 'hono';

import {zValidator} from '@hono/zod-validator';
import {eq} from 'drizzle-orm';

import {db} from '@/db';
import {articles} from '@/db/schema';
import {updateArticleSchema} from '@/features/articles/schemes';
import {sessionMiddleware} from '@/lib/session-middleware';

const app = new Hono()
  // 記事取得API
  .get('/:article_id', sessionMiddleware, async (c) => {
    const articleId = c.req.param('article_id');

    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId));

    if (!article) {
      return c.json({message: '記事が見つかりません : ' + articleId}, 404);
    }

    return c.json({data: article});
  })

  // 記事作成API
  .post('/', sessionMiddleware, async (c) => {
    const session = c.get('session');

    const [article] = await db
      .insert(articles)
      .values({
        authorId: session.user?.id!,
      })
      .returning();

    return c.json({data: article});
  })

  // 記事編集API
  .patch(
    '/:article_id',
    sessionMiddleware,
    zValidator('json', updateArticleSchema),
    async (c) => {
      const session = c.get('session');
      const articleId = c.req.param('article_id');
      const {title, content, icon} = c.req.valid('json');

      const [article] = await db
        .select()
        .from(articles)
        .where(eq(articles.id, articleId));

      if (!article) {
        return c.json({message: '記事が見つかりません : ' + articleId}, 404);
      }

      if (article.authorId !== session.user?.id) {
        return c.json({message: '記事の編集権限がありません' + articleId}, 403);
      }

      const [updatedArticle] = await db
        .update(articles)
        .set({title, content, icon, updatedAt: new Date()})
        .where(eq(articles.id, articleId))
        .returning();

      return c.json({data: updatedArticle});
    },
  );

export default app;
