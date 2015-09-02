var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukCostOrVolumeAwaiting;
(function (MLukCostOrVolumeAwaiting) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (model) {
            //iGasStationView save
            //iFuelView save
            //iCommonView save
            //iLockUiView
            switch (model.state) {
                case MLukMvvm.EWaitModelState.StartWait:
                    model.waitView = 'iLockUiView';
                    this.messageBox('iLockUiView', { Header: 'Расчет:', Text: 'Ожидайте, производится расчет стоимости...' }, true);
                    this.enableCancelMenu();
                    break;
                case MLukMvvm.EWaitModelState.StopWait:
                    this.messageBox('iLockUiView');
                    this.disableCancelMenu();
                    break;
                default:
                    break;
            }
        };
        return CViewModel;
    })(MLukMvvm.CViewWaitModelBase);
    MLukCostOrVolumeAwaiting.CViewModel = CViewModel;
})(MLukCostOrVolumeAwaiting || (MLukCostOrVolumeAwaiting = {}));
//# sourceMappingURL=ViewModel.js.map