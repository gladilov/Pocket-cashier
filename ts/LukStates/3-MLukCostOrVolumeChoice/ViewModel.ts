module MLukCostOrVolumeChoice {
	
	/* View Model logic */
	
	export class CViewModel extends MLukMvvm.CViewModelBase {

		private startShipButtionWasActivated = false;

		modelWasUpdatedHandler(receipt: IInternalModel) {

			//iGasStationView save
			//iFuelView
			//iCommonView

			//Обновляем view для топлива и заказа					

			var fuelPriceKop = String(String(MUiFormats.rub(receipt.FuelPriceKop)));
			if (receipt.FuelPriceKop == undefined || receipt.FuelPriceKop == null ) {
				fuelPriceKop = "-";
			}

			if (receipt.FundsKop != undefined) {
				// Расчет был произведен хоть раз
				MUi.applyToView('iFuelView', 'iFuelResource', <MLukViews.IFuelViewResource>{
					FuelName: receipt.FuelName,
					FuelPriceKop: fuelPriceKop,
					FuelValueMl: String(MUiFormats.lit(receipt.FuelValueMl)),
					FundsKop: String(MUiFormats.rub(receipt.FundsKop))
				});

				MUi.updateView('iCommonView', 'iFuelValueAndFundsResource', <MLukViews.IFuelValueAndFundsResource>{
					FuelValueLit: String(MUiFormats.lit(receipt.FuelValueMl)),
					FundsRub: String(MUiFormats.rub(receipt.FundsKop))
				});

				if (!this.startShipButtionWasActivated) {
					// Начать налив
					var link = MUi.getResource('iLinkResource').applyAndSetId(<MLukViews.ILinkResource>{
						Text: "Начать отпуск топлива"
					});
					MUi.appendToView('iCommonView', 'iTableResource', <MLukViews.ITableResource>{
						Element: link.html
					});
					this.bindParentViewEvent('iCommonView', link.id, 'click',() => this.viewShipEvent());
					this.startShipButtionWasActivated = true;
				}
			}
			else {
				// Расчет не был произведен
				MUi.applyToView('iFuelView', 'iFuelResource', <MLukViews.IFuelViewResource>{
					FuelName: receipt.FuelName,
					FuelPriceKop: "-",
					FuelValueMl: "-",
					FundsKop: "-"
				});

				MUi.updateView('iCommonView', 'iFuelValueAndFundsResource', <MLukViews.IFuelValueAndFundsResource>{
					FuelValueLit: "",
					FundsRub: ""
				});
			}			

			this.bindParentViewEvent('iCommonView', 'iFuelValueInc', 'click',() => this.viewFuelValueIncrement());
			this.bindParentViewEvent('iCommonView', 'iFuelValueDec', 'click',() => this.viewFuelValueDecrement());
			this.bindParentViewEvent('iCommonView', 'iFundsInc', 'click',() => this.viewFundsIncrement());
			this.bindParentViewEvent('iCommonView', 'iFundsDec', 'click',() => this.viewFundsDecrement());
			this.bindParentViewEvent('iCommonView', 'iFunds', 'change',() => this.viewCalculateFuelVolumeEvent());
			this.bindParentViewEvent('iCommonView', 'iFuelValue', 'change',() => this.viewCalculateFuelCostEvent());
						
			// Расчет 10 Литров
			var link = MUi.getResource('iLinkResource').applyAndSetId(<MLukViews.ILinkResource>{
				Text: "Расчет для 10 л"
			});
			MUi.appendToView('iCommonView', 'iTableResource', <MLukViews.ITableResource>{
				Element: link.html
			});
			this.bindParentViewEvent<number>('iCommonView', link.id, 'click', (fuelValueMl: number) => this.viewCalculateFuelCostEventBy(fuelValueMl), 10000);

			// Расчет 1000 Руб
			var link = MUi.getResource('iLinkResource').applyAndSetId(<MLukViews.ILinkResource>{
				Text: "Расчет для 1000 р."
			});
			MUi.appendToView('iCommonView', 'iTableResource', <MLukViews.ITableResource>{
				Element: link.html
			});
			this.bindParentViewEvent<number>('iCommonView', link.id, 'click',(fundsKop: number) => this.viewCalculateFuelVolumeEventBy(fundsKop), 100000);

			this.enableCancelMenu();
		}

		protected cancelEventHandler() {
			this.unbindBodyViewEvents();
		}

		private unbindBodyViewEvents(): void {
			this.unbindParentViewEvent('iCommonView', 'iFuelValueInc', 'click');
			this.unbindParentViewEvent('iCommonView', 'iFuelValueDec', 'click');
			this.unbindParentViewEvent('iCommonView', 'iFundsInc', 'click');
			this.unbindParentViewEvent('iCommonView', 'iFundsDec', 'click');
			this.unbindParentViewEvent('iCommonView', 'iFunds', 'change');
			this.unbindParentViewEvent('iCommonView', 'iFuelValue', 'change');			
			this.startShipButtionWasActivated = false;
		}

		/*private setItAsString(id: string, value: string): void {			
			$('#' + id).attr('value', value);
		}

		private setItAsNumber(id: string, value: number): void {
			$('#' + id).attr('value', String(value));
		}*/

		private getItAsNumber(id: string): number {
			return Number($('#' + id).val());
		}

		private inc(id: string, delta: number): void {
			var value = Number($('#' + id).val());
			if (value != NaN) {
				value += delta;
				$('#' + id).val(String(value));
			}
		}

		private dec(id: string, delta: number): void {
			var value = Number($('#' + id).val());
			if (value != NaN) {
				if (value > 1) {
					value -= delta;
					$('#' + id).val(String(value));
				}
			}
		}

		// Событие View
		viewFuelValueIncrement(): void {
			this.inc('iFuelValue', 1);
			this.viewCalculateFuelCostEvent();
		}

		// Событие View
		viewFuelValueDecrement(): void {
			this.dec('iFuelValue', 1);
			this.viewCalculateFuelCostEvent();
		}

		// Событие View
		viewFundsIncrement(): void {
			this.inc('iFunds', 100);
			this.viewCalculateFuelVolumeEvent();
		}

		// Событие View
		viewFundsDecrement(): void {
			this.dec('iFunds', 100);
			this.viewCalculateFuelVolumeEvent();
		}
		
		// Событие View: Расчитать стоимость по объему
		viewCalculateFuelCostEvent(): void {
			var fuelValueMl: number = MUiFormats.ml(this.getItAsNumber('iFuelValue'));

			if (fuelValueMl != NaN) {
				this.unbindBodyViewEvents();

				//Обновляем view для топлива и заказа
				//this.setItAsString('iFunds', '');
				MUi.updateView('iFuelView', 'iFuelResource', <MLukViews.IFuelViewResource>{
					FuelValueMl: String(this.getItAsNumber('iFuelValue')),
					FundsKop: "-"
				});

				//Передаем Output Model в следующий стейт.
				this.nextStateBy<IOutputModelFuelVolume>('CalculateFuelCost', <IOutputModelFuelVolume>{ "FuelValueMl": fuelValueMl });
			}
		}

		// Событие View: Расчитать объем по стоимости
		viewCalculateFuelVolumeEvent(): void {
			var fundsKop: number = MUiFormats.kop(this.getItAsNumber('iFunds'));
			if (fundsKop != NaN) {
				this.unbindBodyViewEvents();

				//Обновляем view для топлива и заказа
				MUi.updateView('iFuelView', 'iFuelResource', <MLukViews.IFuelViewResource>{
					FuelValueMl: "-",
					FundsKop: String(this.getItAsNumber('iFunds'))
				});

				//Передаем Output Model в следующий стейт.
				this.nextStateBy<IOutputModelFuelCost>('CalculateFuelVolume', <IOutputModelFuelCost>{ "FundsKop": fundsKop });
			}
		}

		// Событие View: Начать налив
		viewShipEvent(): void {
			//Передаем эвент из View в View Model.			
			var fundsKop: number = MUiFormats.kop(this.getItAsNumber('iFunds'));
			if (fundsKop != 0) {
				this.unbindBodyViewEvents();
				MUi.resetView('iCommonView');
				this.nextStateBy<IOutputModelShip>('Ship', <IOutputModelShip>{ "FundsKop": fundsKop, "FuelName": this.getInternalModel<IInternalModel>().FuelName });
			}
		}

		// Событие View: Расчитать стоимость по объему
		viewCalculateFuelCostEventBy(fuelValueMl: number): void {
			//Передаем Output Model в следующий стейт.
			this.unbindBodyViewEvents();

			//Обновляем view для топлива и заказа
			//this.setItAsString('iFuelValue', '');
			MUi.updateView('iFuelView', 'iFuelResource', <MLukViews.IFuelViewResource>{
				FuelValueMl: String(this.getItAsNumber('iFuelValue')),
				FundsKop: "-"
			});

			this.nextStateBy<IOutputModelFuelVolume>('CalculateFuelCost', <IOutputModelFuelVolume>{ "FuelValueMl": fuelValueMl });
		}

		// Событие View: Расчитать объем по стоимости
		viewCalculateFuelVolumeEventBy(fundsKop: number): void {
			//Передаем Output Model в следующий стейт.
			this.unbindBodyViewEvents();

			//Обновляем view для топлива и заказа
			MUi.updateView('iFuelView', 'iFuelResource', <MLukViews.IFuelViewResource>{
				FuelValueMl: "-",
				FundsKop: String(this.getItAsNumber('iFunds'))
			});

			this.nextStateBy<IOutputModelFuelCost>('CalculateFuelVolume', <IOutputModelFuelCost>{ "FundsKop": fundsKop });
		}
	}
}