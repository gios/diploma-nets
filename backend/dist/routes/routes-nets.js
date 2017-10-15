"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var middlewares_1 = require("../nets/middlewares");
exports.router = new Router({
    prefix: '/net',
});
exports.router.get('/', middlewares_1.getNet);
exports.router.get('/connections', middlewares_1.getNetConnections);
exports.router.get('/transitions', middlewares_1.getNetTransitions);
exports.router.get('/pinnacles', middlewares_1.getNetPinnacles);
exports.router.put('/connection/:id', middlewares_1.putNetConnection);
exports.router.put('/transition/:id', middlewares_1.putNetTransition);
exports.router.put('/pinnacle/:id', middlewares_1.putNetPinnacle);
exports.router.post('/connection', middlewares_1.postNetConnection);
exports.router.post('/transition', middlewares_1.postNetTransition);
exports.router.post('/pinnacle', middlewares_1.postNetPinnacle);
exports.router.del('/connection/:id', middlewares_1.deleteNetConnection);
exports.router.del('/transition/:id', middlewares_1.deleteNetTransition);
exports.router.del('/pinnacle/:id', middlewares_1.deleteNetPinnacle);
exports.router.post('/history-start', middlewares_1.startHistory);
exports.router.post('/history', middlewares_1.postHistory);
exports.router.get('/history/:id', middlewares_1.getHistory);
exports.router.del('/history/:id', middlewares_1.deleteHistory);
exports.router.get('/history-sessions', middlewares_1.getHistorySessions);
//# sourceMappingURL=routes-nets.js.map