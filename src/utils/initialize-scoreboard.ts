import { world } from "@minecraft/server";
export function initializeScoreboard(scoreboardName : string) {
    if (world.scoreboard.getObjective(scoreboardName))
        return;
    world.scoreboard.addObjective(scoreboardName, scoreboardName);
}
