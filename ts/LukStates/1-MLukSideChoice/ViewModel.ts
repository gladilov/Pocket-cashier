module MLukSideChoice {

	/* View Model logic */

	export class CViewModel extends MLukMvvm.CViewModelBase {

		modelWasUpdatedHandler(stationInfo: IInternalModel) {

			//iGasStationView
			//iHeaderView
			//iCommonView

			MUi.resetView('iCommonView');

			// Создаем view с списком сторон и назначаем view эвенты
			MUi.applyToView('iHeaderView', 'iMessageResource', <MLukViews.IMessageViewResource>{ Header: 'Выбирете ТРК:' });
			var fuelingPointList = stationInfo.FuelingPointList;
			for (var index in fuelingPointList) {

				//Render
				var link = MUi.getResource('iLinkResource').applyAndSetId(<MLukViews.ILinkResource>{
					Text: String(fuelingPointList[index].FuelingPointNumber)
				});
				MUi.appendToView('iCommonView', 'iTableResource', <MLukViews.ITableResource>{
					Element: link.html
				});

				// Назначаем событие View: выбрана сторона				
				this.bindParentViewEvent<IOutputModel>('iCommonView', link.id, 'click', (viewEvent: IOutputModel) => this.GasStationSideSelected(viewEvent), {
					"FuelingPointId": fuelingPointList[index].FuelingPointId
				});
			}

			this.enableCancelMenu();
		}

		// Событие View: выбрана сторона
		GasStationSideSelected(viewEvent: IOutputModel) {

			//Обнавляем view АЗС
			var fuelingPointInfo: IFuelingPointInfo = this.getInternalModel<IInternalModel>().FuelingPointList.filter((item) => item.FuelingPointId == viewEvent.FuelingPointId)[0];
			MUi.updateView('iGasStationView', 'iGasStationResource', <MLukViews.IGasStationResource>{
				'FuelingPointNumber': String(fuelingPointInfo.FuelingPointNumber)
			});

			MUi.resetView('iHeaderView');
			MUi.resetView('iCommonView');			

			//Передаем Output Model в следующий стейт.
			this.nextStateBy<IOutputModel>('GasStationSideSelected', viewEvent);
		}
	}
}