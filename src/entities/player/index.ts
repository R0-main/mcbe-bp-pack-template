import { Player, world } from '@minecraft/server';
import CustomPlayer from './custom-player';

for (const key of Object.getOwnPropertyNames(CustomPlayer.prototype)) {
	Player.prototype[key] = CustomPlayer.prototype[key];
}

world.afterEvents.playerSpawn.subscribe((data) => {
	const player = data.player as CustomPlayer;
	player.init();
});

for (const player of world.getAllPlayers()) {
	const customPlayer = player as CustomPlayer;
	customPlayer.init();
}
