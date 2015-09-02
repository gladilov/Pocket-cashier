module MStateMachine {
	
	export enum EStateResult {
		Ok,
		Done,
		Cancel,
		Error,
		UnknownEvent,
		NotImplemented,
		NotStarted
	}

	export interface IState {
		entryToState: (entryEvent: IEvent) => EStateResult;
		getNextState: (entryEventName: string) => IState;
		customStateEvent: (customEvent: IEvent) => EStateResult;
	}

	export class CState implements IState {

		protected stateName: string = "Noname";	// State Name for Debug

		constructor(stateName: string) {
			this.stateName = stateName;
		}

		customStateEvent(customEvent: IEvent){
			return EStateResult.NotImplemented;
		}

		private entryEventNameToStateMap: Array<IState> = [];

		registerNextState(entryEventName: string, state: IState) {
			this.entryEventNameToStateMap[entryEventName] = state;
		}

		entryToState(entryEvent: IEvent) {
			return EStateResult.NotImplemented;
		}

		getNextState(entryEventName: string) {
			return this.entryEventNameToStateMap[entryEventName];
		}
	}

	export class CStateManager implements IObserver {

		private currentState: IState = null;
		private lastStateResult: EStateResult = EStateResult.NotStarted;
		private exitPointState: IState = new CState('ExitPointState');
		private entryPointState: IState = null;

		private restart() {
			this.currentState = this.entryPointState;
			this.lastStateResult = EStateResult.NotStarted;
		}

		registerEntryPoint(entryEventName: string, entryPointState: IState) {
			var entryPoint = new CState('EntryPointState');
			entryPoint.registerNextState(entryEventName, entryPointState);
			this.entryPointState = entryPoint;
			this.restart();
		}

		handle(entryEvent: IEvent) {

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
				// Event dosen't registred
				else if (nextState == null) {
					if (this.lastStateResult != EStateResult.NotStarted) {
						this.lastStateResult = EStateResult.UnknownEvent;
					}
				}
				// Executing state
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
		}

		getLastStateResult() {
			return this.lastStateResult;
		}

		getExitPointState() {
			return this.exitPointState;
		}

		getCurrentState() {
			return this.currentState;
		}
	}

	export class CEventRepeaterState extends CState {

		public observer: IObserver = null;

		constructor(name: string) {
			super(name);
		}

		setObserver(observer: IObserver) {
			this.observer = observer;
		}

		entryToState(entryEvent: IEvent) {
			if (this.observer != null) {
				this.observer.handle(entryEvent);
				return EStateResult.Ok;
			}
			else {
				return EStateResult.Error;
			}
		}
	}
}