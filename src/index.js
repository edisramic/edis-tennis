"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Match_1 = require("./services/Match");
var generatePoint_1 = require("./utils/generatePoint");
var match = new Match_1.Match();
do {
    var pointWinner = (0, generatePoint_1.generatePoint)();
    match.pointWonBy(pointWinner);
    match.score();
} while (match.isLive);
