var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukStaticViews;
(function (MLukStaticViews) {
    var CMainMenuView = (function (_super) {
        __extends(CMainMenuView, _super);
        function CMainMenuView() {
            var _this = this;
            _super.call(this, null);
            this.conitueAfterPaymentData = null;
            //this.bindParentViewEvent('iMainMenuView', 'iRegistrationAreaView', 'click',(viewId: string) => this.activateAreaView(viewId), 'iRegestryMenuItem');
            this.bindParentViewEvent('iMainMenuView', 'iGeneralMenuItem', 'click', function (viewId) { return _this.activateAreaView(viewId); }, 'iGeneralAreaView');
            this.bindParentViewEvent('iMainMenuView', 'iProfileMenuItem', 'click', function (viewId) { return _this.activateAreaView(viewId); }, 'iProfileAreaView');
            this.bindParentViewEvent('iMainMenuView', 'iAccauntsMenuItem', 'click', function (viewId) { return _this.activateAreaView(viewId); }, 'iAccountsAreaView');
            //this.bindParentViewEvent('iMainMenuView', 'iCancelMenuItem', 'click',(viewId: string) => this.activateAreaView(viewId), 'iGeneralAreaView');
        }
        CMainMenuView.get = function () {
            if (CMainMenuView.singltone == null) {
                CMainMenuView.singltone = new CMainMenuView;
            }
            return CMainMenuView.singltone;
        };
        CMainMenuView.prototype.conitueAfterPaymentDataEventHandler = function (data) {
            this.conitueAfterPaymentData = data;
        };
        CMainMenuView.prototype.deactivateAll = function () {
            MUi.disableContent("iStartAreaView");
            MUi.disableContent("iProfileAreaView");
            MUi.disableContent("iAccountsAreaView");
            MUi.disableContent("iRegistrationAreaView");
            MUi.disableContent("iGeneralAreaView");
        };
        CMainMenuView.prototype.activateAreaView = function (viewId) {
            if (viewId != "") {
                this.deactivateAll();
                MUi.enableContent(viewId);
            }
            if (viewId == "iAccountsAreaView") {
                globalAPIGetAccountInfo();
            }
            else if (viewId == "iGeneralAreaView" && !MLukStateMachine.CMachine.isExist()) {
                if (globalAPISessionId) {
                    if (this.conitueAfterPaymentData == null) {
                        MLukStateMachine.CMachine.entryPoint();
                    }
                    else {
                        var conitueAfterPaymentDataClone = this.conitueAfterPaymentData;
                        this.conitueAfterPaymentData = null;
                        MLukStateMachine.CMachine.entryPointContinueAfterPayment(conitueAfterPaymentDataClone);
                    }
                }
                else {
                    this.activateAreaView('iStartAreaView');
                }
            }
        };
        CMainMenuView.singltone = null;
        return CMainMenuView;
    })(MMvvm.CViewModelBase);
    MLukStaticViews.CMainMenuView = CMainMenuView;
})(MLukStaticViews || (MLukStaticViews = {}));
//# sourceMappingURL=LukView.js.map