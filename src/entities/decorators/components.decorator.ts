import { EntityComponentTypes } from '@minecraft/server';

export function EntityComponent(EntityComponent: EntityComponentTypes) {
	return function (target: any, propertyKey: string) {
		const getter = function () {
			const component = this.entity.getComponent(EntityComponent);
			return component.value;
		};

		const setter = function (newVal: any) {
			const component = this.entity.getComponent(EntityComponent);
			component.value = newVal;
		};

		Object.defineProperty(target, propertyKey, {
			get: getter,
			set: setter,
			enumerable: true,
			configurable: true,
		});
	};
}
