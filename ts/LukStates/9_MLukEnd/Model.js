var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukEnd;
(function (MLukEnd) {
    /* Input/output Models */
    /* CModelState */
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
        }
        CModel.prototype.doModelUpdate = function () {
            // Нотифицируем View Model.
            this.modelWasUpdatedBy();
        };
        return CModel;
    })(MMvvm.CModelBase);
    MLukEnd.CModel = CModel;
})(MLukEnd || (MLukEnd = {}));
//# sourceMappingURL=Model.js.map