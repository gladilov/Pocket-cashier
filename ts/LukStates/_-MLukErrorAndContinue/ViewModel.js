var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukErrorAndContinue;
(function (MLukErrorAndContinue) {
    /* View Model logic */
    var CViewModel = (function (_super) {
        __extends(CViewModel, _super);
        function CViewModel() {
            _super.apply(this, arguments);
        }
        CViewModel.prototype.modelWasUpdatedHandler = function (model) {
            //iMessageView
            _super.prototype.modelWasUpdatedHandler.call(this, model);
        };
        CViewModel.prototype.onButtonEvent = function () {
            _super.prototype.onButtonEvent.call(this, 'DoContinue');
        };
        return CViewModel;
    })(MInformMessageAndRequest.CViewModel);
    MLukErrorAndContinue.CViewModel = CViewModel;
})(MLukErrorAndContinue || (MLukErrorAndContinue = {}));
//# sourceMappingURL=ViewModel.js.map