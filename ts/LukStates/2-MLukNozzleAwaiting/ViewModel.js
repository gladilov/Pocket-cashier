var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukNozzleAwaiting;
(function (MLukNozzleAwaiting) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (model) {
            //iGasStationView	save
            //iLockUiView
            switch (model.state) {
                case MLukMvvm.EWaitModelState.StartWait:
                    if (globalPhaseVersion == 1) {
                        model.waitView = 'iLockUiView';
                        this.messageBox(model.waitView, { Header: 'Пистолет', Text: 'Вставьте пистолет в бак...' }, true);
                    }
                    else {
                        model.waitView = 'iNozzleAwaitingAnimationView';
                        MUi.enableContent('iNozzleAwaitingAnimationView');
                    }
                    this.enableCancelMenu();
                    break;
                case MLukMvvm.EWaitModelState.StopWait:
                    // Чистим view сообщения
                    if (globalPhaseVersion == 1) {
                        MUi.resetView('iLockUiView');
                    }
                    else {
                        MUi.resetView('iNozzleAwaitingAnimationView');
                    }
                    this.disableCancelMenu();
                    break;
                case MLukMvvm.EWaitModelState.Other:
                    //Создаем view для топлива и заказа
                    //Render
                    MUi.applyToView('iFuelView', 'iFuelResource', {
                        FuelName: model.fuelName.FuelName,
                        FuelPriceKop: "-",
                        FuelValueMl: "",
                        FundsKop: ""
                    });
                    break;
                default:
                    break;
            }
        };
        return CViewModel;
    })(MLukMvvm.CViewWaitModelBase);
    MLukNozzleAwaiting.CViewModel = CViewModel;
})(MLukNozzleAwaiting || (MLukNozzleAwaiting = {}));
//# sourceMappingURL=ViewModel.js.map