import * as Router from 'koa-router';

import { router as netRoutes } from './routes-net';

export const routesList: Router[] = [
  netRoutes
];
