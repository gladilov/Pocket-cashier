var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MInformMessageAndRequest;
(function (MInformMessageAndRequest) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
            this.lockViewId = 'iLockUiView';
        }
        CViewModel.prototype.blockUIEventHandler = function () {
            return this.lockViewId;
        };
        CViewModel.prototype.unblockUIEventHandler = function () {
            MUi.resetView(this.lockViewId);
        };
        CViewModel.prototype.modelWasUpdatedHandler = function (model) {
            var _this = this;
            this.messageBoxWithButton(this.lockViewId, model, function () { return _this.onButtonEvent(); });
            MUi.forceBlockUI(this);
        };
        CViewModel.prototype.onButtonEvent = function (nextStateKey) {
            if (nextStateKey === void 0) { nextStateKey = null; }
            MUi.forceUnblockUI(this);
            if (nextStateKey == null) {
                this.nextStateBy('DoOnButton');
            }
            else {
                this.nextStateBy(nextStateKey);
            }
        };
        return CViewModel;
    })(MMvvm.CViewModelBase);
    MInformMessageAndRequest.CViewModel = CViewModel;
})(MInformMessageAndRequest || (MInformMessageAndRequest = {}));
//# sourceMappingURL=ViewModel.js.map