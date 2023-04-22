"use strict";"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var home_1 = require("../controllers/home");
var router = new express_1.Router();
router.get("/", home_1.default.index);
exports.default = router;
