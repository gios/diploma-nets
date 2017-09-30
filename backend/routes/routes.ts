import * as Router from 'koa-router';

import { router as netRoutes } from './routes-nets';

export const routesList: Router[] = [
  netRoutes
];
