"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("./routes");
exports.initRoutes = function (app) {
    routes_1.routesList.forEach(function (router) {
        router.prefix('/api');
        app.use(router.routes());
        app.use(router.allowedMethods());
    });
};
//# sourceMappingURL=routes-init.js.map