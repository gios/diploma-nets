import * as Koa from 'koa';

import { routesList } from './routes';

export const initRoutes = (app: Koa) => {
  routesList.forEach((router) => {
    router.prefix('/api');
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};
