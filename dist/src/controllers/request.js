"use strict";"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var jsonwebtoken_1 = require("jsonwebtoken");
var Request_1 = require("../models/Request");
var School_1 = require("../models/School");
var User_1 = require("../models/User");
var jwtEmail_1 = require("../utils/jwtEmail");
var sendEmail_1 = require("../utils/sendEmail");
var UserAccept_1 = require("../models/UserAccept");
var RequestsController = /** @class */ (function () {
    function RequestsController() {
    }
    RequestsController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var requests, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Request_1.default.findAll({ where: { school_id: req.user.School_id } }, { attributes: ['id'] })];
                    case 1:
                        requests = _a.sent();
                        return [2 /*return*/, res.status(200).json(requests)];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                errors: e_1.errors.map(function (err) { return err.message; }),
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestsController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var school, hasRequest, userExist, request, token, link, button, textEmail, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!req.body.code)
                            return [2 /*return*/, res.status(400).json({ created: false, msg: "Please fill the field with an code" })];
                        return [4 /*yield*/, School_1.default.findOne({ where: { code: req.body.code } })];
                    case 1:
                        school = _a.sent();
                        if (!school)
                            return [2 /*return*/, res.status(400).json({ created: false, msg: "School don't exist" })];
                        if (req.body.email === school.email)
                            return [2 /*return*/, res.status(400).json({ created: false, msg: "Invalid email or password" })];
                        if (school.accepting_accounts < 1)
                            return [2 /*return*/, res.status(422).json({ created: false, msg: "School is not accepting new accounts" })];
                        return [4 /*yield*/, Request_1.default.findOne({ where: { email: req.body.email } })];
                    case 2:
                        hasRequest = _a.sent();
                        if (hasRequest)
                            return [2 /*return*/, res.status(400).json({ craeted: false, msg: "Request already exist" })];
                        return [4 /*yield*/, User_1.default.findOne({ where: { email: req.body.email } })];
                    case 3:
                        userExist = _a.sent();
                        if (userExist)
                            return [2 /*return*/, res.status(400).json({ created: false, msg: "User already exist" })];
                        req.body.school_id = school.id;
                        req.body.status = "Pending";
                        return [4 /*yield*/, Request_1.default.create(req.body)];
                    case 4:
                        request = _a.sent();
                        if (!request)
                            return [2 /*return*/, res.status(500).json({ created: false, msg: "An error ocurred" })];
                        return [4 /*yield*/, jwtEmail_1.default.create(request.id, request.email)];
                    case 5:
                        token = _a.sent();
                        link = "".concat(process.env.FRONTEND_URL, "/createaccount/confirmemail/:v1?").concat(token);
                        button = "<a href='".concat(link, "' style=\"font-family: inherit;\n      font-weight: 500;\n      font-size: 17px;\n      padding: 0.8em 1.5em 0.8em 1.2em;\n      color: white;\n     background: #185E2C;\n      border: none;\n      box-shadow: 0 0.7em 1.5em -0.5em #000;\n      letter-spacing: 0.05em;\n      border-radius: 20em; text-decoration: none;\">Verificar email</a>");
                        textEmail = "<h2> Sauda\u00E7\u00F5es, ".concat(req.body.nome, ". Sua solicita\u00E7\u00E3o foi enviada com sucesso, mas antes, por favor, clique nesse bot\u00E3o para verificarmos seu e-mail: </h2><br><br> ").concat(button, ".<br><br><br><br> Caso o bot\u00E3o n\u00E3o funcione, clique nesse link: ").concat(link);
                        return [4 /*yield*/, (0, sendEmail_1.default)(request.email, "Validação de email", textEmail)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ created: true, msg: "Request sent successfully" })];
                    case 7:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                errors: e_2.errors.map(function (err) { return err.message; }),
                            })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    RequestsController.prototype.confirmEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dados, id, email, request, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        dados = jsonwebtoken_1.default.verify(req.params.id, process.env.TOKEN_SECRET);
                        id = dados.id, email = dados.email;
                        return [4 /*yield*/, Request_1.default.findByPk(id)];
                    case 1:
                        request = _a.sent();
                        if (!request)
                            return [2 /*return*/, res.status(400).json("Request doesn't exist")];
                        return [4 /*yield*/, request.update({ verified: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json("Email verified")];
                    case 3:
                        e_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json("Internal server error")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RequestsController.prototype.acceptRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var request, newUser, school, link, button, text, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, Request_1.default.findOne({ where: { email: req.body.email } })];
                    case 1:
                        request = _a.sent();
                        if (!request)
                            return [2 /*return*/, res.status(400).json("Request doesn't exist")];
                        if (request.status !== 'Pending')
                            return [2 /*return*/, res.status(500).json("Internal server error")];
                        if (request.verified !== true)
                            return [2 /*return*/, res.status(422).json("The user have to confirm your email")];
                        req.status = "Allowed";
                        if (req.user.Level < 3)
                            return [2 /*return*/, res.status(401).json("Unauthorized")];
                        return [4 /*yield*/, UserAccept_1.default.create({
                                nome: request.nome,
                                sobrenome: request.sobrenome,
                                email: request.email,
                                password_hash: request.password_hash,
                                school_id: request.school_id,
                            })];
                    case 2:
                        newUser = _a.sent();
                        if (!newUser)
                            return [2 /*return*/, res.status(500).json("An error ocurred")];
                        return [4 /*yield*/, request.destroy()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, School_1.default.findByPk(newUser.school_id)];
                    case 4:
                        school = _a.sent();
                        if (!school)
                            return [2 /*return*/, res.status(422).json("School doesn't exist")];
                        link = "".concat(process.env.FRONTEND_URL, "/login/");
                        button = "<a href='".concat(link, "' style=\"font-family: inherit;\n      font-weight: 500;\n      font-size: 17px;\n      padding: 0.8em 1.5em 0.8em 1.2em;\n      color: white;\n     background: #185E2C;\n      border: none;\n      box-shadow: 0 0.7em 1.5em -0.5em #000;\n      letter-spacing: 0.05em;\n      border-radius: 20em; text-decoration: none;\">Fa\u00E7a login aqui</a>");
                        text = "<h2> Ol\u00E1 ".concat(newUser.nome, " seu pedido para fazer parte da institui\u00E7\u00E3o ").concat(school.name, " foi aceito com sucesso.  Fa\u00E7a login clicando aqui: </h2> <br> <br> ").concat(button, " ");
                        return [4 /*yield*/, (0, sendEmail_1.default)(req.body.email, "Registro em nossa plataforma", text)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json("Created account")];
                    case 6:
                        e_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json("Internal server error")];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    RequestsController.prototype.rejectRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var request, school, text, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Request_1.default.findOne({ where: { email: req.body.email } })];
                    case 1:
                        request = _a.sent();
                        if (!request)
                            return [2 /*return*/, res.status(400).json("Request doesn't exist")];
                        if (request.status !== 'Pending')
                            return [2 /*return*/, res.status(500).json("Internal server error")];
                        req.status = "Rejected";
                        if (req.user.Level < 3)
                            return [2 /*return*/, res.status(401).json("Unauthorized")];
                        return [4 /*yield*/, request.destroy()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, School_1.default.findByPk(request.school_id)];
                    case 3:
                        school = _a.sent();
                        if (!school)
                            return [2 /*return*/, res.status(422).json("School doesn't exist")];
                        text = "<h2> Ol\u00E1, ".concat(request.nome, ". Seu pedido para fazer parte da institui\u00E7\u00E3o ").concat(school.name, " foi rejeitado. </h2>");
                        return [4 /*yield*/, (0, sendEmail_1.default)(req.body.email, "Adesão de conta", text)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json("Rejected request")];
                    case 5:
                        e_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json("Internal server error")];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return RequestsController;
}());
exports.default = new RequestsController();
