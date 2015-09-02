var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLukMvvm;
(function (MLukMvvm) {
    var ErrorInfo = (function () {
        function ErrorInfo() {
            this.errorMessage = null;
            this.IRestError = null;
            this.httpStatus = 0;
        }
        return ErrorInfo;
    })();
    /* Internal Model: */
    (function (EWaitModelState) {
        EWaitModelState[EWaitModelState["StartWait"] = 0] = "StartWait";
        EWaitModelState[EWaitModelState["StopWait"] = 1] = "StopWait";
        EWaitModelState[EWaitModelState["Other"] = 2] = "Other";
    })(MLukMvvm.EWaitModelState || (MLukMvvm.EWaitModelState = {}));
    var EWaitModelState = MLukMvvm.EWaitModelState;
    ;
    var CInternalWaitModelBase = (function () {
        function CInternalWaitModelBase() {
            this.state = EWaitModelState.StartWait;
        }
        return CInternalWaitModelBase;
    })();
    MLukMvvm.CInternalWaitModelBase = CInternalWaitModelBase;
    var CWaitModelBase = (function (_super) {
        __extends(CWaitModelBase, _super);
        function CWaitModelBase() {
            _super.apply(this, arguments);
        }
        CWaitModelBase.prototype.jqPost = function (url, data, longRequest, headers, method) {
            if (headers === void 0) { headers = null; }
            if (method === void 0) { method = Rest.Method.post; }
            var request = Rest.Json.post(url, data, longRequest, headers, method);
            this.setUpEventBy(request);
            return request;
        };
        CWaitModelBase.prototype.jqGet = function (url, data, longRequest, headers) {
            if (headers === void 0) { headers = null; }
            var request = Rest.Json.get(url, data, longRequest, headers);
            this.setUpEventBy(request);
            return request;
        };
        CWaitModelBase.prototype.forceBlockUI = function (handler) {
            if (handler === void 0) { handler = null; }
            MUi.forceBlockUI(handler);
        };
        CWaitModelBase.prototype.forceUnblockUI = function (handler) {
            if (handler === void 0) { handler = null; }
            MUi.forceUnblockUI(handler);
        };
        CWaitModelBase.prototype.blockUIEventHandler = function () {
            // Нотифицируем View Model.
            var waitModel = new CInternalWaitModelBase;
            waitModel.state = EWaitModelState.StartWait;
            this.modelWasUpdatedBy(waitModel);
            return waitModel.waitView;
        };
        CWaitModelBase.prototype.unblockUIEventHandler = function () {
            // Нотифицируем View Model.
            var waitModel = new CInternalWaitModelBase;
            waitModel.state = EWaitModelState.StopWait;
            this.modelWasUpdatedBy(waitModel);
        };
        CWaitModelBase.prototype.doHandleError = function (httpStatus, restError, errorMessage, imputModel) {
            return false;
        };
        CWaitModelBase.prototype.handleError = function (jqxhr, inputModel) {
            if (jqxhr.statusText != 'abort') {
                var errorInfo = this.getErrorInfo(jqxhr, inputModel);
                if (this.doHandleError(errorInfo.httpStatus, errorInfo.restError, errorInfo.errorMessage, inputModel) == false && errorInfo.errorMessage != null) {
                    this.nextStateBy(errorInfo.errorMessage.nextStateKeyword, errorInfo.errorMessage.eventBody);
                }
            }
            this.cleanUpViewModel();
        };
        CWaitModelBase.prototype.getErrorInfo = function (jqxhr, inputModel) {
            var errorMessage = null;
            var errorInfo = new ErrorInfo;
            if (jqxhr.responseText != undefined && jqxhr.responseText != null) {
                var response = jQuery.parseJSON(jqxhr.responseText);
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
        };
        CWaitModelBase.prototype.getSpecificServerErrorMessage = function (serverError, httpStatus, inputModel) {
            var errorMessage = null;
            switch (serverError.ErrorCode) {
                case "ShipmentNotFound":
                    errorMessage = {
                        nextStateKeyword: 'Continue',
                        eventBody: {
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
                        eventBody: {
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
                        eventBody: {
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
                        eventBody: {
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
        };
        CWaitModelBase.prototype.getOtherErrorMessage = function (httpStatus, imputModel) {
            var errorMessage = null;
            switch (httpStatus) {
                case 434: // Requested host unavailable
                case 105: // Name Not Resolved (DNS)
                case 408: // Request Timeout
                case 502: // Bad Gateway
                case 503: // Service Unavailable
                case 504: // Gateway Timeout
                case 509:
                    errorMessage = {
                        nextStateKeyword: 'Repeat',
                        eventBody: {
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
                case 401: // Unauthorized
                case 511: // Network Authentication Required
                case 403:
                    errorMessage = {
                        nextStateKeyword: 'Continue',
                        eventBody: {
                            message: {
                                Header: 'Ошибка авторизации:',
                                Text: 'Попробуйте начать с начала.'
                            },
                            buttonName: "Ok",
                            errorCode: httpStatus
                        }
                    };
                    break;
                case 400: // Bad Request
                case 402: // Payment Required
                case 404: // Not Found
                case 405:
                    errorMessage = {
                        nextStateKeyword: 'Continue',
                        eventBody: {
                            message: {
                                Header: 'Ошибка логики приложения:',
                                Text: 'Попробуйте начать с начала.'
                            },
                            buttonName: "Ok",
                            errorCode: httpStatus
                        }
                    };
                    break;
                case 500: // Internal Server Error
                case 501: // Not Implemented
                case 505: // HTTP Version Not Supported
                case 506: // Variant Also Negotiates
                case 507: // Insufficient Storage
                case 508: // Loop Detected
                case 510:
                    errorMessage = {
                        nextStateKeyword: 'Continue',
                        eventBody: {
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
                        eventBody: {
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
        };
        return CWaitModelBase;
    })(MMvvm.CModelBase);
    MLukMvvm.CWaitModelBase = CWaitModelBase;
    var CViewModelBase = (function (_super) {
        __extends(CViewModelBase, _super);
        function CViewModelBase() {
            _super.apply(this, arguments);
            this.jqRequest = null;
        }
        CViewModelBase.prototype.setUpViewModelHandler = function (jqRquest) {
            this.jqRequest = jqRquest;
        };
        CViewModelBase.prototype.enableCancelMenu = function () {
            var _this = this;
            // Назначаем событие View: Отмена
            this.bindParentViewEvent('iMainMenuView', 'iCancelMenuItem', 'click', function () { return _this.cancel(); });
            MUi.setDisplay("iCancelMenuItem", "inline-block");
            CViewModelBase.isCancelMenuEnabled = true;
        };
        CViewModelBase.prototype.appendCancelButton = function (viewId) {
            var _this = this;
            if (CViewModelBase.isCancelMenuEnabled) {
                var button = MUi.getResource('iButtonResource').applyAndSetId({
                    Text: 'Отмена'
                });
                MUi.appendResourceToView(viewId, button.html);
                this.bindParentViewEvent(viewId, button.id, 'click', function () { return _this.cancel(); });
            }
        };
        CViewModelBase.prototype.messageBox = function (viewId, message, waitSpinner) {
            if (message === void 0) { message = null; }
            if (waitSpinner === void 0) { waitSpinner = false; }
            _super.prototype.messageBox.call(this, viewId, message, waitSpinner);
            if (message != undefined || message != null) {
                this.appendCancelButton(viewId);
            }
        };
        CViewModelBase.prototype.messageBoxWithButton = function (viewId, message, viewEventHandler, waitSpinner) {
            if (waitSpinner === void 0) { waitSpinner = false; }
            _super.prototype.messageBoxWithButton.call(this, viewId, message, viewEventHandler, waitSpinner);
            if (message != undefined || message != null) {
                this.appendCancelButton(viewId);
            }
        };
        CViewModelBase.prototype.cancelEventHandler = function () {
        };
        CViewModelBase.prototype.globalEvent = function (event) {
            var result = _super.prototype.globalEvent.call(this, event);
            if (event.eventName == "GlobalCancelViewEvent") {
                this.cancel();
                result = MStateMachine.EStateResult.Ok;
            }
            return result;
        };
        CViewModelBase.prototype.cancel = function () {
            this.cancelEventHandler();
            if (this.jqRequest != null) {
                this.jqRequest.abort();
            }
            this.nextStateBy('DoExit');
        };
        CViewModelBase.prototype.disableCancelMenu = function () {
            this.unbindParentViewEvent('iMainMenuView', 'iCancelMenuItem', 'click');
            MUi.setDisplay("iCancelMenuItem", "none");
            CViewModelBase.isCancelMenuEnabled = false;
        };
        CViewModelBase.prototype.nextStateBy = function (stateKeyword, eventBody) {
            this.disableCancelMenu();
            _super.prototype.nextStateBy.call(this, stateKeyword, eventBody);
        };
        CViewModelBase.prototype.nextState = function (event) {
            this.disableCancelMenu();
            _super.prototype.nextState.call(this, event);
        };
        CViewModelBase.isCancelMenuEnabled = false;
        return CViewModelBase;
    })(MMvvm.CViewModelBase);
    MLukMvvm.CViewModelBase = CViewModelBase;
    var CViewWaitModelBase = (function (_super) {
        __extends(CViewWaitModelBase, _super);
        function CViewWaitModelBase() {
            _super.apply(this, arguments);
        }
        CViewWaitModelBase.prototype.modelWasUpdatedHandler = function (eventBody) {
            throw new Error("Error: The abstract method called.");
        };
        return CViewWaitModelBase;
    })(CViewModelBase);
    MLukMvvm.CViewWaitModelBase = CViewWaitModelBase;
})(MLukMvvm || (MLukMvvm = {}));
//# sourceMappingURL=LukMvvm.js.map