var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukPayByInvoice;
(function (MLukPayByInvoice) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (model) {
            //iHeaderView
            //iCommonView
            var _this = this;
            // Обновляем view
            MUi.applyToView('iHeaderView', 'iMessageResource', { Header: 'Пополните баланс' });
            // Кнопка Робокассы
            var rkWidget = new globalAPIRobokassaWidget(model.Number, model.FundsKop / 100, false);
            MUi.setView('iCommonView', rkWidget.render());
            // Нажимаем кнопку Робокассы за пользователя
            $('#' + rkWidget.getButtonId()).click();
            // Кнопка "Далее", переход в следующий стейт
            var button = MUi.getResource('iButtonResource').applyAndSetId({
                Text: "Далее"
            });
            MUi.appendResourceToView('iCommonView', button.html);
            this.bindParentViewEvent('iCommonView', button.id, 'click', function (order) { return _this.nextStateBy('Ok', { FuelName: order.FuelName, FundsKop: order.FundsKop }); }, { FuelName: model.FuelName, FundsKop: model.FundsKop });
            this.enableCancelMenu();
        };
        return CViewModel;
    })(MLukMvvm.CViewModelBase);
    MLukPayByInvoice.CViewModel = CViewModel;
})(MLukPayByInvoice || (MLukPayByInvoice = {}));
//# sourceMappingURL=ViewModel.js.map