module MLukDone {
	
	/* View Model logic */

	export class CViewModel extends MInformMessageAndRequest.CViewModel {

		modelWasUpdatedHandler(receipt: IInternalModel) {
			
			//iGasStationView save
			//iFuelView
			//iMessageView
			var fuelPriceKop = String(String(MUiFormats.rub(receipt.FuelPriceKop)));
			if (receipt.FuelPriceKop == undefined || receipt.FuelPriceKop == null) {				
				fuelPriceKop = "-";
			}
			//Обновляем view для топлива и заказа
			MUi.applyToView('iFuelView', 'iFuelResource', <MLukViews.IFuelViewResource>{
				FuelName: receipt.FuelName,
				FuelPriceKop: fuelPriceKop,
				FuelValueMl: String(MUiFormats.lit(receipt.FuelValueMl)),
				FundsKop: String(MUiFormats.rub(receipt.FundsKop))
			});

			super.modelWasUpdatedHandler({
				message: {
					Header: 'Повесьте пистолет!',
					Text: '<i>Отгрузка завершена:</i><br><br>\n' + MUi.getViewContent('iFuelView', this.lockViewId)
				},
				buttonName: "Ok",
				errorCode: undefined
			});											
		}

		onButtonEvent() {
			super.onButtonEvent('DoExit');
		}
	}
}

