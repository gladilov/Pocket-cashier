var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukCostOrVolumeAwaiting;
(function (MLukCostOrVolumeAwaiting) {
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
            this.url = globalAPIPc + "luk-mu/goods/cost";
        }
        CModel.prototype.doModelUpdate = function (fuelCostOrVolume) {
            var _this = this;
            this.forceBlockUI(this);
            globalAPIDebugOutput("\n\CostOrVolumeAwaiting:\n");
            this.jqPost(this.url, fuelCostOrVolume, true, { Authorization: "bearer " + globalAPISessionId })
                .done(function (response) {
                globalAPIDebugOutput(JSON.stringify(response));
                _this.forceUnblockUI(_this);
                //Передаем Output Model в следующий стейт.
                _this.nextStateBy('Calculated', response);
            })
                .fail(function (jqxhr, textStatus, error) {
                globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
                _this.forceUnblockUI(_this);
                _this.handleError(jqxhr, fuelCostOrVolume);
            });
        };
        return CModel;
    })(MLukMvvm.CWaitModelBase);
    MLukCostOrVolumeAwaiting.CModel = CModel;
})(MLukCostOrVolumeAwaiting || (MLukCostOrVolumeAwaiting = {}));
//# sourceMappingURL=Model.js.map