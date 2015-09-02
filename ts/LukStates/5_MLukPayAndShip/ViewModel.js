var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukPayAndShip;
(function (MLukPayAndShip) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
            this.lockViewId = 'iLockUiView';
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (model) {
            //iGasStationView save
            //iFuelView save
            //iLockUiView
            switch (model.state) {
                case MLukMvvm.EWaitModelState.StartWait:
                    model.waitView = this.lockViewId;
                    this.messageBox(this.lockViewId, { Header: 'Оплата:', Text: '<i>Ожидайте, производится оплата:</i><br><br>\n' + MUi.getViewContent('iFuelView', this.lockViewId) }, true);
                    break;
                case MLukMvvm.EWaitModelState.StopWait:
                    this.messageBox(this.lockViewId);
                    break;
                default:
                    break;
            }
        };
        return CViewModel;
    })(MLukMvvm.CViewWaitModelBase);
    MLukPayAndShip.CViewModel = CViewModel;
})(MLukPayAndShip || (MLukPayAndShip = {}));
//# sourceMappingURL=ViewModel.js.map