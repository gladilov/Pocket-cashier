var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukPayAndShip;
(function (MLukPayAndShip) {
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
            this.url = globalAPIPc + "luk-mu/goods/ship";
        }
        CModel.prototype.doModelUpdate = function (order) {
            var _this = this;
            this.forceBlockUI(this);
            if (order.RepeatIfNotShipped != undefined && order.RepeatIfNotShipped == true) {
                globalAPIDebugOutput("\n\Ship, status request:\n");
            }
            else {
                globalAPIDebugOutput("\n\Ship:\n");
            }
            this.jqPost(this.url, order, true, { Authorization: "bearer " + globalAPISessionId })
                .done(function (response) {
                globalAPIDebugOutput(JSON.stringify(response));
                _this.forceUnblockUI(_this);
                //Передаем Output Model в следующий стейт.
                _this.nextStateBy('PaymentAccepted', response);
            })
                .fail(function (jqxhr, textStatus, error) {
                globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
                _this.forceUnblockUI(_this);
                _this.handleError(jqxhr, order);
            });
        };
        CModel.prototype.doHandleError = function (httpStatus, restError, errorMessage, order) {
            var override = false;
            if (restError != null) {
                switch (restError.ErrorCode) {
                    case 'InsufficientFunds':
                        globalAPISavePaymentContext(order);
                        this.nextStateBy('Invoice', order);
                        override = true;
                        break;
                }
            }
            if (!override && errorMessage.nextStateKeyword == 'Repeat') {
                order.RepeatIfNotShipped = true;
                this.nextStateBy('Repeat', {
                    message: {
                        Header: errorMessage.eventBody.message.Header,
                        Text: 'Заправьтесь если отпуск топлива начался. Если нет, то повторите запрос и подождите, или вы можете повесить пистолет.'
                    },
                    buttonName: errorMessage.eventBody.buttonName,
                    errorCode: httpStatus,
                    transferingMessage: order
                });
                override = true;
            }
            return override;
        };
        return CModel;
    })(MLukMvvm.CWaitModelBase);
    MLukPayAndShip.CModel = CModel;
})(MLukPayAndShip || (MLukPayAndShip = {}));
//# sourceMappingURL=Model.js.map