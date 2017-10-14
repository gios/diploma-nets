import * as Router from 'koa-router';

import {
  getNet, getNetPinnacles, getNetTransitions, getNetConnections,
  putNetConnection, putNetPinnacle, putNetTransition,
  postNetConnection, postNetTransition, postNetPinnacle,
  deleteNetConnection, deleteNetTransition, deleteNetPinnacle,
  startHistory, postHistory, getHistory, getHistorySessions
} from '../nets/middlewares';

export const router = new Router({
  prefix: '/net',
});

router.get('/', getNet);
router.get('/connections', getNetConnections);
router.get('/transitions', getNetTransitions);
router.get('/pinnacles', getNetPinnacles);

router.put('/connection/:id', putNetConnection);
router.put('/transition/:id', putNetTransition);
router.put('/pinnacle/:id', putNetPinnacle);

router.post('/connection', postNetConnection);
router.post('/transition', postNetTransition);
router.post('/pinnacle', postNetPinnacle);

router.del('/connection/:id', deleteNetConnection);
router.del('/transition/:id', deleteNetTransition);
router.del('/pinnacle/:id', deleteNetPinnacle);

router.post('/history-start', startHistory);
router.post('/history', postHistory);
router.get('/history/:id', getHistory);
router.get('/history-sessions', getHistorySessions);
