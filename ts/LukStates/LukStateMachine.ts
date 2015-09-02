module MLukStateMachine {

	// TODO: rewrite state machine, it should not call next state recursively
	export class CState extends MMvvmState.CState<CСollection> {}

	export class CСollection {


		begin: CState = new CState('begin', this.stateManager, this);
		end: CState = new CState('end', this.stateManager, this);

		sideChoice: CState = new CState('sideChoice', this.stateManager, this);
		nozzleAwaiting: CState = new MLukNozzleAwaiting.CState('nozzleAwaiting', this.stateManager, this);
		сostOrVolumeChoice: CState = new CState('сostOrVolumeChoice', this.stateManager, this);
		сostOrVolumeAwaiting: CState = new CState('сostOrVolumeAwaiting', this.stateManager, this);
		payAndShip: CState = new CState('payAndShip', this.stateManager, this);
		payByInvoice: CState = new CState('payByInvoice', this.stateManager, this);
		shipmentStarted: CState = new CState('shipmentStarted', this.stateManager, this);
		done: CState = new CState('done', this.stateManager, this);

		errorAndExit: CState = new CState('errorAndExit', this.stateManager, this);
		
		errorAndRepeatBegin: CState = new CState('errorAndRepeatBegin', this.stateManager, this);
		errorAndRepeatSideChoice: CState = new CState('errorAndRepeatSideChoice', this.stateManager, this);
		errorAndRepeatNozzleAwaiting: CState = new CState('errorAndRepeatNozzleAwaiting', this.stateManager, this);
		errorAndRepeatCostOrVolumeAwaiting: CState = new CState('errorAndRepeatCostOrVolumeAwaiting', this.stateManager, this);
		errorAndRepeatPayByInvoice: CState = new CState('errorAndRepeatPayByInvoice', this.stateManager, this);		
		errorAndRepeatPayAndShip: CState = new CState('errorAndRepeatPayAndShip', this.stateManager, this);
		errorAndRepeatShipmentStarted: CState = new CState('errorAndRepeatshipmentStarted', this.stateManager, this);

		configureMvvm() {
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
		}

		constructor(private stateManager: IObserver) { }
	}

	export class CMachine {

		private stateManager = new MStateMachine.CStateManager();
		private static self: CMachine = null;

		constructor(continueAfterPayment: boolean) {
			var collection = new CСollection(this.stateManager);
			this.configureStateMachine(collection, continueAfterPayment);
			collection.configureMvvm();
		}
				
		static emmitGlobalCancelViewEvent() {
			this.self.stateManager.getCurrentState().customStateEvent({
				eventName: 'GlobalCancelViewEvent',
				body: null
			});
		}

		static isExist(): boolean{
			if (this.self != null) {
				return true;
			}
			return false;
		}

		static selfDestroy() {
			this.self = null;
		}

		static entryPoint() {

			this.self = new CMachine(false);
			this.self.stateManager.handle(new CEvent("Start"));
		}

		static entryPointContinueAfterPayment(shipEventData: MLukPayAndShip.IInputModel) {

			this.self = new CMachine(true);
			this.self.stateManager.handle(new CEvent("Ship", shipEventData));
		}

		private configureStateMachine(collection: CСollection, continueAfterPayment: boolean) {

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
			collection.payByInvoice.registerNextState("Fail", collection.сostOrVolumeChoice);	// ?
			collection.payByInvoice.registerNextState("Ok", collection.payAndShip);	// ?
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
		}
	}
} 