module MLukMvvm {

	export interface IRestError {
		// ReSharper disable InconsistentNaming
		Error: string;
		ErrorCode: string;
		// ReSharper restore InconsistentNaming
	}

	export interface IErrorMessage {
		nextStateKeyword: string;
		eventBody: MInformMessageAndRequest.IInputModel;
	}

	class ErrorInfo {
		errorMessage: IErrorMessage = null;
		restError; IRestError = null;
		httpStatus: number = 0;
	}

	/* Internal Model: */

	export enum EWaitModelState { StartWait, StopWait, Other };

	export interface IInternalWaitModelBase {
		waitView: string;
		state: EWaitModelState;
	}

	export class CInternalWaitModelBase implements IInternalWaitModelBase {
		waitView: string;
		state: EWaitModelState = EWaitModelState.StartWait;
	}
	
	export class CWaitModelBase extends MMvvm.CModelBase implements MUi.IBlockUIHandler {
	
		jqPost(url: string, data: any, longRequest: boolean, headers: { [name: string]: string; } = null, method: string = Rest.Method.post) {
			var request = Rest.Json.post(url, data, longRequest, headers, method);
			this.setUpEventBy(request);
			return request;
		}

		jqGet(url: string, data: any, longRequest: boolean, headers: { [name: string]: string; } = null) {
			var request = Rest.Json.get(url, data, longRequest, headers);
			this.setUpEventBy(request);
			return request;
		}
        
					
		forceBlockUI(handler: MUi.IBlockUIHandler = null) {
			MUi.forceBlockUI(handler);
		}

		forceUnblockUI(handler: MUi.IBlockUIHandler = null) {
			MUi.forceUnblockUI(handler);
		}

		blockUIEventHandler() {
			// Нотифицируем View Model.
			var waitModel = new CInternalWaitModelBase;
			waitModel.state = EWaitModelState.StartWait;
			this.modelWasUpdatedBy<IInternalWaitModelBase>(waitModel);

			return waitModel.waitView;
		}

		unblockUIEventHandler() {
			// Нотифицируем View Model.
			var waitModel = new CInternalWaitModelBase;
			waitModel.state = EWaitModelState.StopWait;
			this.modelWasUpdatedBy<IInternalWaitModelBase>(waitModel);
		}

		protected doHandleError(httpStatus: number, restError: IRestError, errorMessage: IErrorMessage, imputModel: any): boolean {
			return false;
		}

		protected handleError(jqxhr: any, inputModel?: any) {

			if (jqxhr.statusText != 'abort') {
				var errorInfo = this.getErrorInfo(jqxhr, inputModel);

				if (this.doHandleError(errorInfo.httpStatus, errorInfo.restError, errorInfo.errorMessage, inputModel) == false && errorInfo.errorMessage != null) {
					this.nextStateBy<MInformMessageAndRequest.IInputModel>(errorInfo.errorMessage.nextStateKeyword, errorInfo.errorMessage.eventBody);
				}
			}

			this.cleanUpViewModel();
		}

		private getErrorInfo(jqxhr: any, inputModel?: any): ErrorInfo {

			var errorMessage: IErrorMessage = null;
			var errorInfo = new ErrorInfo;

			if (jqxhr.responseText != undefined && jqxhr.responseText != null) {

				var response: IRestError = jQuery.parseJSON(jqxhr.responseText);
				errorMessage = this.getSpecificServerErrorMessage(response, jqxhr.status, inputModel);

				if (errorMessage == null) {
					errorMessage = this.getOtherErrorMessage(jqxhr.status, inputModel);
				}
				errorInfo.restError = response;
			}
			else {
				errorMessage = this.getOtherErrorMessage(jqxhr.status, inputModel);
			}

			errorInfo.errorMessage = errorMessage;
			errorInfo.httpStatus = jqxhr.status;

			return errorInfo;
		}

		private getSpecificServerErrorMessage(serverError: IRestError, httpStatus: number, inputModel: any): IErrorMessage  {
			
			var errorMessage: IErrorMessage = null;

			switch (serverError.ErrorCode) {
				case "ShipmentNotFound":
					errorMessage = {
						nextStateKeyword: 'Continue',
						eventBody: <MLukErrorAndContinue.IInputModel>{
							message: {
								Header: 'Идентификатор отпуска топлива не найден:',
								Text: 'Попробуйте начать с начала.'
							},
							buttonName: "Ok",
							errorCode: httpStatus
						}
					};
					break;

				case 'nozzle_off':
					errorMessage = {
						nextStateKeyword: 'Continue',
						eventBody: <MLukErrorAndContinue.IInputModel>{
							message: {
								Header: 'Пистолет повешен:',
								Text: 'Можно начать с начала.'
							},
							buttonName: "Ok",
							errorCode: httpStatus
						}
					};
					break;

				case 'FuelingPointIsLocked':
				case 'FuelingPoint_is_busy':
					errorMessage = {
						nextStateKeyword: 'Continue',
						eventBody: <MLukErrorAndContinue.IInputModel>{
							message: {
								Header: 'ТРК занята:',
								Text: 'Выберете другую колонку.'
							},
							buttonName: "Ok",
							errorCode: httpStatus
						}
					};
					break;
					
				case 'GasStationDoesNotRespond':
					errorMessage = {
						nextStateKeyword: 'Repeat',
						eventBody: <MLukErrorAndRepeat.IInputModel> {
							message: {
								Header: 'Ошибка связи с АЗС:',
								Text: 'Повторить запрос?'
							},
							buttonName: "Повторить",
							errorCode: httpStatus,
							transferingMessage: inputModel
						}
					};
					break;

				default:
					break;
			}

			return errorMessage;
		}		

		private getOtherErrorMessage(httpStatus: number, imputModel: any): IErrorMessage  {

			var errorMessage: IErrorMessage = null;

			switch (httpStatus) {
				case 434:	// Requested host unavailable
				case 105:	// Name Not Resolved (DNS)
				case 408:	// Request Timeout
				case 502:	// Bad Gateway
				case 503:	// Service Unavailable
				case 504:	// Gateway Timeout
				case 509:	// Bandwidth Limit Exceeded
					errorMessage = {
						nextStateKeyword: 'Repeat',
						eventBody: <MLukErrorAndRepeat.IInputModel>{
							message: {
								Header: 'Ошибка связи с сервером:',
								Text: 'Повторить запрос?'
							},
							buttonName: "Повторить",
							errorCode: httpStatus,
							transferingMessage: imputModel
						}
					};
					break;

				case 401:	// Unauthorized
				case 511:	// Network Authentication Required
				case 403:	// Forbidden
					errorMessage = {
						nextStateKeyword: 'Continue',
						eventBody: <MLukErrorAndContinue.IInputModel>{
							message: {
								Header: 'Ошибка авторизации:',
								Text: 'Попробуйте начать с начала.'
							},
							buttonName: "Ok",
							errorCode: httpStatus
						}
					};
					break;

				case 400:	// Bad Request
				case 402:	// Payment Required
				case 404:	// Not Found
				case 405:	// Method Not Allowed
					errorMessage = {
						nextStateKeyword: 'Continue',
						eventBody: <MLukErrorAndContinue.IInputModel>{
							message: {
								Header: 'Ошибка логики приложения:',
								Text: 'Попробуйте начать с начала.'
							},
							buttonName: "Ok",
							errorCode: httpStatus
						}
					};
					break;

				case 500:	// Internal Server Error
				case 501:	// Not Implemented
				case 505:	// HTTP Version Not Supported
				case 506:	// Variant Also Negotiates
				case 507:	// Insufficient Storage
				case 508:	// Loop Detected
				case 510:	// Not Extended
					errorMessage = {
						nextStateKeyword: 'Continue',
						eventBody: <MLukErrorAndContinue.IInputModel>{
							message: {
								Header: 'Ошибка сервера:',
								Text: 'Попробуйте начать с начала.'
							},
							buttonName: "Ok",
							errorCode: httpStatus
						}
					};
					break;

				default:
					errorMessage = {
						nextStateKeyword: 'Repeat',
						eventBody: <MLukErrorAndRepeat.IInputModel>{
							message: {
								Header: 'Общая ошибка:',
								Text: 'Повторить запрос?'
							},
							buttonName: "Повторить",
							errorCode: httpStatus,
							transferingMessage: imputModel
						}
					};
					break;
			}

			return errorMessage;
		}
	}

	export class CViewModelBase extends MMvvm.CViewModelBase {

		private jqRequest: JQueryXHR = null;
		private static isCancelMenuEnabled = false;

		setUpViewModelHandler(jqRquest: JQueryXHR) {
			this.jqRequest = jqRquest;
		}

		protected enableCancelMenu() {
			// Назначаем событие View: Отмена
			this.bindParentViewEvent('iMainMenuView', 'iCancelMenuItem', 'click',() => this.cancel());
			MUi.setDisplay("iCancelMenuItem", "inline-block");
			CViewModelBase.isCancelMenuEnabled = true;
		}

		private appendCancelButton(viewId: string) {

			if (CViewModelBase.isCancelMenuEnabled) {

				var button = MUi.getResource('iButtonResource').applyAndSetId(<MLukViews.IButtonResource>{
					Text: 'Отмена'
				});

				MUi.appendResourceToView(viewId, button.html);

				this.bindParentViewEvent(viewId, button.id, 'click', () => this.cancel());
			}
		}

		protected messageBox(viewId: string, message: MMvvm.IMessageBox = null, waitSpinner = false) {

			super.messageBox(viewId, message, waitSpinner);

			if (message != undefined || message != null) {
				this.appendCancelButton(viewId);
			}
		}

		protected messageBoxWithButton(viewId: string, message: MMvvm.IMessageBoxWithButton, viewEventHandler: MMvvm.IViewEventHandler<any>, waitSpinner = false) {

			super.messageBoxWithButton(viewId, message, viewEventHandler, waitSpinner);
			
			if (message != undefined || message != null) {
				this.appendCancelButton(viewId);
			}
		}

		protected cancelEventHandler() {
		}

		globalEvent(event: IEvent) {
			var result = super.globalEvent(event);

			if (event.eventName == "GlobalCancelViewEvent") {
				this.cancel();
				result = MStateMachine.EStateResult.Ok;
			}

			return result;			
		}

		cancel() {
			this.cancelEventHandler();

			if (this.jqRequest != null) {
				this.jqRequest.abort();
			}
			this.nextStateBy('DoExit');
		}

		protected disableCancelMenu() {
			this.unbindParentViewEvent('iMainMenuView', 'iCancelMenuItem', 'click');
			MUi.setDisplay("iCancelMenuItem", "none");
			CViewModelBase.isCancelMenuEnabled = false;
		}

		protected  nextStateBy<T>(stateKeyword: string, eventBody?: T) {
			this.disableCancelMenu();
			super.nextStateBy<T>(stateKeyword, eventBody);
		}

		protected  nextState(event: IEvent) {
			this.disableCancelMenu();
			super.nextState(event);
		}
	}

	export class CViewWaitModelBase extends CViewModelBase {

		modelWasUpdatedHandler(eventBody: IInternalWaitModelBase) {
			throw new Error("Error: The abstract method called.");
		}
	}
}