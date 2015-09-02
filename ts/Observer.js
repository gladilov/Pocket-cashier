var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CEventHash = (function () {
    function CEventHash() {
    }
    return CEventHash;
})();
var CObserverOwner = (function () {
    function CObserverOwner() {
        this.observer = null;
    }
    CObserverOwner.prototype.add = function (observer) {
        if (this.observer == null) {
            this.observer = observer;
        }
        else {
            throw new Error("Error: Can't set the CObserverOwner.observer, it is not null.");
        }
    };
    CObserverOwner.prototype.remove = function () {
        this.observer = null;
    };
    CObserverOwner.prototype.notify = function (event) {
        if (this.observer != null) {
            this.observer.handle(event);
        }
    };
    return CObserverOwner;
})();
var CEvent = (function () {
    function CEvent(eventName, eventBody) {
        this.eventName = eventName;
        this.body = eventBody;
    }
    return CEvent;
})();
var CEventEmitter = (function () {
    function CEventEmitter(event, observer) {
        this.event = null;
        this.observerOwner = new CObserverOwner;
        this.event = event;
        this.observerOwner.add(observer);
    }
    CEventEmitter.createBy = function (eventName, observer, eventBody) {
        var event = new CEvent(eventName, eventBody);
        return new CEventEmitter(event, observer);
    };
    CEventEmitter.create = function (event, observer) {
        return new CEventEmitter(event, observer);
    };
    CEventEmitter.prototype.emitEvent = function () {
        if (this.event != null) {
            this.observerOwner.notify(this.event);
        }
    };
    CEventEmitter.prototype.getEvent = function () {
        return this.event;
    };
    return CEventEmitter;
})();
var CChainOfResponsibility = (function () {
    function CChainOfResponsibility() {
        this.successor = null;
    }
    CChainOfResponsibility.prototype.setSuccessor = function (successor) {
        this.successor = successor;
    };
    CChainOfResponsibility.prototype.next = function (event) {
        this.successor.handle(event);
    };
    CChainOfResponsibility.prototype.handle = function (event) {
        throw new Error("Error: The abstract method called.");
    };
    return CChainOfResponsibility;
})();
var CEventInterceptor = (function (_super) {
    __extends(CEventInterceptor, _super);
    function CEventInterceptor(successor, eventStorage) {
        _super.call(this);
        this.eventStorage = eventStorage;
        this.setSuccessor(successor);
    }
    CEventInterceptor.prototype.handle = function (event) {
        this.eventStorage[event.eventName] = event;
    };
    return CEventInterceptor;
})(CChainOfResponsibility);
var CEventStoringInterceptor = (function (_super) {
    __extends(CEventStoringInterceptor, _super);
    function CEventStoringInterceptor(successor) {
        _super.call(this);
        this.events = [];
        if (successor != undefined) {
            this.setSuccessor(successor);
        }
    }
    CEventStoringInterceptor.prototype.handle = function (event) {
        this.events.push(event);
        this.next(event);
    };
    return CEventStoringInterceptor;
})(CChainOfResponsibility);
//# sourceMappingURL=Observer.js.map