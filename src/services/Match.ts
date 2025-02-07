import { IMatch, Player, Point, ScoreConstants } from "./types/Match";

export class Match implements IMatch {
  private gameScores: Map<Player, number> = new Map<Player, number>([
    ["Player A", 0],
    ["Player B", 0],
  ]);
  private pointScores: Map<Player, Point> = new Map<Player, Point>([
    ["Player A", "0"],
    ["Player B", "0"],
  ]);
  private deuce: number = 0;
  private isTiebreak: boolean = false;
  private tiebreakScores: Map<Player, number> = new Map<Player, number>([
    ["Player A", 0],
    ["Player B", 0],
  ]);
  isLive: boolean = true;

  pointWonBy(player: Player) {
    if (this.isTiebreak) {
      this.winTiebreakPoint(player);
    } else {
      this.winStandardPoint(player);
    }
  }

  score() {
    const playerAGames = this.getGames("Player A");
    const playerBGames = this.getGames("Player B");
    const playerAPoints = this.getPoints("Player A");
    const playerBPoints = this.getPoints("Player B");

    if (this.isTiebreak) {
      const playerATiebreakPoints = this.getTiebreakPoints("Player A");
      const playerBTiebreakPoints = this.getTiebreakPoints("Player B");
      console.log(
        this.formatScore(
          playerAGames,
          playerBGames,
          playerAPoints,
          playerBPoints,
          playerATiebreakPoints,
          playerBTiebreakPoints
        )
      );
    } else {
      console.log(
        this.formatScore(
          playerAGames,
          playerBGames,
          playerAPoints,
          playerBPoints
        )
      );
    }
  }

  private getPoints(player: Player) {
    return this.pointScores.get(player);
  }

  private setPoints(player: Player, point: Point) {
    this.pointScores.set(player, point);
  }

  private getGames(player: Player) {
    return this.gameScores.get(player);
  }

  private setGames(player: Player, games: number) {
    this.gameScores.set(player, games);
  }

  private winStandardPoint(player: Player) {
    const playersPoint = this.getPoints(player);
    const opponent = this.getOpponent(player);
    const opponentScore = this.getPoints(opponent);

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
  }

  private winTiebreakPoint(player: Player) {
    const playersPoint =
      this.getTiebreakPoints(player) + ScoreConstants.TIEBREAK_POINT;
    const opponent = this.getOpponent(player);
    const opponentsPoint = this.getTiebreakPoints(opponent);

    this.setTiebreakPoints(player, playersPoint);

    if (
      playersPoint >= ScoreConstants.MIN_TIEBREAK_SCORE &&
      playersPoint - opponentsPoint >= ScoreConstants.MIN_TIEBREAK_BUFFER
    ) {
      this.setGames(player, ScoreConstants.GAMES_WON_AFTER_WINNING_TIEBREAK);
      this.finishSet(player);
    }
  }

  private getTiebreakPoints(player: Player) {
    return this.tiebreakScores.get(player);
  }

  private setTiebreakPoints(player: Player, point: number) {
    this.tiebreakScores.set(player, point);
  }

  private finishGame(player: Player, opponent: Player) {
    // Including the game that has just been won
    const playerGamesWon = this.getGames(player) + ScoreConstants.GAME_POINT;
    const opponentGamesWon = this.getGames(opponent);

    this.setPoints(player, "0");
    this.setPoints(opponent, "0");
    this.setGames(player, playerGamesWon);
    this.resetDeuceCount();

    if (
      playerGamesWon >= ScoreConstants.MIN_GAMES_NEEDED &&
      playerGamesWon - opponentGamesWon >= ScoreConstants.MIN_GAME_BUFFER
    ) {
      this.finishSet(player);
    }

    if (
      playerGamesWon === ScoreConstants.TIEBREAK_TRIGGER &&
      opponentGamesWon === ScoreConstants.TIEBREAK_TRIGGER
    ) {
      this.isTiebreak = true;
    }
  }

  private finishSet(winner: Player) {
    this.isLive = false;
    console.log(`Game, Set & Match - ${winner} wins!`);
  }

  private incrementDeuceCount() {
    this.deuce++;
  }

  private resetDeuceCount() {
    this.deuce = 0;
  }

  private getOpponent(player: Player): Player {
    return player === "Player A" ? "Player B" : "Player A";
  }

  private formatScore(
    playerAGames: number,
    playerBGames: number,
    playerAPoints: Point,
    playerBPoints: Point,
    playerATiebreakPoints?: number,
    playerBTiebreakPoints?: number
  ) {
    let score = `${playerAGames}-${playerBGames}`;

    if (this.isLive) {
      if (this.isTiebreak) {
        score = score + ` ${playerATiebreakPoints}-${playerBTiebreakPoints}`;
      } else {
        score = score + ` ${playerAPoints}-${playerBPoints}`;

        if (playerAPoints === "40" && playerBPoints === "40") {
          if (this.deuce === ScoreConstants.FIRST_DEUCE) {
            score = score + " Deuce";
          } else {
            score = score + ` Deuce (${this.deuce})`;
          }
        }
      }
    }

    return score;
  }
}
