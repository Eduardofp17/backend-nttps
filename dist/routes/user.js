"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _user = require('../controllers/user'); var _user2 = _interopRequireDefault(_user);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _employeeRequired = require('../middlewares/employeeRequired'); var _employeeRequired2 = _interopRequireDefault(_employeeRequired);

const router = new (0, _express.Router)();

router.get("/", _loginRequired2.default, _employeeRequired2.default, _user2.default.index);
// router.post("/", UserController.create);
router.put("/", _loginRequired2.default, _user2.default.update);
router.post("/forgotPassword", _user2.default.redefinePass);
router.put("/redefine/:id", _user2.default.redefinePassword);
exports. default = router;
