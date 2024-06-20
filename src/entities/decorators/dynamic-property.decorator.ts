import { EDynamicProperties } from './dynamic-properties-enum';

export function DynamicProperty<T extends string | boolean | number>(dynamicProperty: EDynamicProperties, defaultValue: T) {
	return function (target: any, propertyKey: string) {
		const getter = function () {
			return this.entity.getDynamicProperty(dynamicProperty) || defaultValue;
		};

		const setter = function (newVal: any) {
			this.entity.setDynamicProperty(dynamicProperty, newVal);
		};

		Object.defineProperty(target, propertyKey, {
			get: getter,
			set: setter,
			enumerable: true,
			configurable: true,
		});
	};
}
