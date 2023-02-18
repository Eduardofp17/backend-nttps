"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _school = require('../controllers/school'); var _school2 = _interopRequireDefault(_school);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get("/", _school2.default.index);
router.post("/", _school2.default.create);
router.put("/", _loginRequired2.default, _school2.default.update);
router.get("/confirm/:id", _school2.default.confirmEmail);
exports. default = router;
