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
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var bcryptjs_1 = require("bcryptjs");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.init = function (sequelize) {
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
        }, { sequelize: sequelize, tableName: 'users' });
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
