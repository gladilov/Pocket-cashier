module MLukCostOrVolumeAwaiting {

	/* View Model logic */

	export class CViewModel extends MLukMvvm.CViewWaitModelBase {

		modelWasUpdatedHandler(model: IInternalModel) {

			//iGasStationView save
			//iFuelView save
			//iCommonView save
			//iLockUiView

			switch (model.state) {

				case MLukMvvm.EWaitModelState.StartWait:
					model.waitView = 'iLockUiView';
					this.messageBox('iLockUiView', { Header: 'Расчет:', Text: 'Ожидайте, производится расчет стоимости...' }, true);					
					this.enableCancelMenu();
					break;

				case MLukMvvm.EWaitModelState.StopWait:
					this.messageBox('iLockUiView');
					this.disableCancelMenu();
					break;

				default:
					break;
			}
		}
	}
} 