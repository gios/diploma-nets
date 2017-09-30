import * as Router from 'koa-router';

export const router = new Router({
  prefix: '/nets',
});

router.get('/', (ctx) => {
  ctx.response.body = 'Get Nets';
});
