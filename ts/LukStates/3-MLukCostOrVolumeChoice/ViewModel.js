var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukCostOrVolumeChoice;
(function (MLukCostOrVolumeChoice) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
            this.startShipButtionWasActivated = false;
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (receipt) {
            //iGasStationView save
            //iFuelView
            //iCommonView
            var _this = this;
            //Обновляем view для топлива и заказа					
            var fuelPriceKop = String(String(MUiFormats.rub(receipt.FuelPriceKop)));
            if (receipt.FuelPriceKop == undefined || receipt.FuelPriceKop == null) {
                fuelPriceKop = "-";
            }
            if (receipt.FundsKop != undefined) {
                // Расчет был произведен хоть раз
                MUi.applyToView('iFuelView', 'iFuelResource', {
                    FuelName: receipt.FuelName,
                    FuelPriceKop: fuelPriceKop,
                    FuelValueMl: String(MUiFormats.lit(receipt.FuelValueMl)),
                    FundsKop: String(MUiFormats.rub(receipt.FundsKop))
                });
                MUi.updateView('iCommonView', 'iFuelValueAndFundsResource', {
                    FuelValueLit: String(MUiFormats.lit(receipt.FuelValueMl)),
                    FundsRub: String(MUiFormats.rub(receipt.FundsKop))
                });
                if (!this.startShipButtionWasActivated) {
                    // Начать налив
                    var link = MUi.getResource('iLinkResource').applyAndSetId({
                        Text: "Начать отпуск топлива"
                    });
                    MUi.appendToView('iCommonView', 'iTableResource', {
                        Element: link.html
                    });
                    this.bindParentViewEvent('iCommonView', link.id, 'click', function () { return _this.viewShipEvent(); });
                    this.startShipButtionWasActivated = true;
                }
            }
            else {
                // Расчет не был произведен
                MUi.applyToView('iFuelView', 'iFuelResource', {
                    FuelName: receipt.FuelName,
                    FuelPriceKop: "-",
                    FuelValueMl: "-",
                    FundsKop: "-"
                });
                MUi.updateView('iCommonView', 'iFuelValueAndFundsResource', {
                    FuelValueLit: "",
                    FundsRub: ""
                });
            }
            this.bindParentViewEvent('iCommonView', 'iFuelValueInc', 'click', function () { return _this.viewFuelValueIncrement(); });
            this.bindParentViewEvent('iCommonView', 'iFuelValueDec', 'click', function () { return _this.viewFuelValueDecrement(); });
            this.bindParentViewEvent('iCommonView', 'iFundsInc', 'click', function () { return _this.viewFundsIncrement(); });
            this.bindParentViewEvent('iCommonView', 'iFundsDec', 'click', function () { return _this.viewFundsDecrement(); });
            this.bindParentViewEvent('iCommonView', 'iFunds', 'change', function () { return _this.viewCalculateFuelVolumeEvent(); });
            this.bindParentViewEvent('iCommonView', 'iFuelValue', 'change', function () { return _this.viewCalculateFuelCostEvent(); });
            // Расчет 10 Литров
            var link = MUi.getResource('iLinkResource').applyAndSetId({
                Text: "Расчет для 10 л"
            });
            MUi.appendToView('iCommonView', 'iTableResource', {
                Element: link.html
            });
            this.bindParentViewEvent('iCommonView', link.id, 'click', function (fuelValueMl) { return _this.viewCalculateFuelCostEventBy(fuelValueMl); }, 10000);
            // Расчет 1000 Руб
            var link = MUi.getResource('iLinkResource').applyAndSetId({
                Text: "Расчет для 1000 р."
            });
            MUi.appendToView('iCommonView', 'iTableResource', {
                Element: link.html
            });
            this.bindParentViewEvent('iCommonView', link.id, 'click', function (fundsKop) { return _this.viewCalculateFuelVolumeEventBy(fundsKop); }, 100000);
            this.enableCancelMenu();
        };
        CViewModel.prototype.cancelEventHandler = function () {
            this.unbindBodyViewEvents();
        };
        CViewModel.prototype.unbindBodyViewEvents = function () {
            this.unbindParentViewEvent('iCommonView', 'iFuelValueInc', 'click');
            this.unbindParentViewEvent('iCommonView', 'iFuelValueDec', 'click');
            this.unbindParentViewEvent('iCommonView', 'iFundsInc', 'click');
            this.unbindParentViewEvent('iCommonView', 'iFundsDec', 'click');
            this.unbindParentViewEvent('iCommonView', 'iFunds', 'change');
            this.unbindParentViewEvent('iCommonView', 'iFuelValue', 'change');
            this.startShipButtionWasActivated = false;
        };
        /*private setItAsString(id: string, value: string): void {
            $('#' + id).attr('value', value);
        }

        private setItAsNumber(id: string, value: number): void {
            $('#' + id).attr('value', String(value));
        }*/
        CViewModel.prototype.getItAsNumber = function (id) {
            return Number($('#' + id).val());
        };
        CViewModel.prototype.inc = function (id, delta) {
            var value = Number($('#' + id).val());
            if (value != NaN) {
                value += delta;
                $('#' + id).val(String(value));
            }
        };
        CViewModel.prototype.dec = function (id, delta) {
            var value = Number($('#' + id).val());
            if (value != NaN) {
                if (value > 1) {
                    value -= delta;
                    $('#' + id).val(String(value));
                }
            }
        };
        // Событие View
        CViewModel.prototype.viewFuelValueIncrement = function () {
            this.inc('iFuelValue', 1);
            this.viewCalculateFuelCostEvent();
        };
        // Событие View
        CViewModel.prototype.viewFuelValueDecrement = function () {
            this.dec('iFuelValue', 1);
            this.viewCalculateFuelCostEvent();
        };
        // Событие View
        CViewModel.prototype.viewFundsIncrement = function () {
            this.inc('iFunds', 100);
            this.viewCalculateFuelVolumeEvent();
        };
        // Событие View
        CViewModel.prototype.viewFundsDecrement = function () {
            this.dec('iFunds', 100);
            this.viewCalculateFuelVolumeEvent();
        };
        // Событие View: Расчитать стоимость по объему
        CViewModel.prototype.viewCalculateFuelCostEvent = function () {
            var fuelValueMl = MUiFormats.ml(this.getItAsNumber('iFuelValue'));
            if (fuelValueMl != NaN) {
                this.unbindBodyViewEvents();
                //Обновляем view для топлива и заказа
                //this.setItAsString('iFunds', '');
                MUi.updateView('iFuelView', 'iFuelResource', {
                    FuelValueMl: String(this.getItAsNumber('iFuelValue')),
                    FundsKop: "-"
                });
                //Передаем Output Model в следующий стейт.
                this.nextStateBy('CalculateFuelCost', { "FuelValueMl": fuelValueMl });
            }
        };
        // Событие View: Расчитать объем по стоимости
        CViewModel.prototype.viewCalculateFuelVolumeEvent = function () {
            var fundsKop = MUiFormats.kop(this.getItAsNumber('iFunds'));
            if (fundsKop != NaN) {
                this.unbindBodyViewEvents();
                //Обновляем view для топлива и заказа
                MUi.updateView('iFuelView', 'iFuelResource', {
                    FuelValueMl: "-",
                    FundsKop: String(this.getItAsNumber('iFunds'))
                });
                //Передаем Output Model в следующий стейт.
                this.nextStateBy('CalculateFuelVolume', { "FundsKop": fundsKop });
            }
        };
        // Событие View: Начать налив
        CViewModel.prototype.viewShipEvent = function () {
            //Передаем эвент из View в View Model.			
            var fundsKop = MUiFormats.kop(this.getItAsNumber('iFunds'));
            if (fundsKop != 0) {
                this.unbindBodyViewEvents();
                MUi.resetView('iCommonView');
                this.nextStateBy('Ship', { "FundsKop": fundsKop, "FuelName": this.getInternalModel().FuelName });
            }
        };
        // Событие View: Расчитать стоимость по объему
        CViewModel.prototype.viewCalculateFuelCostEventBy = function (fuelValueMl) {
            //Передаем Output Model в следующий стейт.
            this.unbindBodyViewEvents();
            //Обновляем view для топлива и заказа
            //this.setItAsString('iFuelValue', '');
            MUi.updateView('iFuelView', 'iFuelResource', {
                FuelValueMl: String(this.getItAsNumber('iFuelValue')),
                FundsKop: "-"
            });
            this.nextStateBy('CalculateFuelCost', { "FuelValueMl": fuelValueMl });
        };
        // Событие View: Расчитать объем по стоимости
        CViewModel.prototype.viewCalculateFuelVolumeEventBy = function (fundsKop) {
            //Передаем Output Model в следующий стейт.
            this.unbindBodyViewEvents();
            //Обновляем view для топлива и заказа
            MUi.updateView('iFuelView', 'iFuelResource', {
                FuelValueMl: "-",
                FundsKop: String(this.getItAsNumber('iFunds'))
            });
            this.nextStateBy('CalculateFuelVolume', { "FundsKop": fundsKop });
        };
        return CViewModel;
    })(MLukMvvm.CViewModelBase);
    MLukCostOrVolumeChoice.CViewModel = CViewModel;
})(MLukCostOrVolumeChoice || (MLukCostOrVolumeChoice = {}));
//# sourceMappingURL=ViewModel.js.map