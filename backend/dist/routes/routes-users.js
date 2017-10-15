"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var middlewares_1 = require("../users/middlewares");
exports.router = new Router();
exports.router.post('/login', middlewares_1.login);
exports.router.post('/registration', middlewares_1.registration);
//# sourceMappingURL=routes-users.js.map