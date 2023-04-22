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
var Frequencia = /** @class */ (function (_super) {
    __extends(Frequencia, _super);
    function Frequencia() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Frequencia.init = function (sequelize) {
        _super.init.call(this, {
            sala: {
                type: sequelize_1.default.STRING,
            },
            qtd_presentes: {
                type: sequelize_1.default.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Envie algum valor",
                    },
                    max: {
                        args: 50,
                        msg: "A quantidade tem que ser menor ou igual a 50",
                    },
                },
            },
            updated_by: {
                type: sequelize_1.default.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Login required",
                    },
                },
            },
            Date: {
                type: sequelize_1.default.STRING,
                allowNull: false,
                defaultValue: "".concat(new Date().getFullYear(), "-").concat(new Date().getMonth() + 1, "-").concat(new Date().getDate()),
            },
            Hour: {
                type: sequelize_1.default.STRING,
                allowNull: false,
                defaultValue: "".concat(new Date().getHours(), ":").concat(new Date().getMinutes()),
            },
        }, { sequelize: sequelize, tableName: 'frequencia' });
        return this;
    };
    Frequencia.associate = function (models) {
        this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
    };
    return Frequencia;
}(sequelize_1.Model));
exports.default = Frequencia;
