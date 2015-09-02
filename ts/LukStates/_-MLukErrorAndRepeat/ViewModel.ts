module MLukErrorAndRepeat {

	/* View Model logic */

	export class CViewModel extends MInformMessageAndRequest.CViewModel {

		protected transferingMessage: any;

		modelWasUpdatedHandler(model: IInputModel) {

			//iMessageView
			this.transferingMessage = model.transferingMessage;						
			super.modelWasUpdatedHandler(model);
		}

		onButtonEvent() {
			MUi.forceUnblockUI(this);
			this.nextStateBy('DoRepeat', this.transferingMessage);
		}
	}
}
 