var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukBegin;
(function (MLukBegin) {
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
            this.url = globalAPIPc + "luk-mu/stations";
        }
        CModel.prototype.doModelUpdate = function () {
            var _this = this;
            this.forceBlockUI();
            globalAPIDebugOutput("\n\getStations:\n");
            this.jqGet(this.url, null, false, { Authorization: "bearer " + globalAPISessionId })
                .done(function (response) {
                globalAPIDebugOutput(JSON.stringify(response));
                _this.forceUnblockUI();
                // Нотифицируем View Model.
                _this.modelWasUpdatedBy(response);
            })
                .fail(function (jqxhr, textStatus, error) {
                _this.forceUnblockUI();
                globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
                _this.handleError(jqxhr);
            });
        };
        return CModel;
    })(MLukMvvm.CWaitModelBase);
    MLukBegin.CModel = CModel;
})(MLukBegin || (MLukBegin = {}));
//# sourceMappingURL=Model.js.map