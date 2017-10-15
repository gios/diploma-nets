"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var knexInstance = require("knex");
var lodash_1 = require("lodash");
var knexConfig = require("../knexfile");
var knex = knexInstance(Object.assign(knexConfig, { connection: process.env.DATABASE_URL }));
var NetService = (function () {
    function NetService() {
    }
    NetService.prototype.getNetTransitions = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, transitions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = ctx.state.user;
                        return [4, knex.select('id', 'name', 'time', 'x', 'y', 'created_at', 'updated_at').from('transitions').where('user_id', user.id)];
                    case 1:
                        transitions = _a.sent();
                        return [2, this.transformResponse(transitions)];
                }
            });
        });
    };
    NetService.prototype.getNetPinnacles = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, pinnacles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = ctx.state.user;
                        return [4, knex.select('id', 'name', 'value', 'x', 'y', 'created_at', 'updated_at').from('pinnacles').where('user_id', user.id)];
                    case 1:
                        pinnacles = _a.sent();
                        return [2, this.transformResponse(pinnacles)];
                }
            });
        });
    };
    NetService.prototype.getNetConnections = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, connections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = ctx.state.user;
                        return [4, knex.select('link_connections.id', 'link_connections.from', 'link_connections.value', 'link_connections.created_at', 'link_connections.updated_at', 'pinnacles.name as pinnacle_name', 'transitions.name as transition_name', 'pinnacles.id as pinnacle_id', 'transitions.id as transition_id')
                                .from('link_connections')
                                .where('link_connections.user_id', user.id)
                                .leftJoin('pinnacles', 'link_connections.pinnacle_id', 'pinnacles.id')
                                .leftJoin('transitions', 'link_connections.transition_id', 'transitions.id')];
                    case 1:
                        connections = _a.sent();
                        return [2, this.transformLinkConnections(this.transformResponse(connections))];
                }
            });
        });
    };
    NetService.prototype.getNetAttributes = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4, this.getNetPinnacles(ctx)];
                    case 1:
                        _a.pinnacles = _b.sent();
                        return [4, this.getNetTransitions(ctx)];
                    case 2:
                        _a.transitions = _b.sent();
                        return [4, this.getNetConnections(ctx)];
                    case 3: return [2, (_a.connections = _b.sent(),
                            _a)];
                }
            });
        });
    };
    NetService.prototype.putNetTransition = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, _a, name, time, x, y, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = ctx.params.id;
                        user = ctx.state.user;
                        _a = ctx.request.body, name = _a.name, time = _a.time, x = _a.x, y = _a.y;
                        return [4, knex('transitions')
                                .returning([
                                'id',
                                'name',
                                'time',
                                'x',
                                'y',
                                'created_at',
                                'updated_at'
                            ])
                                .where('user_id', user.id)
                                .andWhere('id', id)
                                .update({
                                name: name,
                                time: time,
                                x: x,
                                y: y,
                                updated_at: new Date()
                            })];
                    case 1:
                        response = _b.sent();
                        return [2, this.transformResponse(response, true)];
                }
            });
        });
    };
    NetService.prototype.putNetPinnacle = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, _a, name, value, x, y, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = ctx.params.id;
                        user = ctx.state.user;
                        _a = ctx.request.body, name = _a.name, value = _a.value, x = _a.x, y = _a.y;
                        return [4, knex('pinnacles')
                                .returning([
                                'id',
                                'name',
                                'value',
                                'x',
                                'y',
                                'created_at',
                                'updated_at'
                            ])
                                .where('user_id', user.id)
                                .andWhere('id', id)
                                .update({
                                name: name,
                                value: value,
                                x: x,
                                y: y,
                                updated_at: new Date()
                            })];
                    case 1:
                        response = _b.sent();
                        return [2, this.transformResponse(response, true)];
                }
            });
        });
    };
    NetService.prototype.putNetConnection = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, _a, value, connect, transitionId, pinnacleId, from, connection;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = ctx.params.id;
                        user = ctx.state.user;
                        _a = ctx.request.body, value = _a.value, connect = _a.connect;
                        from = connect[0].type === 'transition' ? 2 : 1;
                        connect.forEach(function (item) {
                            if (item.type === 'transition') {
                                transitionId = item.id;
                            }
                            else {
                                pinnacleId = item.id;
                            }
                        });
                        return [4, knex('link_connections')
                                .where('user_id', user.id)
                                .andWhere('id', id)
                                .update({
                                value: value,
                                from: from,
                                pinnacle_id: pinnacleId,
                                transition_id: transitionId,
                                updated_at: new Date()
                            })];
                    case 1:
                        _b.sent();
                        return [4, knex.select('link_connections.id', 'link_connections.from', 'link_connections.value', 'link_connections.created_at', 'link_connections.updated_at', 'pinnacles.name as pinnacle_name', 'transitions.name as transition_name', 'pinnacles.id as pinnacle_id', 'transitions.id as transition_id')
                                .from('link_connections')
                                .where('link_connections.user_id', user.id)
                                .andWhere('link_connections.id', id)
                                .leftJoin('pinnacles', 'link_connections.pinnacle_id', 'pinnacles.id')
                                .leftJoin('transitions', 'link_connections.transition_id', 'transitions.id')];
                    case 2:
                        connection = _b.sent();
                        return [2, lodash_1.first(this.transformLinkConnections(this.transformResponse(connection)))];
                }
            });
        });
    };
    NetService.prototype.postNetTransition = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, name, time, x, y, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = ctx.state.user;
                        _a = ctx.request.body, name = _a.name, time = _a.time, x = _a.x, y = _a.y;
                        return [4, knex('transitions')
                                .returning([
                                'id',
                                'name',
                                'time',
                                'x',
                                'y',
                                'created_at',
                                'updated_at'
                            ])
                                .insert({
                                name: name,
                                time: time,
                                x: x,
                                y: y,
                                user_id: user.id
                            })];
                    case 1:
                        response = _b.sent();
                        return [2, this.transformResponse(response, true)];
                }
            });
        });
    };
    NetService.prototype.postNetPinnacle = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, name, value, x, y, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = ctx.state.user;
                        _a = ctx.request.body, name = _a.name, value = _a.value, x = _a.x, y = _a.y;
                        return [4, knex('pinnacles')
                                .returning([
                                'id',
                                'name',
                                'value',
                                'x',
                                'y',
                                'created_at',
                                'updated_at'
                            ])
                                .insert({
                                name: name,
                                value: value,
                                x: x,
                                y: y,
                                user_id: user.id
                            })];
                    case 1:
                        response = _b.sent();
                        return [2, this.transformResponse(response, true)];
                }
            });
        });
    };
    NetService.prototype.postNetConnection = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, value, connect, transitionId, pinnacleId, from, linkId, connection;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = ctx.state.user;
                        _a = ctx.request.body, value = _a.value, connect = _a.connect;
                        from = connect[0].type === 'transition' ? 2 : 1;
                        connect.forEach(function (item) {
                            if (item.type === 'transition') {
                                transitionId = item.id;
                            }
                            else {
                                pinnacleId = item.id;
                            }
                        });
                        return [4, knex('link_connections')
                                .returning('id')
                                .insert({
                                value: value,
                                from: from,
                                pinnacle_id: pinnacleId,
                                transition_id: transitionId,
                                user_id: user.id
                            })];
                    case 1:
                        linkId = _b.sent();
                        return [4, knex.select('link_connections.id', 'link_connections.from', 'link_connections.value', 'link_connections.created_at', 'link_connections.updated_at', 'pinnacles.name as pinnacle_name', 'transitions.name as transition_name', 'pinnacles.id as pinnacle_id', 'transitions.id as transition_id')
                                .from('link_connections')
                                .where('link_connections.user_id', user.id)
                                .andWhere('link_connections.id', linkId[0])
                                .leftJoin('pinnacles', 'link_connections.pinnacle_id', 'pinnacles.id')
                                .leftJoin('transitions', 'link_connections.transition_id', 'transitions.id')];
                    case 2:
                        connection = _b.sent();
                        return [2, lodash_1.first(this.transformLinkConnections(this.transformResponse(connection)))];
                }
            });
        });
    };
    NetService.prototype.deleteNetTransition = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = ctx.params.id;
                        user = ctx.state.user;
                        if (!id) {
                            ctx.throw('id should be specified.', 406);
                        }
                        return [4, knex('transitions').where('id', id).andWhere('user_id', user.id).del()];
                    case 1:
                        _a.sent();
                        return [2, { message: 'Transition has deleted' }];
                }
            });
        });
    };
    NetService.prototype.deleteNetPinnacle = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = ctx.params.id;
                        user = ctx.state.user;
                        if (!id) {
                            ctx.throw('id should be specified.', 406);
                        }
                        return [4, knex('pinnacles').where('id', id).andWhere('user_id', user.id).del()];
                    case 1:
                        _a.sent();
                        return [2, { message: 'Pinnacle has deleted' }];
                }
            });
        });
    };
    NetService.prototype.deleteNetConnection = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = ctx.params.id;
                        user = ctx.state.user;
                        if (!id) {
                            ctx.throw('id should be specified.', 406);
                        }
                        return [4, knex('link_connections').where('id', id).andWhere('user_id', user.id).del()];
                    case 1:
                        _a.sent();
                        return [2, { message: 'Connection has deleted' }];
                }
            });
        });
    };
    NetService.prototype.startHistory = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = ctx.state.user;
                        return [4, knex('net_records_history')
                                .returning(['id'])
                                .insert({
                                user_id: user.id
                            })];
                    case 1:
                        response = _a.sent();
                        return [2, lodash_1.first(response)];
                }
            });
        });
    };
    NetService.prototype.postHistory = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, historyId, time, ids, values, saveObj, pinnacleNames;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = ctx.state.user;
                        _a = ctx.request.body, historyId = _a.historyId, time = _a.time, ids = _a.ids, values = _a.values;
                        saveObj = ids.map(function (id, index) {
                            return {
                                time: time,
                                pinnacle_id: id,
                                value: values[index],
                                net_record_history_id: historyId,
                                user_id: user.id
                            };
                        });
                        return [4, knex('pinnacles').select('name').whereIn('id', ids)];
                    case 1:
                        pinnacleNames = _b.sent();
                        return [4, knex('net_records').insert(saveObj)];
                    case 2:
                        _b.sent();
                        return [2, { message: pinnacleNames.map(function (item) { return item.name; }) + " state has saved" }];
                }
            });
        });
    };
    NetService.prototype.getHistory = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, historyId, pinnacleIds, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = ctx.state.user;
                        historyId = ctx.params.id;
                        pinnacleIds = ctx.request.query ? ctx.request.query.pinnacleIds : null;
                        if (!pinnacleIds) return [3, 2];
                        return [4, knex('net_records')
                                .select('net_records.id', 'pinnacles.id as pinnacle_id', 'net_records.time', 'net_records.value', 'net_records.created_at', 'net_records.updated_at', 'pinnacles.name')
                                .where('net_records.net_record_history_id', historyId)
                                .andWhere('net_records.user_id', user.id)
                                .whereIn('net_records.pinnacle_id', pinnacleIds.split(','))
                                .leftJoin('pinnacles', 'net_records.pinnacle_id', 'pinnacles.id')];
                    case 1:
                        response = _a.sent();
                        return [3, 4];
                    case 2: return [4, knex('net_records')
                            .select('net_records.id', 'pinnacles.id as pinnacle_id', 'net_records.time', 'net_records.value', 'net_records.created_at', 'net_records.updated_at', 'pinnacles.name')
                            .where('net_records.net_record_history_id', historyId)
                            .andWhere('net_records.user_id', user.id)
                            .leftJoin('pinnacles', 'net_records.pinnacle_id', 'pinnacles.id')];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4: return [2, this.transformResponse(response)];
                }
            });
        });
    };
    NetService.prototype.getHistorySessions = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = ctx.state.user;
                        return [4, knex('net_records_history')
                                .select('id', 'created_at', 'updated_at')
                                .where('user_id', user.id)];
                    case 1:
                        response = _a.sent();
                        return [2, this.transformResponse(response)];
                }
            });
        });
    };
    NetService.prototype.deleteHistory = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = ctx.state.user;
                        id = ctx.params.id;
                        if (!id) {
                            ctx.throw('id should be specified.', 406);
                        }
                        return [4, knex('net_records').where('net_record_history_id', id).andWhere('user_id', user.id).del()];
                    case 1:
                        _a.sent();
                        return [4, knex('net_records_history').where('id', id).andWhere('user_id', user.id).del()];
                    case 2:
                        _a.sent();
                        return [2, { message: 'Session has been deleted' }];
                }
            });
        });
    };
    NetService.prototype.transformResponse = function (data, single) {
        if (single === void 0) { single = false; }
        var transformed = data.map(function (item) { return lodash_1.mapKeys(item, function (_, key) { return lodash_1.camelCase(key); }); });
        if (single) {
            return lodash_1.first(transformed);
        }
        else {
            return transformed;
        }
    };
    NetService.prototype.transformLinkConnections = function (data) {
        return data.map(function (item) {
            if (item.from - 1) {
                item.connect = [
                    { type: 'transition', name: item.transitionName, id: item.transitionId },
                    { type: 'pinnacle', name: item.pinnacleName, id: item.pinnacleId }
                ];
            }
            else {
                item.connect = [
                    { type: 'pinnacle', name: item.pinnacleName, id: item.pinnacleId },
                    { type: 'transition', name: item.transitionName, id: item.transitionId }
                ];
            }
            delete item.pinnacleName;
            delete item.transitionName;
            delete item.pinnacleId;
            delete item.transitionId;
            delete item.from;
            return item;
        });
    };
    return NetService;
}());
exports.NetService = NetService;
//# sourceMappingURL=service.js.map