var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukSideChoice;
(function (MLukSideChoice) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (stationInfo) {
            //iGasStationView
            //iHeaderView
            //iCommonView
            var _this = this;
            MUi.resetView('iCommonView');
            // Создаем view с списком сторон и назначаем view эвенты
            MUi.applyToView('iHeaderView', 'iMessageResource', { Header: 'Выбирете ТРК:' });
            var fuelingPointList = stationInfo.FuelingPointList;
            for (var index in fuelingPointList) {
                //Render
                var link = MUi.getResource('iLinkResource').applyAndSetId({
                    Text: String(fuelingPointList[index].FuelingPointNumber)
                });
                MUi.appendToView('iCommonView', 'iTableResource', {
                    Element: link.html
                });
                // Назначаем событие View: выбрана сторона				
                this.bindParentViewEvent('iCommonView', link.id, 'click', function (viewEvent) { return _this.GasStationSideSelected(viewEvent); }, {
                    "FuelingPointId": fuelingPointList[index].FuelingPointId
                });
            }
            this.enableCancelMenu();
        };
        // Событие View: выбрана сторона
        CViewModel.prototype.GasStationSideSelected = function (viewEvent) {
            //Обнавляем view АЗС
            var fuelingPointInfo = this.getInternalModel().FuelingPointList.filter(function (item) { return item.FuelingPointId == viewEvent.FuelingPointId; })[0];
            MUi.updateView('iGasStationView', 'iGasStationResource', {
                'FuelingPointNumber': String(fuelingPointInfo.FuelingPointNumber)
            });
            MUi.resetView('iHeaderView');
            MUi.resetView('iCommonView');
            //Передаем Output Model в следующий стейт.
            this.nextStateBy('GasStationSideSelected', viewEvent);
        };
        return CViewModel;
    })(MLukMvvm.CViewModelBase);
    MLukSideChoice.CViewModel = CViewModel;
})(MLukSideChoice || (MLukSideChoice = {}));
//# sourceMappingURL=ViewModel.js.map