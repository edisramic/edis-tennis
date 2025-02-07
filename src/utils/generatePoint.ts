import { Player } from "../services/types/Match";

export function generatePoint(): Player {
  return Math.random() < 0.5 ? "Player A" : "Player B";
}
