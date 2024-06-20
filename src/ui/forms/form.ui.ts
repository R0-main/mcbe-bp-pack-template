import { ActionFormData, ActionFormResponse, MessageFormData, MessageFormResponse, ModalFormData, ModalFormResponse } from '@minecraft/server-ui';
import CustomPlayer from 'entities/player/custom-player';

export class Form<
	TFormType extends ActionFormData | ModalFormData | MessageFormData,
	TFormResponse extends ActionFormResponse | ModalFormResponse | MessageFormResponse
> {
	public static playersInFormSet: Set<string> = new Set();

	protected form: TFormType;

	constructor(protected player: CustomPlayer, form: new () => TFormType) {
		this.form = new form();
	}

	protected async after<T>(response: TFormResponse): Promise<void | Form<TFormType, TFormResponse> | T> {}

	public async show(player: CustomPlayer): Promise<void | Form<TFormType, TFormResponse>> {
		if (Form.playersInFormSet.has(player.name)) {
			return player.sendMessage(`§cyou can't open more than one form at the time!`);
		}
		Form.playersInFormSet.add(player.name);

		let sent = false;

		while (true) {
			// @ts-ignore
			const response = await this.form.show(player);
			// @ts-ignore
			if (response.cancelationReason !== 'UserBusy') {
				Form.playersInFormSet.delete(player.name);
				return await this.after(response as TFormResponse);
			} else if (sent === false) {
				player.sendMessage(`§7please close the chat to open the form!`);
				sent = true;
			}
		}
	}
}
