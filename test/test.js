"use strict";
exports.__esModule = true;
var index_1 = require("../dist/index");
console.log(new index_1["default"]().addDays(1));
console.log(new index_1["default"]().diffDays(new index_1["default"](2020, 2, 10)));
console.log(new index_1["default"]().dayOfYear());
console.log(new index_1["default"]().getTime());
console.log(new index_1["default"](1583035200000).toString());
console.log(new index_1["default"]().dayOfYear());
console.log(new index_1["default"]().getMilliseconds());
var dt = new index_1["default"]();
console.log(dt.toString('yyyy-MM-dd hh:mm:ss.fff'));
var dt1 = dt.addMilliseconds(123);
var dt2 = new index_1["default"]();
console.log(dt1.toString('yyyy-MM-dd hh:mm:ss.ff'));
console.log(dt1.compareTo(dt2));
console.log(new index_1["default"]('2020-03-03').addDays(-1));
