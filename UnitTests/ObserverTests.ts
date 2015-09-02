class CTestObserver implements IObserver {
	public log: string = "_";
	handle(event: IEvent) {		
		this.log = this.log + event.eventName + "_";
	}
}

class CTestEventEmitter extends CObserverOwner {

	public testEvent0: IEvent = new CEvent("TestEvent0");
	public testEvent1: IEvent = new CEvent("TestEvent1");

	constructor() {
		super();
	}

	emitTestEvent(eventNumber: number) {
		switch (eventNumber) {
			case 0: this.notify(this.testEvent0); break;
			case 1: this.notify(this.testEvent1); break;
			default: throw new Error("Error: ObserverTests error!");
		}
	}
}

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