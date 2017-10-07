import * as Router from 'koa-router';

import { router as netRoutes } from './routes-nets';
import { router as userRoutes } from './routes-users';

export const routesList: Router[] = [
  netRoutes,
  userRoutes
];
