module MLukBegin {

	/* View Model logic */

	export class CViewModel extends MMvvm.CViewModelBase{
		
		modelWasUpdatedHandler(gasStationList: IInternalModel) {
			
			//iHeaderView
			//iCommonView

			//Включаем основное вью, т.к. только вошли в стейт машину.
			MUi.enableContent('iGeneralAreaView');
			MUi.resetView('iGasStationView');
			MUi.resetView('iCommonView');
			MUi.resetView('iMessageView');
			MUi.resetView('iFuelView');
			MUi.resetView('iLockUiView');
			
			MUi.applyToView('iHeaderView', 'iMessageResource', <MLukViews.IMessageViewResource>{ Header: 'Выбирете АЗС:'});

			// Создаем view с списком АЗС и назначаем view евенты
			for (var gasStationId in gasStationList) {

				// Render
				var link = MUi.getResource('iLinkResource').applyAndSetId(<MLukViews.ILinkResource>{
					Text: gasStationList[gasStationId].GasStationName
				});
				MUi.appendToView('iCommonView', 'iTableResource', <MLukViews.ITableResource>{
					Element: link.html
				});
				
				// Назначаем событие View: выбрана АЗС				
				// Use bindParentViewEvent() since link nodes will be changed and bound handlers will be lost
				this.bindParentViewEvent<IOutputModel>('iCommonView', link.id, 'click', (viewEvent: IOutputModel) => this.GasStationSelected(viewEvent), {
					"GasStationId": gasStationId
				});
			}
		}

		// Событие View: выбрана АЗС
		GasStationSelected(viewEvent: IOutputModel) {

			//Обнавляем view АЗС
			var gasStationList = this.getInternalModel<IInternalModel>();
			MUi.applyToView('iGasStationView', 'iGasStationResource', <MLukViews.IGasStationResource>{
				'GasStationName': gasStationList[viewEvent.GasStationId].GasStationName,
				'FuelingPointNumber': '..'
			});

			// Чистим view с списком АЗС
			MUi.resetView('iCommonView');
			
			//Передаем Output Model в следующий стейт.
			this.nextStateBy<IOutputModel>('GasStationSelected', viewEvent);
		}

	}
}