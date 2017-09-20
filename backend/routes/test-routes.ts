import * as Router from 'koa-router';

export const router = new Router({
  prefix: '/test',
});

router.get('/amigo', (ctx) => {
  ctx.response.body = 'Amigo From Test Route';
});
