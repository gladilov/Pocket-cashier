module MMvvm {

	class CModelObserver implements IObserver {

		constructor(public model: CModelBase) {}

		handle(event: IEvent) {
			this.model.doModelUpdate(event.body);
		}
	}

	export class CModelBase {
	
		private observer = new CModelObserver(this);
		
		constructor(private successor: IObserver, private stateManager: IObserver) {}

		getObserver() {
			return this.observer;	
		}

		doModelUpdate(eventBody?: any) {
			throw new Error("Error: The abstract method called.");
		}
		
		protected  setUpEventBy<T>(eventBody?: T) {
			this.successor.handle(new CEvent<T>("SetUpEvent", eventBody));
		}

		protected  modelWasUpdatedBy<T>(eventBody?: T) {
			this.successor.handle(new CEvent<T>("ModelWasUpdatedEvent", eventBody));
		}

		protected  cleanUpViewModel() {
			this.successor.handle(new CEvent<any>("CleanUpViewModelEvent", null));
		}

		protected  nextState(event: IEvent) {
			this.stateManager.handle(event);
		}

		protected  nextStateBy<T>(stateKeyword: string, eventBody?: T) {
			this.stateManager.handle(new CEvent<T>(stateKeyword, eventBody));
		}
	}

	export class CSimpleModel extends MMvvm.CModelBase {

		doModelUpdate(eventBody: any) {
			this.modelWasUpdatedBy<any>(eventBody);
		}
	}

	class CViewModelObserver implements IObserver {

		public internalModel: any;

		constructor(public viewModel: CViewModelBase) {}

		handle(event: IEvent) {
			switch (event.eventName) {
				case 'CleanUpViewModelEvent':
					this.viewModel.cleanUpViewModelHandler();
					break;

				case 'ModelWasUpdatedEvent':
					this.internalModel = event.body;				
					this.viewModel.modelWasUpdatedHandler(event.body);
					break;

				case 'SetUpEvent':
					this.viewModel.setUpViewModelHandler(event.body);
				default:
					break;
			}			
		}
	}

	export interface IMessageBox extends MLukViews.IMessageViewResource { }

	export interface IMessageBoxWithButton {
		message: MLukViews.IMessageViewResource;
		buttonName: string;
		errorCode: number;
	}

	export class CViewModelBase{

		
		private observer = new CViewModelObserver(this);		
		private eventFunctions: { (): void; }[] = new Array;

		constructor(private stateManager: IObserver) {}
	
		globalEvent(event: IEvent) {
			return MStateMachine.EStateResult.UnknownEvent;
		}

		getObserver() {
			return this.observer;
		}

		setUpViewModelHandler(eventBody?: any) {
		}

		modelWasUpdatedHandler(eventBody?: any) {
			throw new Error("Error: The abstract method called.");
		}

		cleanUpViewModelHandler() {
		}

		protected  nextState(event: IEvent) {
			this.stateManager.handle(event);
		}

		protected  nextStateBy<T>(stateKeyword: string, eventBody?: T) {
			this.stateManager.handle(new CEvent<T>(stateKeyword, eventBody));
		}

		protected  bindViewEvent<TViewEvent>(id: string, action: string, viewEventHandler: IViewEventHandler<TViewEvent>, eventBody?: TViewEvent) {
			var element = $("#" + id);
			element.on(action, null, <IFunctionData<TViewEvent>>{ eventHandlerKey: viewEventHandler, eventBodyKey: eventBody }, function (event: any) {
				var data: IFunctionData<TViewEvent> = <any>event.data;
				if (data.eventBodyKey != undefined) {
					data.eventHandlerKey(data.eventBodyKey);
				}
				else {
					data.eventHandlerKey();
				}
			});
		}

		protected  bindParentViewEvent<TViewEvent>(parentId: string, childId: string, action: string, viewEventHandler: IViewEventHandler<TViewEvent>, eventBody?: TViewEvent) {
			var element = $("#" + parentId);			
			element.on(action, "#" + childId, <IFunctionData<TViewEvent>>{ eventHandlerKey: viewEventHandler, eventBodyKey: eventBody }, function (event: any) {
				var data: IFunctionData<TViewEvent> = <any>event.data;
				if (data.eventBodyKey != undefined) {
					data.eventHandlerKey(data.eventBodyKey);
				}
				else {
					data.eventHandlerKey();
				}
			});
		}

		protected  unbindParentViewEvent(parentId: string, childId: string, action: string) {
			var element = $("#" + parentId);
			element.off(action, "#" + childId);
		}

		protected  getInternalModel<TModelType>(): TModelType {
			return this.observer.internalModel;
		}


		protected messageBoxWithButton(viewId: string, message: IMessageBoxWithButton, viewEventHandler: IViewEventHandler<any>, waitSpinner = false) {
			if (message != undefined || message != null) {
				// Render:

				var errorCode: string = "";

				if (message.errorCode != undefined && message.errorCode != null) {
					errorCode = " код " + message.errorCode.toString();
				}

				MUi.applyToView(viewId, 'iMessageResource', <MLukViews.IMessageViewResource> {
					Header: message.message.Header + errorCode,
					Text: message.message.Text
				});

				var button = MUi.getResource('iButtonResource').applyAndSetId(<MLukViews.IButtonResource>{
					Text: message.buttonName
				});

				MUi.appendResourceToView(viewId, button.html);

				this.bindParentViewEvent(viewId, button.id, 'click', viewEventHandler);

				if (waitSpinner) {
					MUi.appendToView(viewId, 'iWaitSpinnerResource');
				}
			}
			else {
				MUi.resetView(viewId);
			}
		}
				
		protected messageBox(viewId: string, message: IMessageBox = null, waitSpinner = false) {

			if (message != undefined || message != null) {
				MUi.applyToView(viewId, 'iMessageResource', message);

				if (waitSpinner) {
					MUi.appendToView(viewId, 'iWaitSpinnerResource');
				}
			}
			else {
				MUi.resetView(viewId);
			}
		}
	}

	export interface IViewEventHandler<TViewEvent> {
		(eventBody?: TViewEvent): void;
	}

	interface IFunctionData<TViewEvent> {
		eventHandlerKey: IViewEventHandler<TViewEvent>;
		eventBodyKey: any;
	}
}