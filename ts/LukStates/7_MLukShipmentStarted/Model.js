var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukShipmentStarted;
(function (MLukShipmentStarted) {
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
            this.url = globalAPIPc + "luk-mu/goods/status";
        }
        CModel.prototype.doModelUpdate = function () {
            var _this = this;
            this.forceBlockUI(this);
            globalAPIDebugOutput("\n\Ship:\n");
            this.jqGet(this.url, null, true, { Authorization: "bearer " + globalAPISessionId })
                .done(function (response) {
                globalAPIDebugOutput(JSON.stringify(response));
                _this.forceUnblockUI(_this);
                //Передаем Output Model в следующий стейт.
                _this.nextStateBy('Done', response);
            })
                .fail(function (jqxhr, textStatus, error) {
                globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
                _this.forceUnblockUI(_this);
                _this.handleError(jqxhr);
            });
        };
        CModel.prototype.doHandleError = function (httpStatus, restError, errorMessage, emptyModel) {
            var override = false;
            if (errorMessage.nextStateKeyword == 'Repeat') {
                this.nextStateBy('Repeat', {
                    message: {
                        Header: errorMessage.eventBody.message.Header,
                        Text: 'Дождитесь окончания заправки. Повторить запрос?',
                    },
                    buttonName: errorMessage.eventBody.buttonName,
                    errorCode: httpStatus,
                    transferingMessage: emptyModel
                });
                override = true;
            }
            return override;
        };
        return CModel;
    })(MLukMvvm.CWaitModelBase);
    MLukShipmentStarted.CModel = CModel;
})(MLukShipmentStarted || (MLukShipmentStarted = {}));
//# sourceMappingURL=Model.js.map