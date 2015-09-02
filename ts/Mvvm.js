var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MMvvm;
(function (MMvvm) {
    var CModelObserver = (function () {
        function CModelObserver(model) {
            this.model = model;
        }
        CModelObserver.prototype.handle = function (event) {
            this.model.doModelUpdate(event.body);
        };
        return CModelObserver;
    })();
    var CModelBase = (function () {
        function CModelBase(successor, stateManager) {
            this.successor = successor;
            this.stateManager = stateManager;
            this.observer = new CModelObserver(this);
        }
        CModelBase.prototype.getObserver = function () {
            return this.observer;
        };
        CModelBase.prototype.doModelUpdate = function (eventBody) {
            throw new Error("Error: The abstract method called.");
        };
        CModelBase.prototype.setUpEventBy = function (eventBody) {
            this.successor.handle(new CEvent("SetUpEvent", eventBody));
        };
        CModelBase.prototype.modelWasUpdatedBy = function (eventBody) {
            this.successor.handle(new CEvent("ModelWasUpdatedEvent", eventBody));
        };
        CModelBase.prototype.cleanUpViewModel = function () {
            this.successor.handle(new CEvent("CleanUpViewModelEvent", null));
        };
        CModelBase.prototype.nextState = function (event) {
            this.stateManager.handle(event);
        };
        CModelBase.prototype.nextStateBy = function (stateKeyword, eventBody) {
            this.stateManager.handle(new CEvent(stateKeyword, eventBody));
        };
        return CModelBase;
    })();
    MMvvm.CModelBase = CModelBase;
    var CSimpleModel = (function (_super) {
        __extends(CSimpleModel, _super);
        function CSimpleModel() {
            _super.apply(this, arguments);
        }
        CSimpleModel.prototype.doModelUpdate = function (eventBody) {
            this.modelWasUpdatedBy(eventBody);
        };
        return CSimpleModel;
    })(MMvvm.CModelBase);
    MMvvm.CSimpleModel = CSimpleModel;
    var CViewModelObserver = (function () {
        function CViewModelObserver(viewModel) {
            this.viewModel = viewModel;
        }
        CViewModelObserver.prototype.handle = function (event) {
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
        };
        return CViewModelObserver;
    })();
    var CViewModelBase = (function () {
        function CViewModelBase(stateManager) {
            this.stateManager = stateManager;
            this.observer = new CViewModelObserver(this);
            this.eventFunctions = new Array;
        }
        CViewModelBase.prototype.globalEvent = function (event) {
            return MStateMachine.EStateResult.UnknownEvent;
        };
        CViewModelBase.prototype.getObserver = function () {
            return this.observer;
        };
        CViewModelBase.prototype.setUpViewModelHandler = function (eventBody) {
        };
        CViewModelBase.prototype.modelWasUpdatedHandler = function (eventBody) {
            throw new Error("Error: The abstract method called.");
        };
        CViewModelBase.prototype.cleanUpViewModelHandler = function () {
        };
        CViewModelBase.prototype.nextState = function (event) {
            this.stateManager.handle(event);
        };
        CViewModelBase.prototype.nextStateBy = function (stateKeyword, eventBody) {
            this.stateManager.handle(new CEvent(stateKeyword, eventBody));
        };
        CViewModelBase.prototype.bindViewEvent = function (id, action, viewEventHandler, eventBody) {
            var element = $("#" + id);
            element.on(action, null, { eventHandlerKey: viewEventHandler, eventBodyKey: eventBody }, function (event) {
                var data = event.data;
                if (data.eventBodyKey != undefined) {
                    data.eventHandlerKey(data.eventBodyKey);
                }
                else {
                    data.eventHandlerKey();
                }
            });
        };
        CViewModelBase.prototype.bindParentViewEvent = function (parentId, childId, action, viewEventHandler, eventBody) {
            var element = $("#" + parentId);
            element.on(action, "#" + childId, { eventHandlerKey: viewEventHandler, eventBodyKey: eventBody }, function (event) {
                var data = event.data;
                if (data.eventBodyKey != undefined) {
                    data.eventHandlerKey(data.eventBodyKey);
                }
                else {
                    data.eventHandlerKey();
                }
            });
        };
        CViewModelBase.prototype.unbindParentViewEvent = function (parentId, childId, action) {
            var element = $("#" + parentId);
            element.off(action, "#" + childId);
        };
        CViewModelBase.prototype.getInternalModel = function () {
            return this.observer.internalModel;
        };
        CViewModelBase.prototype.messageBoxWithButton = function (viewId, message, viewEventHandler, waitSpinner) {
            if (waitSpinner === void 0) { waitSpinner = false; }
            if (message != undefined || message != null) {
                // Render:
                var errorCode = "";
                if (message.errorCode != undefined && message.errorCode != null) {
                    errorCode = " код " + message.errorCode.toString();
                }
                MUi.applyToView(viewId, 'iMessageResource', {
                    Header: message.message.Header + errorCode,
                    Text: message.message.Text
                });
                var button = MUi.getResource('iButtonResource').applyAndSetId({
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
        };
        CViewModelBase.prototype.messageBox = function (viewId, message, waitSpinner) {
            if (message === void 0) { message = null; }
            if (waitSpinner === void 0) { waitSpinner = false; }
            if (message != undefined || message != null) {
                MUi.applyToView(viewId, 'iMessageResource', message);
                if (waitSpinner) {
                    MUi.appendToView(viewId, 'iWaitSpinnerResource');
                }
            }
            else {
                MUi.resetView(viewId);
            }
        };
        return CViewModelBase;
    })();
    MMvvm.CViewModelBase = CViewModelBase;
})(MMvvm || (MMvvm = {}));
//# sourceMappingURL=Mvvm.js.map