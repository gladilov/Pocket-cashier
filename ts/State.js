var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MStateMachine;
(function (MStateMachine) {
    (function (EStateResult) {
        EStateResult[EStateResult["Ok"] = 0] = "Ok";
        EStateResult[EStateResult["Done"] = 1] = "Done";
        EStateResult[EStateResult["Cancel"] = 2] = "Cancel";
        EStateResult[EStateResult["Error"] = 3] = "Error";
        EStateResult[EStateResult["UnknownEvent"] = 4] = "UnknownEvent";
        EStateResult[EStateResult["NotImplemented"] = 5] = "NotImplemented";
        EStateResult[EStateResult["NotStarted"] = 6] = "NotStarted";
    })(MStateMachine.EStateResult || (MStateMachine.EStateResult = {}));
    var EStateResult = MStateMachine.EStateResult;
    var CState = (function () {
        function CState(stateName) {
            this.stateName = "Noname"; // State Name for Debug
            this.entryEventNameToStateMap = [];
            this.stateName = stateName;
        }
        CState.prototype.customStateEvent = function (customEvent) {
            return EStateResult.NotImplemented;
        };
        CState.prototype.registerNextState = function (entryEventName, state) {
            this.entryEventNameToStateMap[entryEventName] = state;
        };
        CState.prototype.entryToState = function (entryEvent) {
            return EStateResult.NotImplemented;
        };
        CState.prototype.getNextState = function (entryEventName) {
            return this.entryEventNameToStateMap[entryEventName];
        };
        return CState;
    })();
    MStateMachine.CState = CState;
    var CStateManager = (function () {
        function CStateManager() {
            this.currentState = null;
            this.lastStateResult = EStateResult.NotStarted;
            this.exitPointState = new CState('ExitPointState');
            this.entryPointState = null;
        }
        CStateManager.prototype.restart = function () {
            this.currentState = this.entryPointState;
            this.lastStateResult = EStateResult.NotStarted;
        };
        CStateManager.prototype.registerEntryPoint = function (entryEventName, entryPointState) {
            var entryPoint = new CState('EntryPointState');
            entryPoint.registerNextState(entryEventName, entryPointState);
            this.entryPointState = entryPoint;
            this.restart();
        };
        CStateManager.prototype.handle = function (entryEvent) {
            if (this.lastStateResult == EStateResult.Done) {
                this.restart();
            }
            if (this.currentState != null) {
                var nextState = this.currentState.getNextState(entryEvent.eventName);
                // We reash the exit point
                if (nextState == this.exitPointState) {
                    if (this.lastStateResult != EStateResult.NotStarted) {
                        this.lastStateResult = EStateResult.Done;
                    }
                }
                else if (nextState == null) {
                    if (this.lastStateResult != EStateResult.NotStarted) {
                        this.lastStateResult = EStateResult.UnknownEvent;
                    }
                }
                else {
                    this.currentState = nextState;
                    this.lastStateResult = nextState.entryToState(entryEvent);
                }
            }
            switch (this.lastStateResult) {
                case EStateResult.Ok: break;
                case EStateResult.Done: break;
                case EStateResult.Cancel: break;
                case EStateResult.Error: throw new Error("Error: CState.EntryToState!");
                case EStateResult.NotImplemented: throw new Error("Error: CState.EntryToState doesn't implemented!");
                case EStateResult.NotStarted: throw new Error("Error: CState.EntryToState doesn't recive start event yet!");
                case EStateResult.UnknownEvent: throw new Error("Error: The event doesn't registred for this state!");
                default: throw new Error("Error: CStateManager error!");
            }
        };
        CStateManager.prototype.getLastStateResult = function () {
            return this.lastStateResult;
        };
        CStateManager.prototype.getExitPointState = function () {
            return this.exitPointState;
        };
        CStateManager.prototype.getCurrentState = function () {
            return this.currentState;
        };
        return CStateManager;
    })();
    MStateMachine.CStateManager = CStateManager;
    var CEventRepeaterState = (function (_super) {
        __extends(CEventRepeaterState, _super);
        function CEventRepeaterState(name) {
            _super.call(this, name);
            this.observer = null;
        }
        CEventRepeaterState.prototype.setObserver = function (observer) {
            this.observer = observer;
        };
        CEventRepeaterState.prototype.entryToState = function (entryEvent) {
            if (this.observer != null) {
                this.observer.handle(entryEvent);
                return EStateResult.Ok;
            }
            else {
                return EStateResult.Error;
            }
        };
        return CEventRepeaterState;
    })(CState);
    MStateMachine.CEventRepeaterState = CEventRepeaterState;
})(MStateMachine || (MStateMachine = {}));
//# sourceMappingURL=State.js.map