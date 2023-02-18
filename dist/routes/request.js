"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _request = require('../controllers/request'); var _request2 = _interopRequireDefault(_request);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _adminRequired = require('../middlewares/adminRequired'); var _adminRequired2 = _interopRequireDefault(_adminRequired);

const router = new (0, _express.Router)();

router.get("/", _loginRequired2.default, _adminRequired2.default, _request2.default.index);
router.post("/", _request2.default.create);
router.get("/confirm/:id", _request2.default.confirmEmail);
router.post("/accept/", _loginRequired2.default, _adminRequired2.default, _request2.default.acceptRequest);
router.post("/reject/", _loginRequired2.default, _adminRequired2.default, _request2.default.rejectRequest);
exports. default = router;
