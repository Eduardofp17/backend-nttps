"use strict";"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var sequelize_1 = require("sequelize");
var bcryptjs_1 = require("bcryptjs");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.init = function (sequelize) {
        var _this = this;
        _super.init.call(this, {
            nome: {
                type: sequelize_1.default.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 33],
                        msg: "Seu nome deve ter entre 3 e 33 caracteres",
                    },
                },
            },
            sobrenome: {
                type: sequelize_1.default.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 100],
                        msg: "Seu sobrenome deve ter entre 3 e 100 caracteres",
                    },
                },
            },
            email: {
                type: sequelize_1.default.STRING,
                defaultValue: '',
                unique: {
                    msg: 'Email já existe',
                },
                validate: {
                    isEmail: {
                        msg: "Você deve mandar um email válido",
                    },
                },
            },
            level: {
                type: sequelize_1.default.INTEGER,
                defaultValue: 0,
            },
            school_id: {
                type: sequelize_1.default.INTEGER,
                allowNull: false,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: "A user must be associated with a school",
                    },
                },
            },
            password_hash: {
                type: sequelize_1.default.STRING,
                defaultValue: '',
            },
            password: {
                type: sequelize_1.default.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 26],
                        msg: "Sua senha deve conter de 6 à 26 caracteres",
                    },
                },
            },
        }, { sequelize: sequelize });
        this.addHook('beforeSave', function (user) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!user.password) return [3 /*break*/, 2];
                        _a = user;
                        return [4 /*yield*/, bcryptjs_1.default.hash(user.password, 8)];
                    case 1:
                        _a.password_hash = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        return this;
    };
    User.prototype.passwordValid = function (password) {
        return bcryptjs_1.default.compare(password, this.password_hash);
    };
    User.associate = function (models) {
        this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
    };
    return User;
}(sequelize_1.Model));
exports.default = User;
