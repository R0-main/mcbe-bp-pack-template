import { EntityDieAfterEvent, EntityDieAfterEventSignal, ItemUseOnAfterEventSignal, system, world } from '@minecraft/server';
import CustomPlayer from 'entities/player/custom-player';
import PlayerUseItemOnEvent from './player/on-item-use-on.event';

export default class EventsHandler {
	private readonly playerItemUseOnEventInstance: ItemUseOnAfterEventSignal = world.afterEvents.itemUseOn;
	private readonly onTick: number = system.runInterval(this.tickMethod.bind(this));

	constructor() {
		this.playerItemUseOnEventInstance.subscribe((e) => new PlayerUseItemOnEvent(e));
	}

	private tickMethod(): void {
		for (const p of world.getAllPlayers()) {
			const player = p as CustomPlayer;
		}
	}
}
