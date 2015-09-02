module MLukNozzleAwaiting {

	/* View Model logic */
	
	export class CViewModel extends MLukMvvm.CViewWaitModelBase {

		modelWasUpdatedHandler(model: IInternalModel) {

			//iGasStationView	save
			//iLockUiView
			
			switch (model.state) {
				
				case MLukMvvm.EWaitModelState.StartWait:
					if (globalPhaseVersion == 1) {
						model.waitView = 'iLockUiView';
						this.messageBox(model.waitView, { Header: 'Пистолет', Text: 'Вставьте пистолет в бак...' }, true);						
					}
					else {
						model.waitView = 'iNozzleAwaitingAnimationView';
						MUi.enableContent('iNozzleAwaitingAnimationView');
					}
					this.enableCancelMenu();
					break;

				case MLukMvvm.EWaitModelState.StopWait:
					// Чистим view сообщения
					if (globalPhaseVersion == 1) {
						MUi.resetView('iLockUiView');
					}
					else {
						MUi.resetView('iNozzleAwaitingAnimationView');
					}
					this.disableCancelMenu();
					break;

				case MLukMvvm.EWaitModelState.Other:
					//Создаем view для топлива и заказа
					//Render
					MUi.applyToView('iFuelView', 'iFuelResource', <MLukViews.IFuelViewResource>{
						FuelName: model.fuelName.FuelName,
						FuelPriceKop: "-",
						FuelValueMl: "",
						FundsKop: ""
					});
					break;

				default:
					break;
			}
		}
	}
} 