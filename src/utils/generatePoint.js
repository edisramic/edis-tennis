"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePoint = generatePoint;
function generatePoint() {
    return Math.random() < 0.5 ? "Player A" : "Player B";
}
