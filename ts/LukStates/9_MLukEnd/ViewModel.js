var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukEnd;
(function (MLukEnd) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
        }
        CViewModel.prototype.modelWasUpdatedHandler = function () {
            MUi.resetView('iGasStationView');
            MUi.resetView('iCommonView');
            MUi.resetView('iMessageView');
            MUi.resetView('iFuelView');
            MUi.resetView('iHeaderView');
            this.nextStateBy('DoReset');
            MLukStateMachine.CMachine.selfDestroy();
            globalAPIOnRestart();
        };
        return CViewModel;
    })(MMvvm.CViewModelBase);
    MLukEnd.CViewModel = CViewModel;
})(MLukEnd || (MLukEnd = {}));
//# sourceMappingURL=ViewModel.js.map