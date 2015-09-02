module MLukErrorAndContinue {

	/* View Model logic */

	export class CViewModel extends MInformMessageAndRequest.CViewModel {

		modelWasUpdatedHandler(model: IInputModel) {
			
			//iMessageView
			super.modelWasUpdatedHandler(model);
		}

		onButtonEvent() {
			super.onButtonEvent('DoContinue');
		}
	}
}