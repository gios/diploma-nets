"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_routes_1 = require("./test-routes");
exports.initRoutes = function (app) {
    app.use(test_routes_1.router.routes());
    app.use(test_routes_1.router.allowedMethods());
};
//# sourceMappingURL=routes-init.js.map