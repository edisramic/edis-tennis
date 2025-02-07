export interface IMatch {
  pointWonBy: (player: Player) => void;
  score: () => void;
}

export type Player = "Player A" | "Player B";
export type Point = "0" | "15" | "30" | "40" | "AD";

export enum ScoreConstants {
  FIRST_DEUCE = 1,
  MIN_GAMES_NEEDED = 6,
  MIN_GAME_BUFFER = 2,
  TIEBREAK_TRIGGER = 6,
  MIN_TIEBREAK_SCORE = 7,
  MIN_TIEBREAK_BUFFER = 2,
  GAME_POINT = 1,
  TIEBREAK_POINT = 1,
  GAMES_WON_AFTER_WINNING_TIEBREAK = 7,
}
