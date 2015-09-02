var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MMvvmState;
(function (MMvvmState) {
    var CState = (function (_super) {
        __extends(CState, _super);
        function CState(name, stateManager, collection) {
            _super.call(this, name);
            this.stateManager = stateManager;
            this.collection = collection;
            this.outputModelInterceptor = new CEventStoringInterceptor;
            this.viewModel = null;
            this.model = null;
            this.outputModelInterceptor.setSuccessor(stateManager);
        }
        CState.prototype.customStateEvent = function (customEvent) {
            return this.viewModel.globalEvent(customEvent);
        };
        CState.prototype.createMvvm = function (newModel, newViewModel) {
            this.viewModel = new newViewModel(this.outputModelInterceptor);
            this.model = new newModel(this.viewModel.getObserver(), this.outputModelInterceptor);
            this.setObserver(this.model.getObserver());
        };
        CState.prototype.entryToState = function (entryEvent) {
            globalAPIDebugOutput("\n\n\----=======[" + this.stateName + "]=======----\n");
            return _super.prototype.entryToState.call(this, new CEvent(entryEvent.eventName, this.doCollectInputModel(entryEvent.eventName, entryEvent.body)));
        };
        CState.prototype.doCollectInputModel = function (eventName, eventBody) {
            return eventBody;
        };
        CState.prototype.getEvent = function () {
            if (this.outputModelInterceptor.events.length <= 0) {
                throw new Error("Error: out of array range.");
            }
            return this.outputModelInterceptor.events[this.outputModelInterceptor.events.length - 1];
        };
        CState.prototype.getEventsHistory = function () {
            return this.outputModelInterceptor.events;
        };
        return CState;
    })(MStateMachine.CEventRepeaterState);
    MMvvmState.CState = CState;
})(MMvvmState || (MMvvmState = {}));
//# sourceMappingURL=MvvmState.js.map