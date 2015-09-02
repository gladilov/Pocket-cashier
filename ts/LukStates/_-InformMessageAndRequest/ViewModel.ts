module MInformMessageAndRequest {
	
	/* View Model logic */

	export class CViewModel extends MMvvm.CViewModelBase implements MUi.IBlockUIHandler {
		
		protected lockViewId = 'iLockUiView';

		blockUIEventHandler() {
			return this.lockViewId;
		}

		unblockUIEventHandler() {
			MUi.resetView(this.lockViewId);
		}

		modelWasUpdatedHandler(model: IInputModel) {

			this.messageBoxWithButton(this.lockViewId, model,() => this.onButtonEvent());
			MUi.forceBlockUI(this);
		}

		onButtonEvent(nextStateKey: string = null) {
			MUi.forceUnblockUI(this);
			if (nextStateKey == null) {
				this.nextStateBy('DoOnButton');
			}
			else {
				this.nextStateBy(nextStateKey);
			}
		}	
	}
}

