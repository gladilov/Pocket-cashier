var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukCostOrVolumeChoice;
(function (MLukCostOrVolumeChoice) {
    /* CModelState */
    var CModelState = (function (_super) {
        __extends(CModelState, _super);
        function CModelState() {
            _super.apply(this, arguments);
        }
        CModelState.prototype.doCollectData = function (eventName) {
            var muState;
            this.stateSet.sideChoiceState.getLastEvent();
            switch (eventName) {
                case 'NozzleOn': break;
                case 'Calculated': break;
                default:
                    throw new Error("Error: The abstract method called.");
                    break;
            }
            return muState;
        };
        return CModelState;
    })(LukStateMachine.CLukMvvmBaseState);
    MLukCostOrVolumeChoice.CModelState = CModelState;
})(MLukCostOrVolumeChoice || (MLukCostOrVolumeChoice = {}));
//# sourceMappingURL=StateModel.js.map