var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukBegin;
(function (MLukBegin) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (gasStationList) {
            //iHeaderView
            //iCommonView
            var _this = this;
            //Включаем основное вью, т.к. только вошли в стейт машину.
            MUi.enableContent('iGeneralAreaView');
            MUi.resetView('iGasStationView');
            MUi.resetView('iCommonView');
            MUi.resetView('iMessageView');
            MUi.resetView('iFuelView');
            MUi.resetView('iLockUiView');
            MUi.applyToView('iHeaderView', 'iMessageResource', { Header: 'Выбирете АЗС:' });
            // Создаем view с списком АЗС и назначаем view евенты
            for (var gasStationId in gasStationList) {
                // Render
                var link = MUi.getResource('iLinkResource').applyAndSetId({
                    Text: gasStationList[gasStationId].GasStationName
                });
                MUi.appendToView('iCommonView', 'iTableResource', {
                    Element: link.html
                });
                // Назначаем событие View: выбрана АЗС				
                // Use bindParentViewEvent() since link nodes will be changed and bound handlers will be lost
                this.bindParentViewEvent('iCommonView', link.id, 'click', function (viewEvent) { return _this.GasStationSelected(viewEvent); }, {
                    "GasStationId": gasStationId
                });
            }
        };
        // Событие View: выбрана АЗС
        CViewModel.prototype.GasStationSelected = function (viewEvent) {
            //Обнавляем view АЗС
            var gasStationList = this.getInternalModel();
            MUi.applyToView('iGasStationView', 'iGasStationResource', {
                'GasStationName': gasStationList[viewEvent.GasStationId].GasStationName,
                'FuelingPointNumber': '..'
            });
            // Чистим view с списком АЗС
            MUi.resetView('iCommonView');
            //Передаем Output Model в следующий стейт.
            this.nextStateBy('GasStationSelected', viewEvent);
        };
        return CViewModel;
    })(MMvvm.CViewModelBase);
    MLukBegin.CViewModel = CViewModel;
})(MLukBegin || (MLukBegin = {}));
//# sourceMappingURL=ViewModel.js.map