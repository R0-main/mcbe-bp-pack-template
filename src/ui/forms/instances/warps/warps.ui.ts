import { ActionFormData, ActionFormResponse } from '@minecraft/server-ui';
import { Form } from 'ui/forms/form.ui';
import CustomPlayer from 'entities/player/custom-player';
import Config from 'config/config';
import { EAccents } from 'ui/colors/colors-enum';

export class BlockPetStats extends Form<ActionFormData, ActionFormResponse> {
	constructor(player: CustomPlayer) {
		super(player, ActionFormData);

		this.form.title(`${Config.colors.primary}Warps`);

		this.form.body([``, `${EAccents.Bold}${Config.colors.secondary} Random Text`, ``].join('\n'));

		this.form.button('Following', 'textures/flame_atlas.png');

		this.show(player);
	}

	protected async after(response: ActionFormResponse): Promise<void | Form<ActionFormData, ActionFormResponse>> {
		if (response.canceled) return;

		switch (response.selection) {
			case 1:
				console.warn(`${this.player.name} clicked on button 1 !`);
				break;
		}
	}
}
