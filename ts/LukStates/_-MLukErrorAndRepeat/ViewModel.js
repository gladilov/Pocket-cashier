var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukErrorAndRepeat;
(function (MLukErrorAndRepeat) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (model) {
            //iMessageView
            this.transferingMessage = model.transferingMessage;
            _super.prototype.modelWasUpdatedHandler.call(this, model);
        };
        CViewModel.prototype.onButtonEvent = function () {
            MUi.forceUnblockUI(this);
            this.nextStateBy('DoRepeat', this.transferingMessage);
        };
        return CViewModel;
    })(MInformMessageAndRequest.CViewModel);
    MLukErrorAndRepeat.CViewModel = CViewModel;
})(MLukErrorAndRepeat || (MLukErrorAndRepeat = {}));
//# sourceMappingURL=ViewModel.js.map