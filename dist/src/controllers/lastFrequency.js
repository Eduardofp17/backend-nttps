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
var LastFrequency_1 = require("../models/LastFrequency");
var LastFrequencyController = /** @class */ (function () {
    function LastFrequencyController() {
    }
    LastFrequencyController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var frequencias, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, LastFrequency_1.default.findAll({ where: { school_id: req.user.School_id } })];
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
    LastFrequencyController.prototype.create = function (frequencia) {
        return __awaiter(this, void 0, void 0, function () {
            var body, body, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(frequencia.Hour >= '07:00' && frequencia.Hour <= '09:30')) return [3 /*break*/, 2];
                        body = {
                            sala: frequencia.sala,
                            breakfast: frequencia.qtdPresentes,
                            updated_by: frequencia.updated_by,
                            Date: frequencia.Date,
                            Hour: frequencia.Hour,
                            school_id: frequencia.school_id,
                        };
                        return [4 /*yield*/, LastFrequency_1.default.create(body)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(frequencia.Hour >= '09:50' && frequencia.Hour <= '11:30')) return [3 /*break*/, 4];
                        body = {
                            sala: frequencia.sala,
                            lunch: frequencia.qtdPresentes,
                            updated_by: frequencia.updated_by,
                            Date: frequencia.Date,
                            Hour: frequencia.Hour,
                            school_id: frequencia.school_id,
                        };
                        return [4 /*yield*/, LastFrequency_1.default.create(body)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(frequencia.Hour >= '13:00' && frequencia.Hour <= '14:40')) return [3 /*break*/, 6];
                        body = {
                            sala: frequencia.sala,
                            afternoonsnack: frequencia.qtdPresentes,
                            updated_by: frequencia.updated_by,
                            Date: frequencia.Date,
                            Hour: frequencia.Hour,
                            school_id: frequencia.school_id,
                        };
                        return [4 /*yield*/, LastFrequency_1.default.create(body)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, 'Is not a valid turn'];
                }
            });
        });
    };
    LastFrequencyController.prototype.update = function (frequencia) {
        return __awaiter(this, void 0, void 0, function () {
            var frequenciasHistoric, body, body, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LastFrequency_1.default.findOne({
                            where: {
                                sala: frequencia.sala,
                                Date: frequencia.Date,
                                school_id: frequencia.school_id,
                            },
                        })];
                    case 1:
                        frequenciasHistoric = _a.sent();
                        if (!(frequencia.Hour >= '07:00' && frequencia.Hour <= '09:30')) return [3 /*break*/, 3];
                        body = {
                            sala: frequencia.sala,
                            breakfast: frequencia.qtdPresentes,
                            updated_by: frequencia.updated_by,
                            Date: frequencia.Date,
                            Hour: frequencia.Hour,
                            school_id: frequencia.school_id,
                        };
                        return [4 /*yield*/, frequenciasHistoric.update(body)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(frequencia.Hour >= '09:50' && frequencia.Hour <= '11:30')) return [3 /*break*/, 5];
                        body = {
                            sala: frequencia.sala,
                            lunch: frequencia.qtdPresentes,
                            updated_by: frequencia.updated_by,
                            Date: frequencia.Date,
                            Hour: frequencia.Hour,
                            school_id: frequencia.school_id,
                        };
                        return [4 /*yield*/, frequenciasHistoric.update(body)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(frequencia.Hour >= '13:00' && frequencia.Hour <= '14:40')) return [3 /*break*/, 7];
                        body = {
                            sala: frequencia.sala,
                            afternoonsnack: frequencia.qtdPresentes,
                            updated_by: frequencia.updated_by,
                            Date: frequencia.Date,
                            Hour: frequencia.Hour,
                            school_id: frequencia.school_id,
                        };
                        return [4 /*yield*/, frequenciasHistoric.update(body)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, 'Is not a valid turn'];
                }
            });
        });
    };
    return LastFrequencyController;
}());
exports.default = new LastFrequencyController();
