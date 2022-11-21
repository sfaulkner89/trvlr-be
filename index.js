"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.listen(8080, function () { return console.log('listenin'); });
