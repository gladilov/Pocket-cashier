var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukDone;
(function (MLukDone) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (receipt) {
            //iGasStationView save
            //iFuelView
            //iMessageView
            var fuelPriceKop = String(String(MUiFormats.rub(receipt.FuelPriceKop)));
            if (receipt.FuelPriceKop == undefined || receipt.FuelPriceKop == null) {
                fuelPriceKop = "-";
            }
            //Обновляем view для топлива и заказа
            MUi.applyToView('iFuelView', 'iFuelResource', {
                FuelName: receipt.FuelName,
                FuelPriceKop: fuelPriceKop,
                FuelValueMl: String(MUiFormats.lit(receipt.FuelValueMl)),
                FundsKop: String(MUiFormats.rub(receipt.FundsKop))
            });
            _super.prototype.modelWasUpdatedHandler.call(this, {
                message: {
                    Header: 'Повесьте пистолет!',
                    Text: '<i>Отгрузка завершена:</i><br><br>\n' + MUi.getViewContent('iFuelView', this.lockViewId)
                },
                buttonName: "Ok",
                errorCode: undefined
            });
        };
        CViewModel.prototype.onButtonEvent = function () {
            _super.prototype.onButtonEvent.call(this, 'DoExit');
        };
        return CViewModel;
    })(MInformMessageAndRequest.CViewModel);
    MLukDone.CViewModel = CViewModel;
})(MLukDone || (MLukDone = {}));
//# sourceMappingURL=ViewModel.js.map