import { Match } from "../services/Match";
import { Player, Point } from "../services/types/Match";

describe("Match", () => {
  let match: Match;

  beforeEach(() => {
    match = new Match();
  });

  it("should increment the player's score after winning a point", () => {
    match.pointWonBy("Player A");
    expect(match["pointScores"].get("Player A")).toBe("15");
    expect(match["pointScores"].get("Player B")).toBe("0");
  });

  it("should give an advantage point to the player when the opponent is on 40 points", () => {
    const mockedScore = new Map<Player, Point>([
      ["Player A", "40"],
      ["Player B", "40"],
    ]);

    match["pointScores"] = mockedScore;
    match.pointWonBy("Player A");

    expect(match["pointScores"].get("Player A")).toBe("AD");
    expect(match["pointScores"].get("Player B")).toBe("40");
  });

  it("should return to deuce when an advantage is lost", () => {
    const mockedScore = new Map<Player, Point>([
      ["Player A", "40"],
      ["Player B", "AD"],
    ]);

    match["pointScores"] = mockedScore;
    match.pointWonBy("Player A");

    expect(match["pointScores"].get("Player A")).toBe("40");
    expect(match["pointScores"].get("Player B")).toBe("40");
    expect(match["deuce"]).toBe(1);
  });

  it("should award a game point when finishing a game", () => {
    const mockedScore = new Map<Player, Point>([
      ["Player A", "40"],
      ["Player B", "15"],
    ]);

    match["pointScores"] = mockedScore;
    match.pointWonBy("Player A");

    expect(match["pointScores"].get("Player A")).toBe("0");
    expect(match["pointScores"].get("Player B")).toBe("0");
    expect(match["gameScores"].get("Player A")).toBe(1);
    expect(match["gameScores"].get("Player B")).toBe(0);
  });

  it("should win the set and set isLive to false", () => {
    const mockedGameScore = new Map<Player, number>([
      ["Player A", 5],
      ["Player B", 4],
    ]);

    const mockedPointScore = new Map<Player, Point>([
      ["Player A", "40"],
      ["Player B", "15"],
    ]);

    match["gameScores"] = mockedGameScore;
    match["pointScores"] = mockedPointScore;
    match.pointWonBy("Player A");

    expect(match["pointScores"].get("Player A")).toBe("0");
    expect(match["pointScores"].get("Player B")).toBe("0");
    expect(match["gameScores"].get("Player A")).toBe(6);
    expect(match["gameScores"].get("Player B")).toBe(4);
    expect(match.isLive).toBe(false);
  });

  it("should send the game into tiebreak when the score is 6-6", () => {
    const mockedGameScore = new Map<Player, number>([
      ["Player A", 5],
      ["Player B", 6],
    ]);

    const mockedPointScore = new Map<Player, Point>([
      ["Player A", "40"],
      ["Player B", "15"],
    ]);

    match["gameScores"] = mockedGameScore;
    match["pointScores"] = mockedPointScore;
    match.pointWonBy("Player A");

    expect(match["pointScores"].get("Player A")).toBe("0");
    expect(match["pointScores"].get("Player B")).toBe("0");
    expect(match["gameScores"].get("Player A")).toBe(6);
    expect(match["gameScores"].get("Player B")).toBe(6);
    expect(match["isTiebreak"]).toBe(true);
  });

  it("should award tiebreak point not standard point when in tiebreak", () => {
    const mockedGameScore = new Map<Player, number>([
      ["Player A", 5],
      ["Player B", 6],
    ]);
    const mockedPointScore = new Map<Player, Point>([
      ["Player A", "40"],
      ["Player B", "15"],
    ]);

    match["gameScores"] = mockedGameScore;
    match["pointScores"] = mockedPointScore;
    // Win the game to send into tiebreak
    match.pointWonBy("Player A");
    // Win the first tiebreak point
    match.pointWonBy("Player A");

    expect(match["tiebreakScores"].get("Player A")).toBe(1);
    expect(match["tiebreakScores"].get("Player B")).toBe(0);
    expect(match["pointScores"].get("Player A")).toBe("0");
    expect(match["pointScores"].get("Player B")).toBe("0");
    expect(match["gameScores"].get("Player A")).toBe(6);
    expect(match["gameScores"].get("Player B")).toBe(6);
    expect(match["isTiebreak"]).toBe(true);
  });

  it("should win the match in tiebreak when on 6 points and leading by more than 2", () => {
    const mockedGameScore = new Map<Player, number>([
      ["Player A", 5],
      ["Player B", 6],
    ]);
    const mockedPointScore = new Map<Player, Point>([
      ["Player A", "40"],
      ["Player B", "15"],
    ]);

    match["gameScores"] = mockedGameScore;
    match["pointScores"] = mockedPointScore;
    // Win the game to send into tiebreak
    match.pointWonBy("Player A");
    // Win the tiebreak points
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");

    expect(match["tiebreakScores"].get("Player A")).toBe(7);
    expect(match["tiebreakScores"].get("Player B")).toBe(0);
    expect(match["pointScores"].get("Player A")).toBe("0");
    expect(match["pointScores"].get("Player B")).toBe("0");
    expect(match["gameScores"].get("Player A")).toBe(7);
    expect(match["gameScores"].get("Player B")).toBe(6);
    expect(match.isLive).toBe(false);
  });

  it("should continue the game when a tiebreak score of 7 is reached, if a 2 point buffer is not present", () => {
    const mockedGameScore = new Map<Player, number>([
      ["Player A", 5],
      ["Player B", 6],
    ]);
    const mockedPointScore = new Map<Player, Point>([
      ["Player A", "40"],
      ["Player B", "15"],
    ]);

    match["gameScores"] = mockedGameScore;
    match["pointScores"] = mockedPointScore;
    // Win the game to send into tiebreak
    match.pointWonBy("Player A");
    // Win the tiebreak points
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    match.pointWonBy("Player A");
    // Don't call it a comeback
    match.pointWonBy("Player B");
    match.pointWonBy("Player B");
    match.pointWonBy("Player B");
    match.pointWonBy("Player B");
    match.pointWonBy("Player B");
    match.pointWonBy("Player B");

    // Win 7th tiebreak point
    match.pointWonBy("Player A");

    expect(match["tiebreakScores"].get("Player A")).toBe(7);
    expect(match["tiebreakScores"].get("Player B")).toBe(6);
    expect(match["pointScores"].get("Player A")).toBe("0");
    expect(match["pointScores"].get("Player B")).toBe("0");
    expect(match["gameScores"].get("Player A")).toBe(6);
    expect(match["gameScores"].get("Player B")).toBe(6);
    expect(match.isLive).toBe(true);
  });
});
