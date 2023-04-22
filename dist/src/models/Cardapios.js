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
var Cardapios = /** @class */ (function (_super) {
    __extends(Cardapios, _super);
    function Cardapios() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cardapios.init = function (sequelize) {
        _super.init.call(this, {
            dayname: {
                type: sequelize_1.default.STRING,
                allowNull: false,
                defaultValue: ' ',
                validate: {
                    len: {
                        args: [5, 20],
                        msg: "The name of the day must be between 5 and 20 characters long",
                    },
                },
            },
            breakfast: {
                type: sequelize_1.default.STRING,
                allowNull: true,
            },
            lunch: {
                type: sequelize_1.default.STRING,
                allowNull: true,
            },
            afternoonsnack: {
                type: sequelize_1.default.STRING,
                allowNull: true,
            },
            weeknumber: {
                type: sequelize_1.default.INTEGER,
                allowNull: false,
                defaultValue: ' ',
                validate: {
                    max: {
                        args: 2,
                        msg: "The weeknumber can be only 0 or 1",
                    },
                },
            },
            school_id: {
                type: sequelize_1.default.INTEGER,
                allowNull: false,
                defaultValue: ' ',
                validate: {
                    notEmpty: {
                        msg: "A cardapio must be associated with a school",
                    },
                },
            },
        }, { sequelize: sequelize, tableName: 'cardapios' });
        return this;
    };
    Cardapios.associate = function (models) {
        this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
    };
    return Cardapios;
}(sequelize_1.Model));
exports.default = Cardapios;
