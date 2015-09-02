class CTestState extends MStateMachine.CState {

	private result: MStateMachine.EStateResult = MStateMachine.EStateResult.NotImplemented;

	constructor(stateName: string, result: MStateMachine.EStateResult) {
		super(stateName);
		this.result = result;
	}

	entryToState(entryEvent: IEvent) {
		return this.result;
	}
}

function stateMachineTestCase0() {

	var stateManager = new MStateMachine.CStateManager();
	var randomEvent = CEventEmitter.createBy("zsdfasdf", stateManager);

	var entryEvent = CEventEmitter.createBy("entry", stateManager);
	var doneEvent = CEventEmitter.createBy("done", stateManager);
	var selfEvent = CEventEmitter.createBy("ItSelf", stateManager);

	var state0 = new CTestState("state0", MStateMachine.EStateResult.Ok);
	state0.registerNextState("ItSelf", state0);	
	state0.registerNextState("done", stateManager.getExitPointState());

	var catched00 = false;
	try {
		selfEvent.emitEvent();
	}
	catch (error) {
		catched00 = true;
		var theResult = stateManager.getLastStateResult();
		if (theResult != MStateMachine.EStateResult.NotStarted) {
			alert('StateMachineTestCase 0.0 - faled:\nreference:\t' + MStateMachine.EStateResult.NotStarted + '\nresult:\t' + theResult);
		}
	}

	if (catched00 == false) {
		alert('StateMachineTestCase 0.1 - faled:\nthe exeption must be generated!');
	}

	stateManager.registerEntryPoint("entry", state0);


	entryEvent.emitEvent();
	var result = stateManager.getLastStateResult();

	if (result != MStateMachine.EStateResult.Ok) {
		alert('StateMachineTestCase 0.2 - faled:\nreference:\t' + MStateMachine.EStateResult.Ok + '\nresult:\t' + result);
	}

	selfEvent.emitEvent();
	result = stateManager.getLastStateResult();

	if (result != MStateMachine.EStateResult.Ok) {
		alert('StateMachineTestCase 0.3 - faled:\nreference:\t' + MStateMachine.EStateResult.Ok + '\nresult:\t' + result);
	}
	
	var catched04 = false;
	try {
		randomEvent.emitEvent();
	}
	catch (error) {
		catched04 = true;
		result = stateManager.getLastStateResult();
		if (result != MStateMachine.EStateResult.UnknownEvent) {
			alert('StateMachineTestCase 0.4 - faled:\nreference:\t' + MStateMachine.EStateResult.UnknownEvent + '\nresult:\t' + result);
		}
	}

	if (catched04 == false) {
		alert('StateMachineTestCase 0.5 - faled:\nthe exeption must be generated!');
	}
	
	doneEvent.emitEvent();
	result = stateManager.getLastStateResult();

	if (result != MStateMachine.EStateResult.Done) {
		alert('StateMachineTestCase 0.6 - faled:\nreference:\t' + MStateMachine.EStateResult.Done + '\nresult:\t' + result);
	}

	var state1 = new CTestState("state1", MStateMachine.EStateResult.Ok);
	state0.registerNextState("other", state1);
	state1.registerNextState("done", stateManager.getExitPointState());
	
	entryEvent.emitEvent();
	result = stateManager.getLastStateResult();

	if (result != MStateMachine.EStateResult.Ok) {
		alert('StateMachineTestCase 0.7 - faled:\nreference:\t' + MStateMachine.EStateResult.Ok + '\nresult:\t' + result);
	}

	var otherEvent = CEventEmitter.createBy("other", stateManager);

	otherEvent.emitEvent();
	result = stateManager.getLastStateResult();

	if (result != MStateMachine.EStateResult.Ok) {
		alert('StateMachineTestCase 0.8 - faled:\nreference:\t' + MStateMachine.EStateResult.Ok + '\nresult:\t' + result);
	}

	doneEvent.emitEvent();
	result = stateManager.getLastStateResult();

	if (result != MStateMachine.EStateResult.Done) {
		alert('StateMachineTestCase 0.9 - faled:\nreference:\t' + MStateMachine.EStateResult.Done + '\nresult:\t' + result);
	}

	//alert('OK');
}