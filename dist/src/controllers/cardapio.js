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
var Cardapios_1 = require("../models/Cardapios");
var weekNumber_1 = require("../utils/weekNumber");
var CardapioController = /** @class */ (function () {
    function CardapioController() {
    }
    CardapioController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cardapios, days, position;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Cardapios_1.default.findAll({
                            where: {
                                weeknumber: weekNumber_1.default.pegarDataAtual(),
                            },
                        })];
                    case 1:
                        cardapios = _a.sent();
                        days = [
                            'Domingo',
                            'Segunda-feira',
                            'Terça-feira',
                            'Quarta-feira',
                            'Quinta-feira',
                            'Sexta-feira',
                            'Sábado',
                        ];
                        position = function (Day) {
                            var pos = days.indexOf(Day);
                            return pos;
                        };
                        cardapios.map(function (cardapio) {
                            cardapio.position = position(cardapio.dayname);
                        });
                        cardapios.sort(function (a, b) {
                            if (a.position < b.position)
                                return -1;
                            if (a.position > b.position)
                                return 1;
                            return 0;
                        });
                        return [2 /*return*/, res.json(cardapios)];
                }
            });
        });
    };
    CardapioController.prototype.indexAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cardapios, days, position;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Cardapios_1.default.findAll({ where: { school_id: 5 } })];
                    case 1:
                        cardapios = _a.sent();
                        days = [
                            'Domingo',
                            'Segunda-feira',
                            'Terça-feira',
                            'Quarta-feira',
                            'Quinta-feira',
                            'Sexta-feira',
                            'Sábado',
                        ];
                        position = function (Day) {
                            var pos = days.indexOf(Day);
                            return pos;
                        };
                        cardapios.map(function (cardapio) {
                            cardapio.position = position(cardapio.dayname);
                        });
                        cardapios.sort(function (a, b) {
                            if (a.position < b.position)
                                return -1;
                            if (a.position > b.position)
                                return 1;
                            return 0;
                        });
                        return [2 /*return*/, res.json(cardapios)];
                }
            });
        });
    };
    CardapioController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cardapio, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!req.params.id)
                            return [2 /*return*/, res.status(400).json({ error: 'Missing ID' })];
                        return [4 /*yield*/, Cardapios_1.default.findByPk(req.params.id)];
                    case 1:
                        cardapio = _a.sent();
                        if (cardapio.school_id !== req.user.School_id)
                            return [2 /*return*/, res.status(401).json("You cannot update this cardapio")];
                        if (req.userLevel < 3)
                            return [2 /*return*/, res.status(401).json({ error: 'Permissão inválida' })];
                        return [4 /*yield*/, cardapio.update(req.body)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json({
                                updated: true,
                                theDoc: cardapio,
                            })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json("An error ocurred")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CardapioController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cardapioExist, cardapio, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!req.body.dayname)
                            return [2 /*return*/, res.status(400).json("Please fill the field with the day name")];
                        if (!req.user.School_id)
                            return [2 /*return*/, res.status(401).json("Make login, seu gaiato")];
                        if (!req.body.breakfast && !req.body.lunch && !req.body.afternoonsnack)
                            return [2 /*return*/, res.status(400).json("Please fill one of these fields: Breakfast, Lunch, Afternoonsnack")];
                        req.body.school_id = req.user.School_id;
                        if (req.body.weeknumber !== 1 && req.body.weeknumber !== 0)
                            return [2 /*return*/, res.status(400).json({ msg: "Please type the weekNumber" })];
                        return [4 /*yield*/, Cardapios_1.default.findOne({
                                where: {
                                    dayname: req.body.dayname,
                                    weeknumber: req.body.weeknumber,
                                    school_id: req.user.School_id,
                                },
                            })];
                    case 1:
                        cardapioExist = _a.sent();
                        if (cardapioExist)
                            return [2 /*return*/, res.status(400).json("Cardapio already exist, please try to update it")];
                        return [4 /*yield*/, Cardapios_1.default.create(req.body)];
                    case 2:
                        cardapio = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                msg: "Successfully created",
                                cardapio: cardapio,
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
    CardapioController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cardapio, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!req.params.id)
                            return [2 /*return*/, res.status(400).json({ error: 'Missing ID' })];
                        if (!req.user.School_id)
                            return [2 /*return*/, res.status(401).json("Make login")];
                        return [4 /*yield*/, Cardapios_1.default.findOne({
                                where: {
                                    id: req.params.id,
                                    school_id: req.user.School_id,
                                },
                            })];
                    case 1:
                        cardapio = _a.sent();
                        if (!cardapio)
                            return [2 /*return*/, res.status(400).json("Cardapio doesn't exist")];
                        return [4 /*yield*/, cardapio.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                deleted: true,
                            })];
                    case 3:
                        e_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                errors: e_3.errors.map(function (err) { return err.message; }),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CardapioController;
}());
exports.default = new CardapioController();
