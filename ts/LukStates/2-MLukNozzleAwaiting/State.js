var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukNozzleAwaiting;
(function (MLukNozzleAwaiting) {
    var CState = (function (_super) {
        __extends(CState, _super);
        function CState() {
            _super.apply(this, arguments);
        }
        CState.prototype.doCollectInputModel = function (eventName) {
            var inputModel = MTools.mergeTo(this.collection.sideChoice.getEvent().body, this.collection.begin.getEvent().body);
            return inputModel;
        };
        return CState;
    })(MMvvmState.CState);
    MLukNozzleAwaiting.CState = CState;
})(MLukNozzleAwaiting || (MLukNozzleAwaiting = {}));
//# sourceMappingURL=State.js.map