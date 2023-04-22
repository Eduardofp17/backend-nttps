"use strict";"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var email_1 = require("../controllers/email");
var router = new express_1.Router();
router.post('/', email_1.default.create);
exports.default = router;
