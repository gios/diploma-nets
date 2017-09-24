"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
exports.router = new Router({
    prefix: '/test',
});
exports.router.get('/amigo', function (ctx) {
    ctx.response.body = 'Amigo From Test Route';
});
//# sourceMappingURL=test-routes.js.map