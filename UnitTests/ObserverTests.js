var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CTestObserver = (function () {
    function CTestObserver() {
        this.log = "_";
    }
    CTestObserver.prototype.handle = function (event) {
        this.log = this.log + event.eventName + "_";
    };
    return CTestObserver;
})();
var CTestEventEmitter = (function (_super) {
    __extends(CTestEventEmitter, _super);
    function CTestEventEmitter() {
        _super.call(this);
        this.testEvent0 = new CEvent("TestEvent0");
        this.testEvent1 = new CEvent("TestEvent1");
    }
    CTestEventEmitter.prototype.emitTestEvent = function (eventNumber) {
        switch (eventNumber) {
            case 0:
                this.notify(this.testEvent0);
                break;
            case 1:
                this.notify(this.testEvent1);
                break;
            default: throw new Error("Error: ObserverTests error!");
        }
    };
    return CTestEventEmitter;
})(CObserverOwner);
function observerTestCase0() {
    var testObserver = new CTestObserver();
    var testEventEmitter = new CTestEventEmitter();
    testEventEmitter.add(testObserver);
    testEventEmitter.emitTestEvent(0);
    testEventEmitter.emitTestEvent(1);
    var reference = "_TestEvent0_TestEvent1_";
    var result = testObserver.log;
    if (result != reference) {
        alert('ObserverTestCase 0 - faled:\nreference:\t' + reference + '\nresult:\t' + result);
    }
}
function observerTestCase1() {
    var testObserver = new CTestObserver();
    var eventEmitter1 = CEventEmitter.create(new CEvent("TestEvent1"), testObserver);
    var event0 = new CEvent("TestEvent0");
    var eventEmitter0 = CEventEmitter.create(event0, testObserver);
    eventEmitter0.emitEvent();
    eventEmitter1.emitEvent();
    var reference = "_TestEvent0_TestEvent1_";
    var result = testObserver.log;
    if (result != reference) {
        alert('ObserverTestCase 1 - faled:\nreference:\t' + reference + '\nresult:\t' + result);
    }
}
//# sourceMappingURL=ObserverTests.js.map