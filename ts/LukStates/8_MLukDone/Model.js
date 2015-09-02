var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukDone;
(function (MLukDone) {
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
        }
        CModel.prototype.doModelUpdate = function (order) {
            globalAPIDebugOutput("\n\Done:\n");
            // Нотифицируем View Model.
            this.modelWasUpdatedBy(order);
        };
        return CModel;
    })(MMvvm.CModelBase);
    MLukDone.CModel = CModel;
})(MLukDone || (MLukDone = {}));
//# sourceMappingURL=Model.js.map