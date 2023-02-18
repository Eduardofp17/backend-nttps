"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _frequencia = require('../controllers/frequencia'); var _frequencia2 = _interopRequireDefault(_frequencia);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _lastFrequency = require('../controllers/lastFrequency'); var _lastFrequency2 = _interopRequireDefault(_lastFrequency);
var _leaderRequired = require('../middlewares/leaderRequired'); var _leaderRequired2 = _interopRequireDefault(_leaderRequired);
var _employeeRequired = require('../middlewares/employeeRequired'); var _employeeRequired2 = _interopRequireDefault(_employeeRequired);

const router = new (0, _express.Router)();

router.get("/", _loginRequired2.default, _leaderRequired2.default, _frequencia2.default.index);
router.put("/", _loginRequired2.default, _leaderRequired2.default, _frequencia2.default.update);
router.get("/history", _loginRequired2.default, _employeeRequired2.default, _lastFrequency2.default.index);
router.post("/", _loginRequired2.default, _employeeRequired2.default, _frequencia2.default.create);
router.delete("/:id", _loginRequired2.default, _employeeRequired2.default, _frequencia2.default.delete);
exports. default = router;
