interface IEvent {
	eventName: string;
	body: any;
}

interface IEventHash {
	[eventName: string]: IEvent;
}

class CEventHash implements IEventHash{
	[eventName: string]: IEvent;
}

interface IObserver {
	handle:(event: IEvent) => void;
}


class CObserverOwner {
	private observer: IObserver = null;

	add(observer: IObserver) {
		if (this.observer == null) {
			this.observer = observer;
		}
		else {
			throw new Error("Error: Can't set the CObserverOwner.observer, it is not null.");
		}
	}

	remove() {
		this.observer = null;
	}

	notify(event: IEvent) {
		if (this.observer != null) {
			this.observer.handle(event);
		}
	}
}


class CEvent<T> implements IEvent{
	eventName: string;
	body: T;

	constructor(eventName: string, eventBody?: T) {
		this.eventName = eventName;
		this.body = eventBody;
	}
}

interface IEventEmitter {
	emitEvent: () => void;
	getEvent: () => any;
}

class CEventEmitter implements IEventEmitter {
		
	public event: IEvent = null;
	private observerOwner = new CObserverOwner;

	static createBy<T>(eventName: string, observer: IObserver, eventBody?: T) {
		var event = new CEvent<T>(eventName, eventBody);
		return new CEventEmitter(event, observer);
	}

	static create(event: IEvent, observer: IObserver) {
		return new CEventEmitter(event, observer);
	}

	constructor(event: IEvent, observer: IObserver) {
		this.event = event;
		this.observerOwner.add(observer);
	}

	emitEvent() {
		if (this.event != null) {
			this.observerOwner.notify(this.event);
		}
	}

	getEvent() {
		return this.event;
	}
}

interface IChainOfResponsibility extends IObserver{
	setSuccessor: (successor: IObserver) => void;
	next: (event: IEvent) => void;
}

class CChainOfResponsibility implements IChainOfResponsibility {

	protected  successor: IObserver = null;

	setSuccessor(successor: IObserver){
		this.successor = successor;
	}

	next(event: IEvent) {
		this.successor.handle(event);
	}

	handle(event: IEvent) {
		throw new Error("Error: The abstract method called.");
	}
}

interface IEventStorage {
	[eventName: string]: IEvent;
}

class CEventInterceptor extends CChainOfResponsibility {

	constructor(successor: IObserver, private eventStorage: IEventStorage) {
		super();
		this.setSuccessor(successor);
	}

	handle(event: IEvent) {
		this.eventStorage[event.eventName] = event;
	}
}

class CEventStoringInterceptor extends CChainOfResponsibility {

	public events: IEvent[] = [];

	constructor(successor?: IObserver) {
		super();
		if (successor != undefined) {
			this.setSuccessor(successor);
		}
	}

	handle(event: IEvent) {
		this.events.push(event);
		this.next(event);
	}
}