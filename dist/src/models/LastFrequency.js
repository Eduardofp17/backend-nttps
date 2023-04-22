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
var FrequenciasHistoric = /** @class */ (function (_super) {
    __extends(FrequenciasHistoric, _super);
    function FrequenciasHistoric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrequenciasHistoric.init = function (sequelize) {
        _super.init.call(this, {
            sala: {
                type: sequelize_1.default.STRING,
            },
            breakfast: {
                type: sequelize_1.default.INTEGER,
            },
            lunch: {
                type: sequelize_1.default.INTEGER,
            },
            afternoonsnack: {
                type: sequelize_1.default.INTEGER,
            },
            updated_by: {
                type: sequelize_1.default.STRING,
            },
            Date: {
                type: sequelize_1.default.STRING,
                defaultValue: '',
            },
            Hour: {
                type: sequelize_1.default.STRING,
                defaultValue: '',
            },
            school_id: {
                type: sequelize_1.default.INTEGER,
                allowNull: false,
                defaultValue: ' ',
            },
        }, { sequelize: sequelize });
        return this;
    };
    FrequenciasHistoric.associate = function (models) {
        this.belongsTo(models.SchoolModel, { foreignKey: 'school_id' });
    };
    return FrequenciasHistoric;
}(sequelize_1.Model));
exports.default = FrequenciasHistoric;
