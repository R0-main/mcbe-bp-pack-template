import {
	Entity,
	ContainerSlot,
	Container,
	Player,
	Vector3,
	ItemStack,
	ItemLockMode,
	EquipmentSlot,
	world,
	EntityEquippableComponent,
	system,
	EntityHealthComponent,
	EntityComponent,
	EntityInventoryComponent,
} from '@minecraft/server';

// @ts-ignore
export default class CustomPlayer extends Player {
	public isInit: boolean = false;

	public init(): void {
		this.isInit = true;
	}

	public isAlive(): boolean {
		const health = this.getComponent('health') as EntityHealthComponent;
		return health.currentValue > 0;
	}

	public setMovement(value: number): void {
		const playerMovementComponent = this.getComponent('movement') as EntityHealthComponent;
		playerMovementComponent.setCurrentValue(value);
	}
	public addMovement(value: number /* in percent */): void {
		const playerMovementComponent = this.getComponent('movement') as EntityHealthComponent;
		const velocity = playerMovementComponent.defaultValue + (value * playerMovementComponent.defaultValue) / 100;
		this.setMovement(velocity);
	}
	public resetMovement(): void {
		const playerMovementComponent = this.getComponent('movement') as EntityHealthComponent;
		playerMovementComponent.resetToDefaultValue();
	}

	public removeOneHandItem(): void {
		const item = this.getHandItem();

		if (item.amount <= 1) this.setHandItem(null);
		else {
			item.amount -= 1;
			this.setHandItem(item);
		}
	}

	public setLockItem(value: boolean, slotNum: number): ItemStack | void {
		let item: ItemStack = this.getInventory().getItem(slotNum);
		if (!item) return;
		item.lockMode = value ? ItemLockMode.slot : ItemLockMode.none;
		this.getInventory().setItem(slotNum, item as ItemStack);
		return item;
	}

	public clearActionBar(): void {
		this.onScreenDisplay.setActionBar(' ');
	}

	public setLockHandItem(value: boolean): void {
		const item = this.getHandItem();
		item.lockMode = value ? ItemLockMode.slot : ItemLockMode.none;
		this.setHandItem(item);
	}
	public getItemSlot(slotNum: number): ItemStack {
		return this.getInventory().getItem(slotNum);
	}
	public getItemStackSlot(slotNum: number): ItemStack {
		return this.getInventory().getItem(slotNum);
	}
	public getHandItem(): ItemStack {
		return this.getInventory().getItem(this.selectedSlotIndex);
	}
	public clearHandItem(): void {
		return this.getInventory().setItem(this.selectedSlotIndex, new ItemStack('minecraft:dirt', 1));
	}
	public setHandItem(item: ItemStack): void {
		this.getInventory().setItem(this.selectedSlotIndex, item);
	}
	public getInventory(): Container {
		const inventoryComponent = this.getComponent('inventory') as EntityInventoryComponent;
		return inventoryComponent?.container;
	}
	public getOffHandItem(): ItemStack {
		const equipment = this.getComponent('equippable') as EntityEquippableComponent;
		return equipment.getEquipment(EquipmentSlot.Offhand);
	}
	public setOffhandItem(item: ItemStack): void {
		const equipment = this.getComponent('equippable') as EntityEquippableComponent;
		equipment.setEquipment(EquipmentSlot.Offhand, item as ItemStack);
	}
	public clearOffHandItem(): void {
		const equipment = this.getComponent('equippable') as EntityEquippableComponent;
		equipment.getEquipmentSlot(EquipmentSlot.Offhand).setItem(null);
	}

	public isSameLocation(location: Vector3, tolerance: number = 0.3): boolean {
		const xDiff = Math.abs(this.location.x - location.x);
		const yDiff = Math.abs(this.location.y - location.y);
		const zDiff = Math.abs(this.location.z - location.z);

		return xDiff <= tolerance && yDiff <= tolerance && zDiff <= tolerance;
	}

	public getInventoryItem(itemId: string): ItemStack[] {
		let items: ItemStack[] = [];

		const playerInventory: Container = this.getInventory();

		for (let i = 0; i < playerInventory.size; i++) {
			const item: ItemStack = playerInventory.getItem(i);
			if (item?.typeId === itemId) items.push(item as ItemStack);
		}

		return items;
	}

	public getHeight(): number {
		return this.isSneaking ? 1.25 : 1.5;
	}
}
