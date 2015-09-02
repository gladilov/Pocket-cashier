var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukSideChoice;
(function (MLukSideChoice) {
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
            this.url = globalAPIPc + "luk-mu/station/";
        }
        CModel.prototype.doModelUpdate = function (inputModel) {
            var _this = this;
            this.forceBlockUI();
            globalAPIDebugOutput("\n\getStationDetails:\n");
            this.jqGet(this.url + inputModel.GasStationId, null, false, { Authorization: "bearer " + globalAPISessionId })
                .done(function (response) {
                globalAPIDebugOutput(JSON.stringify(response));
                // Нотифицируем View Model.	
                _this.forceUnblockUI();
                _this.modelWasUpdatedBy(response);
            })
                .fail(function (jqxhr, textStatus, error) {
                globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
                _this.forceUnblockUI();
                _this.handleError(jqxhr, inputModel);
            });
        };
        return CModel;
    })(MLukMvvm.CWaitModelBase);
    MLukSideChoice.CModel = CModel;
})(MLukSideChoice || (MLukSideChoice = {}));
//# sourceMappingURL=Model.js.map