import { ItemStack, ItemUseOnAfterEvent, Player } from "@minecraft/server";
import CustomPlayer from "entities/player/custom-player";

export default class PlayerUseItemOnEvent {
    public item: ItemStack;
    public player: CustomPlayer;

    constructor(event : ItemUseOnAfterEvent) {
        if (!(event.source instanceof Player)) return
        this.item = event.itemStack
        this.player = event.source as CustomPlayer
        this.execute()
    }

    private execute() : void {
        this.player.sendMessage('You just use an item on a block !')
    }
}
