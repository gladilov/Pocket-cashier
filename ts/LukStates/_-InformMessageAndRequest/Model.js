var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MInformMessageAndRequest;
(function (MInformMessageAndRequest) {
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
        }
        CModel.prototype.doModelUpdate = function (eventBody) {
            this.modelWasUpdatedBy(eventBody);
        };
        return CModel;
    })(MMvvm.CModelBase);
    MInformMessageAndRequest.CModel = CModel;
})(MInformMessageAndRequest || (MInformMessageAndRequest = {}));
//# sourceMappingURL=Model.js.map