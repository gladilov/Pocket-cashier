module MLukNozzleAwaiting {
		
	export class CState extends MMvvmState.CState<MLukStateMachine.CСollection> {

		doCollectInputModel(eventName: string): IInputModel {

			var inputModel: IInputModel = MTools.mergeTo(
				<IFuelingPointId>this.collection.sideChoice.getEvent().body,
				<IGasStationId>this.collection.begin.getEvent().body);
			
			return inputModel;
		}
    }
} 