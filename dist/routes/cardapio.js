"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _cardapio = require('../controllers/cardapio'); var _cardapio2 = _interopRequireDefault(_cardapio);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _employeeRequired = require('../middlewares/employeeRequired'); var _employeeRequired2 = _interopRequireDefault(_employeeRequired);

const router = new (0, _express.Router)();

router.get("/", _cardapio2.default.index);
router.put("/:id", _loginRequired2.default, _employeeRequired2.default, _cardapio2.default.update);
router.post("/", _loginRequired2.default, _employeeRequired2.default, _cardapio2.default.create);
router.delete("/:id", _loginRequired2.default, _employeeRequired2.default, _cardapio2.default.delete);
exports. default = router;
