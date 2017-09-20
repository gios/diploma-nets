import * as Koa from 'koa';

import { router as testRoutes } from './test-routes';

export const initRoutes = (app: Koa) => {
  app.use(testRoutes.routes());
  app.use(testRoutes.allowedMethods());
};
