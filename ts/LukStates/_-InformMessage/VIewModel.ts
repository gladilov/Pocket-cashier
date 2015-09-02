module MInformMessage {
	
	/* View Model logic */

	export class CViewModel extends MMvvm.CViewModelBase {

		modelWasUpdatedHandler(message: IInputModel ) {

			//iMessageView
													
			this.messageBox('iMessageView', message);
		}
	}
}

