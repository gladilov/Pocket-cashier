module MLukPayByInvoice {

	/* View Model logic */

	export class CViewModel extends MLukMvvm.CViewModelBase {

		modelWasUpdatedHandler(model: IInternalModel) {
			
			//iHeaderView
			//iCommonView

			// Обновляем view
			MUi.applyToView('iHeaderView', 'iMessageResource', <MLukViews.IMessageViewResource>{ Header: 'Пополните баланс' });

			// Кнопка Робокассы
			var rkWidget = new globalAPIRobokassaWidget(model.Number, model.FundsKop / 100, false);
			MUi.setView('iCommonView', rkWidget.render());

			// Нажимаем кнопку Робокассы за пользователя
			$('#' + rkWidget.getButtonId()).click();

			// Кнопка "Далее", переход в следующий стейт
			var button = MUi.getResource('iButtonResource').applyAndSetId(<MLukViews.IButtonResource>{
				Text: "Далее"
			});
			MUi.appendResourceToView('iCommonView', button.html);
			this.bindParentViewEvent<IOutputModel>('iCommonView', button.id, 'click',
				(order: IOutputModel) => this.nextStateBy<IOutputModel>('Ok', { FuelName: order.FuelName, FundsKop: order.FundsKop }),
				{ FuelName: model.FuelName, FundsKop: model.FundsKop });

			this.enableCancelMenu();
		}
	}
}