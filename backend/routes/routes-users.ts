import * as Router from 'koa-router';

import {
  login, registration
} from '../users/middlewares';

export const router = new Router();

router.post('/login', login);
router.post('/registration', registration);
