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
var School_1 = require("../models/School");
var code_1 = require("../utils/code");
var jwtEmail_1 = require("../utils/jwtEmail");
var sendEmail_1 = require("../utils/sendEmail");
var cnpj_1 = require("../utils/cnpj");
var User_1 = require("../models/User");
var Frequencia_1 = require("../models/Frequencia");
var Cardapios_1 = require("../models/Cardapios");
var SchoolController = /** @class */ (function () {
    function SchoolController() {
    }
    SchoolController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schools, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, School_1.default.findAll({
                                attributes: ["id", "name", "email", "cnpj", "code", "accepting_accounts"],
                                include: {
                                    model: Cardapios_1.default,
                                },
                            })];
                    case 1:
                        schools = _a.sent();
                        return [2 /*return*/, res.status(200).json(schools)];
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
    SchoolController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var school, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, School_1.default.findByPk(req.user.School_id)];
                    case 1:
                        school = _a.sent();
                        return [4 /*yield*/, school.update(req.body)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                updated: true,
                                school: {
                                    id: school.id,
                                    name: school.name,
                                    cnpj: school.cnpj,
                                    code: school.code,
                                    accepting_acounts: school.accepting_acounts,
                                },
                            })];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                errors: e_2.errors.map(function (err) { return err.message; }),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SchoolController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schoolExist, isValid, school, token, link, button, textEmail, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!req.body)
                            return [2 /*return*/, 'Please fill in the fields'];
                        return [4 /*yield*/, School_1.default.findOne({ where: { email: req.body.email } })];
                    case 1:
                        schoolExist = _a.sent();
                        if (schoolExist)
                            return [2 /*return*/, res.status(422).json({ created: false, msg: "School already exist" })];
                        req.body.code = (0, code_1.default)();
                        return [4 /*yield*/, cnpj_1.default.consultCnpj(req.body.cnpj)];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid)
                            return [2 /*return*/, res.status(400).json({ created: false, msg: "Invalid Cnpj" })];
                        return [4 /*yield*/, School_1.default.create(req.body)];
                    case 3:
                        school = _a.sent();
                        return [4 /*yield*/, jwtEmail_1.default.create(school.id, school.email)];
                    case 4:
                        token = _a.sent();
                        link = "".concat(process.env.FRONTEND_URL, "/createaccount/confirmemail-school/:v1?").concat(token);
                        button = "<a href='".concat(link, "' style=\"font-family: inherit;\n      font-weight: 500;\n      font-size: 17px;\n      padding: 0.8em 1.5em 0.8em 1.2em;\n      color: white;\n     background: #185E2C;\n      border: none;\n      box-shadow: 0 0.7em 1.5em -0.5em #000;\n      letter-spacing: 0.05em;\n      border-radius: 20em; text-decoration: none;\">Verificar email</a>");
                        textEmail = "Sauda\u00E7\u00F5es, ".concat(req.body.name, ". Estamos felizes por voc\u00EAs aderirem \u00E0 nossa plataforma. Por favor, clique nesse bot\u00E3o para verificarmos seu e-mail: <br><br><br><br> ").concat(button, ".<br><br><br><br> Caso o bot\u00E3o n\u00E3o funcione, clique nesse link: ").concat(link);
                        return [4 /*yield*/, (0, sendEmail_1.default)(school.email, "Validação de email", textEmail)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                created: true,
                                msg: "Account created successfully",
                            })];
                    case 6:
                        e_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                errors: e_3.errors.map(function (err) { return err.message; }),
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SchoolController.prototype.confirmEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dados, id, email, school, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        dados = jsonwebtoken_1.default.verify(req.params.id, process.env.TOKEN_SECRET);
                        id = dados.id, email = dados.email;
                        return [4 /*yield*/, School_1.default.findByPk(id)];
                    case 1:
                        school = _a.sent();
                        if (!school)
                            return [2 /*return*/, res.status(400).json("School doesn't exist")];
                        return [4 /*yield*/, school.update({ verified: true })];
                    case 2:
                        _a.sent();
                        console.log('Verifiquei');
                        return [2 /*return*/, res.status(200).json("Email verified")];
                    case 3:
                        e_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json("Internal server error")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SchoolController;
}());
exports.default = new SchoolController();
