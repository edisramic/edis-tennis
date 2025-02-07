"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
var Match_1 = require("./types/Match");
var Match = /** @class */ (function () {
    function Match() {
        this.gameScores = new Map([
            ["Player A", 0],
            ["Player B", 0],
        ]);
        this.pointScores = new Map([
            ["Player A", "0"],
            ["Player B", "0"],
        ]);
        this.deuce = 0;
        this.isTiebreak = false;
        this.tiebreakScores = new Map([
            ["Player A", 0],
            ["Player B", 0],
        ]);
        this.isLive = true;
    }
    Match.prototype.pointWonBy = function (player) {
        if (this.isTiebreak) {
            this.winTiebreakPoint(player);
        }
        else {
            this.winStandardPoint(player);
        }
    };
    Match.prototype.score = function () {
        var playerAGames = this.getGames("Player A");
        var playerBGames = this.getGames("Player B");
        var playerAPoints = this.getPoints("Player A");
        var playerBPoints = this.getPoints("Player B");
        if (this.isTiebreak) {
            var playerATiebreakPoints = this.getTiebreakPoints("Player A");
            var playerBTiebreakPoints = this.getTiebreakPoints("Player B");
            console.log(this.formatScore(playerAGames, playerBGames, playerAPoints, playerBPoints, playerATiebreakPoints, playerBTiebreakPoints));
        }
        else {
            console.log(this.formatScore(playerAGames, playerBGames, playerAPoints, playerBPoints));
        }
    };
    Match.prototype.getPoints = function (player) {
        return this.pointScores.get(player);
    };
    Match.prototype.setPoints = function (player, point) {
        this.pointScores.set(player, point);
    };
    Match.prototype.getGames = function (player) {
        return this.gameScores.get(player);
    };
    Match.prototype.setGames = function (player, games) {
        this.gameScores.set(player, games);
    };
    Match.prototype.winStandardPoint = function (player) {
        var playersPoint = this.getPoints(player);
        var opponent = this.getOpponent(player);
        var opponentScore = this.getPoints(opponent);
        switch (playersPoint) {
            case "0":
                this.setPoints(player, "15");
                break;
            case "15":
                this.setPoints(player, "30");
                break;
            case "30":
                if (opponentScore === "40") {
                    this.incrementDeuceCount();
                }
                this.setPoints(player, "40");
                break;
            case "40":
                if (opponentScore === "40") {
                    this.setPoints(player, "AD");
                    break;
                }
                if (opponentScore === "AD") {
                    this.incrementDeuceCount();
                    this.setPoints(opponent, "40");
                    break;
                }
                this.finishGame(player, opponent);
                break;
            case "AD":
                this.finishGame(player, opponent);
                break;
            default:
                throw new Error("Incorrect points data");
        }
    };
    Match.prototype.winTiebreakPoint = function (player) {
        var playersPoint = this.getTiebreakPoints(player) + Match_1.ScoreConstants.TIEBREAK_POINT;
        var opponent = this.getOpponent(player);
        var opponentsPoint = this.getTiebreakPoints(opponent);
        this.setTiebreakPoints(player, playersPoint);
        if (playersPoint >= Match_1.ScoreConstants.MIN_TIEBREAK_SCORE &&
            playersPoint - opponentsPoint >= Match_1.ScoreConstants.MIN_TIEBREAK_BUFFER) {
            this.setGames(player, Match_1.ScoreConstants.GAMES_WON_AFTER_WINNING_TIEBREAK);
            this.finishSet(player);
        }
    };
    Match.prototype.getTiebreakPoints = function (player) {
        return this.tiebreakScores.get(player);
    };
    Match.prototype.setTiebreakPoints = function (player, point) {
        this.tiebreakScores.set(player, point);
    };
    Match.prototype.finishGame = function (player, opponent) {
        // Including the game that has just been won
        var playerGamesWon = this.getGames(player) + Match_1.ScoreConstants.GAME_POINT;
        var opponentGamesWon = this.getGames(opponent);
        this.setPoints(player, "0");
        this.setPoints(opponent, "0");
        this.setGames(player, playerGamesWon);
        this.resetDeuceCount();
        if (playerGamesWon >= Match_1.ScoreConstants.MIN_GAMES_NEEDED &&
            playerGamesWon - opponentGamesWon >= Match_1.ScoreConstants.MIN_GAME_BUFFER) {
            this.finishSet(player);
        }
        if (playerGamesWon === Match_1.ScoreConstants.TIEBREAK_TRIGGER &&
            opponentGamesWon === Match_1.ScoreConstants.TIEBREAK_TRIGGER) {
            this.isTiebreak = true;
        }
    };
    Match.prototype.finishSet = function (winner) {
        this.isLive = false;
        console.log("Game, Set & Match - ".concat(winner, " wins!"));
    };
    Match.prototype.incrementDeuceCount = function () {
        this.deuce++;
    };
    Match.prototype.resetDeuceCount = function () {
        this.deuce = 0;
    };
    Match.prototype.getOpponent = function (player) {
        return player === "Player A" ? "Player B" : "Player A";
    };
    Match.prototype.formatScore = function (playerAGames, playerBGames, playerAPoints, playerBPoints, playerATiebreakPoints, playerBTiebreakPoints) {
        var score = "".concat(playerAGames, "-").concat(playerBGames);
        if (this.isLive) {
            if (this.isTiebreak) {
                score = score + " ".concat(playerATiebreakPoints, "-").concat(playerBTiebreakPoints);
            }
            else {
                score = score + " ".concat(playerAPoints, "-").concat(playerBPoints);
                if (playerAPoints === "40" && playerBPoints === "40") {
                    if (this.deuce === Match_1.ScoreConstants.FIRST_DEUCE) {
                        score = score + " Deuce";
                    }
                    else {
                        score = score + " Deuce (".concat(this.deuce, ")");
                    }
                }
            }
        }
        return score;
    };
    return Match;
}());
exports.Match = Match;
