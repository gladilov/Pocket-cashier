module MLukPayAndShip {

	/* View Model logic */

	export class CViewModel extends MLukMvvm.CViewWaitModelBase {

		private lockViewId = 'iLockUiView';

		modelWasUpdatedHandler(model: IInternalModel) {

			//iGasStationView save
			//iFuelView save
			//iLockUiView

			switch (model.state) {

				case MLukMvvm.EWaitModelState.StartWait:
					model.waitView = this.lockViewId;
					this.messageBox(this.lockViewId, { Header: 'Оплата:', Text: '<i>Ожидайте, производится оплата:</i><br><br>\n' + MUi.getViewContent('iFuelView', this.lockViewId) }, true);
					break;

				case MLukMvvm.EWaitModelState.StopWait:
					this.messageBox(this.lockViewId);
					break;

				default:
					break;
			}			
		}
	}
} 