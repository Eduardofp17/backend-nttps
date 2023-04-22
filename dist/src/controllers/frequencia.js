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
var Frequencia_1 = require("../models/Frequencia");
var lastFrequency_1 = require("./lastFrequency");
var LastFrequency_1 = require("../models/LastFrequency");
var FrequenciaController = /** @class */ (function () {
    function FrequenciaController() {
    }
    FrequenciaController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var frequencias, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Frequencia_1.default.findAll({ where: { school_id: req.user.School_id } })];
                    case 1:
                        frequencias = _a.sent();
                        return [2 /*return*/, res.json(frequencias)];
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
    FrequenciaController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sala, frequenciaAtt, find, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, Frequencia_1.default.findOne({
                                where: { sala: req.body.sala, school_id: req.user.School_id },
                            })];
                    case 1:
                        sala = _a.sent();
                        if (!sala)
                            return [2 /*return*/, res.status(400).json({ errors: ['A sala não existe'] })];
                        if (!req.user.School_id)
                            return [2 /*return*/, res.status(401).json("You must be associate to an school")];
                        if (req.user.School_id !== sala.school_id)
                            return [2 /*return*/, res.status(401).json("Invalid permission")];
                        req.body.school_id = req.user.School_id;
                        req.body.updated_by = "".concat(req.user.Nome, " ").concat(req.user.Sobrenome ? req.user.Sobrenome : '');
                        req.body.Date = "".concat(new Date().getFullYear(), "-").concat(new Date().getMonth() + 1, "-").concat(new Date().getDate());
                        req.body.Hour = "".concat(new Date().getHours(), ":").concat(new Date().getMinutes());
                        return [4 /*yield*/, sala.update(req.body)];
                    case 2:
                        frequenciaAtt = _a.sent();
                        return [4 /*yield*/, LastFrequency_1.default.findOne({
                                where: {
                                    sala: req.body.sala,
                                    Date: req.body.Date,
                                    school_id: req.user.School_id,
                                },
                            })];
                    case 3:
                        find = _a.sent();
                        if (!!find) return [3 /*break*/, 5];
                        return [4 /*yield*/, lastFrequency_1.default.create(req.body)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, lastFrequency_1.default.update(req.body)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, res.json(frequenciaAtt)];
                    case 8:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                errors: e_2.errors.map(function (err) { return err.message; }),
                            })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    FrequenciaController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var exist, frequencia, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!req.body)
                            return [2 /*return*/, res.status(400).json("Please, fill in the fields")];
                        if (!req.user.School_id)
                            return [2 /*return*/, res.status(401).json("You must be associate to an school")];
                        req.body.updated_by = "".concat(req.user.Nome, " ").concat(req.user.Sobrenome ? req.user.Sobrenome : '');
                        req.body.school_id = req.user.School_id;
                        return [4 /*yield*/, Frequencia_1.default.findOne({
                                where: {
                                    sala: req.body.sala,
                                    school_id: req.user.School_id,
                                },
                            })];
                    case 1:
                        exist = _a.sent();
                        if (exist)
                            return [2 /*return*/, res.status(400).json("Sala already exist")];
                        return [4 /*yield*/, Frequencia_1.default.create(req.body)];
                    case 2:
                        frequencia = _a.sent();
                        return [2 /*return*/, res.status(200).json(frequencia)];
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
    FrequenciaController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var frequencia, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!req.params.id) {
                            return [2 /*return*/, res.status(400).json({
                                    deleted: false,
                                    msg: "Missing ID",
                                })];
                        }
                        return [4 /*yield*/, Frequencia_1.default.findByPk(req.params.id)];
                    case 1:
                        frequencia = _a.sent();
                        if (!frequencia) {
                            return [2 /*return*/, res.status(400).json({
                                    deleted: false,
                                    msg: "Frequencia doesn't exist",
                                })];
                        }
                        return [4 /*yield*/, frequencia.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                deleted: true,
                                msg: "Successfully deleted",
                            })];
                    case 3:
                        e_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                errors: e_4.errors.map(function (err) { return err.message; }),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return FrequenciaController;
}());
exports.default = new FrequenciaController();
