"use strict";"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var token_1 = require("../controllers/token");
var router = new express_1.Router();
router.post("/", token_1.default.create);
exports.default = router;
