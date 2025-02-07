"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreConstants = void 0;
var ScoreConstants;
(function (ScoreConstants) {
    ScoreConstants[ScoreConstants["FIRST_DEUCE"] = 1] = "FIRST_DEUCE";
    ScoreConstants[ScoreConstants["MIN_GAMES_NEEDED"] = 6] = "MIN_GAMES_NEEDED";
    ScoreConstants[ScoreConstants["MIN_GAME_BUFFER"] = 2] = "MIN_GAME_BUFFER";
    ScoreConstants[ScoreConstants["TIEBREAK_TRIGGER"] = 6] = "TIEBREAK_TRIGGER";
    ScoreConstants[ScoreConstants["MIN_TIEBREAK_SCORE"] = 7] = "MIN_TIEBREAK_SCORE";
    ScoreConstants[ScoreConstants["MIN_TIEBREAK_BUFFER"] = 2] = "MIN_TIEBREAK_BUFFER";
    ScoreConstants[ScoreConstants["GAME_POINT"] = 1] = "GAME_POINT";
    ScoreConstants[ScoreConstants["TIEBREAK_POINT"] = 1] = "TIEBREAK_POINT";
    ScoreConstants[ScoreConstants["GAMES_WON_AFTER_WINNING_TIEBREAK"] = 7] = "GAMES_WON_AFTER_WINNING_TIEBREAK";
})(ScoreConstants || (exports.ScoreConstants = ScoreConstants = {}));
