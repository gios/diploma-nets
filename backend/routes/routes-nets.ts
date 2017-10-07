import * as Router from 'koa-router';

import {
  getNet, getNetPinnacles, getNetTransitions, getNetConnections,
  putNetConnection, putNetPinnacle, putNetTransition
} from '../nets/middlewares';

export const router = new Router({
  prefix: '/net',
});

router.get('/', getNet);
router.get('/connections', getNetConnections);
router.get('/transitions', getNetTransitions);
router.get('/pinnacles', getNetPinnacles);

router.put('/connection', putNetConnection);
router.put('/transition', putNetTransition);
router.put('/pinnacle', putNetPinnacle);
