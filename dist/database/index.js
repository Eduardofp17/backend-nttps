"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Cardapios = require('../models/Cardapios'); var _Cardapios2 = _interopRequireDefault(_Cardapios);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Frequencia = require('../models/Frequencia'); var _Frequencia2 = _interopRequireDefault(_Frequencia);
var _LastFrequency = require('../models/LastFrequency'); var _LastFrequency2 = _interopRequireDefault(_LastFrequency);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);
var _Request = require('../models/Request'); var _Request2 = _interopRequireDefault(_Request);
var _UserAccept = require('../models/UserAccept'); var _UserAccept2 = _interopRequireDefault(_UserAccept);

const models = [_Cardapios2.default, _User2.default, _Frequencia2.default, _LastFrequency2.default, _School2.default, _Request2.default, _UserAccept2.default];
const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
