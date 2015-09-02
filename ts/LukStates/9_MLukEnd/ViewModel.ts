module MLukEnd {

	/* View Model logic */

	export class CViewModel extends MMvvm.CViewModelBase {

		modelWasUpdatedHandler() {

			MUi.resetView('iGasStationView');
			MUi.resetView('iCommonView');
			MUi.resetView('iMessageView');
			MUi.resetView('iFuelView');
			MUi.resetView('iHeaderView');

			this.nextStateBy('DoReset');
			MLukStateMachine.CMachine.selfDestroy();
			globalAPIOnRestart();
		}
	}
} 