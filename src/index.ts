import { Match } from "./services/Match";
import { generatePoint } from "./utils/generatePoint";

const match = new Match();

do {
  const pointWinner = generatePoint();
  match.pointWonBy(pointWinner);
  match.score();
} while (match.isLive);
