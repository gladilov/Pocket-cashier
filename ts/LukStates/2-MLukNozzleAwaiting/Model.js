var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukNozzleAwaiting;
(function (MLukNozzleAwaiting) {
    /* Model logic */
    var CModel = (function (_super) {
        __extends(CModel, _super);
        function CModel() {
            _super.apply(this, arguments);
            this.url = globalAPIPc + "luk-mu/user/checkin";
        }
        CModel.prototype.doModelUpdate = function (gasStationSide) {
            var _this = this;
            this.forceBlockUI(this);
            globalAPIDebugOutput("\n\waitNozzleOn:\n");
            this.jqPost(this.url, gasStationSide, true, { Authorization: "bearer " + globalAPISessionId })
                .done(function (response) {
                globalAPIDebugOutput(JSON.stringify(response));
                _this.forceUnblockUI(_this);
                // Нотифицируем View Model.
                var model = new CInternalModel;
                model.fuelName = response;
                model.state = MLukMvvm.EWaitModelState.Other;
                _this.modelWasUpdatedBy(model);
                //Передаем Output Model в следующий стейт.
                _this.nextStateBy('NozzleOn', response);
            })
                .fail(function (jqxhr, textStatus, error) {
                globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
                _this.forceUnblockUI(_this);
                _this.handleError(jqxhr, gasStationSide);
            });
        };
        return CModel;
    })(MLukMvvm.CWaitModelBase);
    MLukNozzleAwaiting.CModel = CModel;
    var CInternalModel = (function () {
        function CInternalModel() {
        }
        return CInternalModel;
    })();
    MLukNozzleAwaiting.CInternalModel = CInternalModel;
})(MLukNozzleAwaiting || (MLukNozzleAwaiting = {}));
//# sourceMappingURL=Model.js.map