var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukStateMachine;
(function (MLukStateMachine) {
    // TODO: rewrite state machine, it should not call next state recursively
    var CState = (function (_super) {
        __extends(CState, _super);
        function CState() {
            _super.apply(this, arguments);
        }
        return CState;
    })(MMvvmState.CState);
    MLukStateMachine.CState = CState;
    var CСollection = (function () {
        function CСollection(stateManager) {
            this.stateManager = stateManager;
            this.begin = new CState('begin', this.stateManager, this);
            this.end = new CState('end', this.stateManager, this);
            this.sideChoice = new CState('sideChoice', this.stateManager, this);
            this.nozzleAwaiting = new MLukNozzleAwaiting.CState('nozzleAwaiting', this.stateManager, this);
            this.сostOrVolumeChoice = new CState('сostOrVolumeChoice', this.stateManager, this);
            this.сostOrVolumeAwaiting = new CState('сostOrVolumeAwaiting', this.stateManager, this);
            this.payAndShip = new CState('payAndShip', this.stateManager, this);
            this.payByInvoice = new CState('payByInvoice', this.stateManager, this);
            this.shipmentStarted = new CState('shipmentStarted', this.stateManager, this);
            this.done = new CState('done', this.stateManager, this);
            this.errorAndExit = new CState('errorAndExit', this.stateManager, this);
            this.errorAndRepeatBegin = new CState('errorAndRepeatBegin', this.stateManager, this);
            this.errorAndRepeatSideChoice = new CState('errorAndRepeatSideChoice', this.stateManager, this);
            this.errorAndRepeatNozzleAwaiting = new CState('errorAndRepeatNozzleAwaiting', this.stateManager, this);
            this.errorAndRepeatCostOrVolumeAwaiting = new CState('errorAndRepeatCostOrVolumeAwaiting', this.stateManager, this);
            this.errorAndRepeatPayByInvoice = new CState('errorAndRepeatPayByInvoice', this.stateManager, this);
            this.errorAndRepeatPayAndShip = new CState('errorAndRepeatPayAndShip', this.stateManager, this);
            this.errorAndRepeatShipmentStarted = new CState('errorAndRepeatshipmentStarted', this.stateManager, this);
        }
        CСollection.prototype.configureMvvm = function () {
            this.begin.createMvvm(MLukBegin.CModel, MLukBegin.CViewModel);
            this.end.createMvvm(MLukEnd.CModel, MLukEnd.CViewModel);
            this.sideChoice.createMvvm(MLukSideChoice.CModel, MLukSideChoice.CViewModel);
            this.nozzleAwaiting.createMvvm(MLukNozzleAwaiting.CModel, MLukNozzleAwaiting.CViewModel);
            this.сostOrVolumeChoice.createMvvm(MLukCostOrVolumeChoice.CModel, MLukCostOrVolumeChoice.CViewModel);
            this.сostOrVolumeAwaiting.createMvvm(MLukCostOrVolumeAwaiting.CModel, MLukCostOrVolumeAwaiting.CViewModel);
            this.payAndShip.createMvvm(MLukPayAndShip.CModel, MLukPayAndShip.CViewModel);
            this.payByInvoice.createMvvm(MLukPayByInvoice.CModel, MLukPayByInvoice.CViewModel);
            this.shipmentStarted.createMvvm(MLukShipmentStarted.CModel, MLukShipmentStarted.CViewModel);
            this.done.createMvvm(MLukDone.CModel, MLukDone.CViewModel);
            this.errorAndExit.createMvvm(MLukErrorAndContinue.CModel, MLukErrorAndContinue.CViewModel);
            this.errorAndRepeatBegin.createMvvm(MLukErrorAndRepeat.CModel, MLukErrorAndRepeat.CViewModel);
            this.errorAndRepeatSideChoice.createMvvm(MLukErrorAndRepeat.CModel, MLukErrorAndRepeat.CViewModel);
            this.errorAndRepeatNozzleAwaiting.createMvvm(MLukErrorAndRepeat.CModel, MLukErrorAndRepeat.CViewModel);
            this.errorAndRepeatCostOrVolumeAwaiting.createMvvm(MLukErrorAndRepeat.CModel, MLukErrorAndRepeat.CViewModel);
            this.errorAndRepeatPayAndShip.createMvvm(MLukErrorAndRepeat.CModel, MLukErrorAndRepeat.CViewModel);
            this.errorAndRepeatPayByInvoice.createMvvm(MLukErrorAndRepeat.CModel, MLukErrorAndRepeat.CViewModel);
            this.errorAndRepeatShipmentStarted.createMvvm(MLukErrorAndRepeat.CModel, MLukErrorAndRepeat.CViewModel);
        };
        return CСollection;
    })();
    MLukStateMachine.CСollection = CСollection;
    var CMachine = (function () {
        function CMachine(continueAfterPayment) {
            this.stateManager = new MStateMachine.CStateManager();
            var collection = new CСollection(this.stateManager);
            this.configureStateMachine(collection, continueAfterPayment);
            collection.configureMvvm();
        }
        CMachine.emmitGlobalCancelViewEvent = function () {
            this.self.stateManager.getCurrentState().customStateEvent({
                eventName: 'GlobalCancelViewEvent',
                body: null
            });
        };
        CMachine.isExist = function () {
            if (this.self != null) {
                return true;
            }
            return false;
        };
        CMachine.selfDestroy = function () {
            this.self = null;
        };
        CMachine.entryPoint = function () {
            this.self = new CMachine(false);
            this.self.stateManager.handle(new CEvent("Start"));
        };
        CMachine.entryPointContinueAfterPayment = function (shipEventData) {
            this.self = new CMachine(true);
            this.self.stateManager.handle(new CEvent("Ship", shipEventData));
        };
        CMachine.prototype.configureStateMachine = function (collection, continueAfterPayment) {
            if (continueAfterPayment) {
                this.stateManager.registerEntryPoint('Ship', collection.payAndShip);
            }
            else {
                this.stateManager.registerEntryPoint('Start', collection.begin);
            }
            collection.begin.registerNextState('GasStationSelected', collection.sideChoice);
            collection.sideChoice.registerNextState("GasStationSideSelected", collection.nozzleAwaiting);
            collection.nozzleAwaiting.registerNextState("NozzleOn", collection.сostOrVolumeChoice);
            collection.сostOrVolumeChoice.registerNextState("CalculateFuelVolume", collection.сostOrVolumeAwaiting);
            collection.сostOrVolumeChoice.registerNextState("CalculateFuelCost", collection.сostOrVolumeAwaiting);
            collection.сostOrVolumeAwaiting.registerNextState("Calculated", collection.сostOrVolumeChoice);
            collection.сostOrVolumeChoice.registerNextState("Ship", collection.payAndShip);
            collection.payAndShip.registerNextState("PaymentAccepted", collection.shipmentStarted);
            collection.payByInvoice.registerNextState("Fail", collection.сostOrVolumeChoice); // ?
            collection.payByInvoice.registerNextState("Ok", collection.payAndShip); // ?
            collection.shipmentStarted.registerNextState("Done", collection.done);
            collection.done.registerNextState("DoExit", collection.end);
            collection.sideChoice.registerNextState("DoExit", collection.end);
            collection.nozzleAwaiting.registerNextState("DoExit", collection.end);
            collection.сostOrVolumeChoice.registerNextState("DoExit", collection.end);
            collection.сostOrVolumeAwaiting.registerNextState("DoExit", collection.end);
            collection.payByInvoice.registerNextState("DoExit", collection.end);
            collection.end.registerNextState("DoReset", this.stateManager.getExitPointState());
            collection.payAndShip.registerNextState("Repeat", collection.errorAndRepeatPayAndShip);
            collection.payAndShip.registerNextState("Continue", collection.errorAndExit);
            collection.payAndShip.registerNextState("Invoice", collection.payByInvoice);
            collection.shipmentStarted.registerNextState("Repeat", collection.errorAndRepeatShipmentStarted);
            collection.shipmentStarted.registerNextState("Continue", collection.errorAndExit);
            collection.begin.registerNextState("Continue", collection.errorAndExit);
            collection.sideChoice.registerNextState("Continue", collection.errorAndExit);
            collection.nozzleAwaiting.registerNextState("Continue", collection.errorAndExit);
            collection.сostOrVolumeAwaiting.registerNextState("Continue", collection.errorAndExit);
            collection.payByInvoice.registerNextState("Continue", collection.errorAndExit);
            collection.errorAndExit.registerNextState("DoContinue", collection.end);
            collection.begin.registerNextState("Repeat", collection.errorAndRepeatBegin);
            collection.sideChoice.registerNextState("Repeat", collection.errorAndRepeatSideChoice);
            collection.nozzleAwaiting.registerNextState("Repeat", collection.errorAndRepeatNozzleAwaiting);
            collection.сostOrVolumeAwaiting.registerNextState("Repeat", collection.errorAndRepeatCostOrVolumeAwaiting);
            collection.payByInvoice.registerNextState("Repeat", collection.errorAndRepeatPayByInvoice);
            collection.errorAndRepeatBegin.registerNextState("DoRepeat", collection.begin);
            collection.errorAndRepeatSideChoice.registerNextState("DoRepeat", collection.sideChoice);
            collection.errorAndRepeatNozzleAwaiting.registerNextState("DoRepeat", collection.nozzleAwaiting);
            collection.errorAndRepeatCostOrVolumeAwaiting.registerNextState("DoRepeat", collection.сostOrVolumeAwaiting);
            collection.errorAndRepeatPayByInvoice.registerNextState("DoRepeat", collection.payByInvoice);
            collection.errorAndRepeatPayAndShip.registerNextState("DoRepeat", collection.payAndShip);
            collection.errorAndRepeatShipmentStarted.registerNextState("DoRepeat", collection.shipmentStarted);
        };
        CMachine.self = null;
        return CMachine;
    })();
    MLukStateMachine.CMachine = CMachine;
})(MLukStateMachine || (MLukStateMachine = {}));
//# sourceMappingURL=LukStateMachine.js.map