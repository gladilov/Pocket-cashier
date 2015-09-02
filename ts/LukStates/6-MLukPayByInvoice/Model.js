var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukPayByInvoice;
(function (MLukPayByInvoice) {
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
            this.url = globalAPIPc + "luk-mu/goods/ship";
        }
        CModel.prototype.doModelUpdate = function (order) {
            var _this = this;
            globalAPIDebugOutput("\n\Robokassa:\n");
            var model = new CInternalModel();
            model.FuelName = order.FuelName;
            model.FundsKop = order.FundsKop;
            this.getAccountNumber(order, function (acc) {
                model.Number = acc;
                // Нотифицируем View Model.
                _this.modelWasUpdatedBy(model);
            });
        };
        CModel.prototype.getAccountNumber = function (order, cb) {
            var _this = this;
            var accUrl = globalAPIPc + "account/info";
            globalAPIDebugOutput("\n\ngetAccountNumber:\n");
            this.forceBlockUI();
            this.jqGet(accUrl, null, false, { Authorization: "bearer " + globalAPISessionId })
                .done(function (response) {
                globalAPIDebugOutput(JSON.stringify(response));
                _this.forceUnblockUI();
                cb(response.Result[0].Number);
            })
                .fail(function (jqxhr, textStatus, error) {
                globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
                _this.forceUnblockUI();
                _this.handleError(jqxhr, order);
            });
        };
        return CModel;
    })(MLukMvvm.CWaitModelBase);
    MLukPayByInvoice.CModel = CModel;
    var CInternalModel = (function () {
        function CInternalModel() {
        }
        return CInternalModel;
    })();
})(MLukPayByInvoice || (MLukPayByInvoice = {}));
//# sourceMappingURL=Model.js.map