module MMvvmState  {

	export class CState<TCollection> extends MStateMachine.CEventRepeaterState {

		constructor(name: string, private stateManager: IObserver, protected collection: TCollection) {
			super(name);
			this.outputModelInterceptor.setSuccessor(stateManager);	

		}

		customStateEvent(customEvent: IEvent) {			
			return this.viewModel.globalEvent(customEvent);
		}

		private outputModelInterceptor = new CEventStoringInterceptor;
		private viewModel: MMvvm.CViewModelBase = null;
		private model: MMvvm.CModelBase = null;
				
		createMvvm<TModel extends MMvvm.CModelBase, TViewModel extends MMvvm.CViewModelBase>(newModel: { new (successor: IObserver, stateManager: IObserver): TModel; }, newViewModel: { new (stateManager: IObserver): TViewModel; }): void {

			this.viewModel = new newViewModel(this.outputModelInterceptor);
			this.model = new newModel(this.viewModel.getObserver(), this.outputModelInterceptor);
			this.setObserver(this.model.getObserver());
		}

		entryToState(entryEvent: IEvent) {
			globalAPIDebugOutput("\n\n\----=======[" + this.stateName + "]=======----\n");
			return super.entryToState(new CEvent(entryEvent.eventName, this.doCollectInputModel(entryEvent.eventName, entryEvent.body)));
		}

		protected  doCollectInputModel(eventName: string, eventBody: any): any {
			return eventBody;
		}

		getEvent() {
			if (this.outputModelInterceptor.events.length <= 0) {
				throw new Error("Error: out of array range.");
			}
			return this.outputModelInterceptor.events[this.outputModelInterceptor.events.length - 1];
		}

		getEventsHistory() {
			return this.outputModelInterceptor.events;
		}

	}
}