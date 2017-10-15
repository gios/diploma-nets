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
var crypto = require("crypto");
var winston = require("winston");
var jwt = require("jsonwebtoken");
var knexConfig = require("../knexfile");
var knex = knexInstance(Object.assign(knexConfig, { connection: process.env.DATABASE_URL }));
var cipherType = 'aes-256-cbc';
var saltWord = 'salt';
var SHARED_SECRET = 'nets';
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.login = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, foundUserPassword, isCorrectPassword, foundUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, username = _a.username, password = _a.password;
                        return [4, knex('users')
                                .where('username', username)
                                .first('id', 'password')];
                    case 1:
                        foundUserPassword = _b.sent();
                        if (!foundUserPassword) {
                            ctx.throw('User is not found', 404);
                        }
                        isCorrectPassword = (this.encryptoPassword(foundUserPassword.password) === password ? true : false);
                        if (!isCorrectPassword) {
                            ctx.throw('Password is not correct', 404);
                        }
                        return [4, knex('users')
                                .where('id', foundUserPassword.id)
                                .first('username', 'id')];
                    case 2:
                        foundUser = _b.sent();
                        return [2, jwt.sign({ id: foundUser.id, username: foundUser.username }, SHARED_SECRET, { expiresIn: '10h' })];
                }
            });
        });
    };
    UserService.prototype.registration = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, passwordHash, usernameExist, userId, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, username = _a.username, password = _a.password;
                        passwordHash = this.cryptoPassword(password);
                        return [4, knex('users').first('id').where('username', username)];
                    case 1:
                        usernameExist = _b.sent();
                        if (usernameExist) {
                            ctx.throw('Username should be unique', 409);
                        }
                        return [4, knex('users')
                                .returning('id')
                                .insert({
                                username: username,
                                password: passwordHash,
                                created_at: new Date(),
                                updated_at: new Date()
                            })];
                    case 2:
                        userId = _b.sent();
                        return [4, knex('users')
                                .where('id', userId[0])
                                .first('username', 'id')];
                    case 3:
                        user = _b.sent();
                        return [2, jwt.sign({ id: user.id, username: user.username }, SHARED_SECRET, { expiresIn: '10h' })];
                }
            });
        });
    };
    UserService.prototype.cryptoPassword = function (password) {
        var cipher = crypto.createCipher(cipherType, saltWord);
        cipher.update(password);
        try {
            return cipher.final('hex');
        }
        catch (error) {
            winston.error(error);
            return;
        }
    };
    UserService.prototype.encryptoPassword = function (hash) {
        var decipher = crypto.createDecipher(cipherType, saltWord);
        decipher.update(hash, 'hex');
        try {
            return decipher.final('utf8');
        }
        catch (error) {
            winston.error(error);
            return;
        }
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=service.js.map