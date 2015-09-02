module MLukViews {

	export interface IGasStationResource {
		// ReSharper disable InconsistentNaming
		GasStationName: string;
		FuelingPointNumber: string;
		// ReSharper disable InconsistentNaming
	}

	export interface ILinkResource {
		// ReSharper disable InconsistentNaming
		NewId: string;
		Text: string;
		// ReSharper disable InconsistentNaming
	}

	export interface IButtonResource {
		// ReSharper disable InconsistentNaming
		NewId: string;
		Text: string;
		// ReSharper disable InconsistentNaming
	}

	export interface ITableResource {
		// ReSharper disable InconsistentNaming
		Element: string;
		// ReSharper disable InconsistentNaming
	}

	export interface IMessageViewResource {
		// ReSharper disable InconsistentNaming
		Header: string;
		Text: string;
		// ReSharper disable InconsistentNaming
	}

	export interface IFuelViewResource {
		FuelName: string;
		FuelValueMl: string;
		FuelPriceKop: string;
		FundsKop: string;
	}

	export interface IFuelValueAndFundsResource {
		FuelValueLit: string;
		FundsRub: string;
	}
}

module MLukStaticViews {

	export class CMainMenuView extends MMvvm.CViewModelBase {

		private static singltone: CMainMenuView = null;
		private conitueAfterPaymentData: MLukPayAndShip.IInputModel = null;

		static get(): CMainMenuView{
			if (CMainMenuView.singltone == null) {
				CMainMenuView.singltone = new CMainMenuView;
			}
			return CMainMenuView.singltone;
		}

		constructor() {
			super(null);
			//this.bindParentViewEvent('iMainMenuView', 'iRegistrationAreaView', 'click',(viewId: string) => this.activateAreaView(viewId), 'iRegestryMenuItem');
			this.bindParentViewEvent('iMainMenuView', 'iGeneralMenuItem', 'click',(viewId: string) => this.activateAreaView(viewId), 'iGeneralAreaView');
			this.bindParentViewEvent('iMainMenuView', 'iProfileMenuItem', 'click',(viewId: string) => this.activateAreaView(viewId), 'iProfileAreaView');
			this.bindParentViewEvent('iMainMenuView', 'iAccauntsMenuItem', 'click',(viewId: string) => this.activateAreaView(viewId), 'iAccountsAreaView');
			//this.bindParentViewEvent('iMainMenuView', 'iCancelMenuItem', 'click',(viewId: string) => this.activateAreaView(viewId), 'iGeneralAreaView');

		}

		conitueAfterPaymentDataEventHandler(data: MLukPayAndShip.IInputModel) {
			this.conitueAfterPaymentData = data;
		}

		deactivateAll() {
			MUi.disableContent("iStartAreaView");
			MUi.disableContent("iProfileAreaView");
			MUi.disableContent("iAccountsAreaView");
			MUi.disableContent("iRegistrationAreaView");
			MUi.disableContent("iGeneralAreaView");
		}

		activateAreaView(viewId: string) {

			if (viewId != "") {
				this.deactivateAll();

				MUi.enableContent(viewId);
			}
			
			if (viewId == "iAccountsAreaView") {
				globalAPIGetAccountInfo();
			}
			else if (viewId == "iGeneralAreaView" && !MLukStateMachine.CMachine.isExist()) {
				if (globalAPISessionId) {
				
					if (this.conitueAfterPaymentData == null) {
						MLukStateMachine.CMachine.entryPoint();
					}
					else {
						var conitueAfterPaymentDataClone = this.conitueAfterPaymentData;
						this.conitueAfterPaymentData = null;
						MLukStateMachine.CMachine.entryPointContinueAfterPayment(conitueAfterPaymentDataClone);
					}
				}
				else {
					this.activateAreaView('iStartAreaView');					
				}
			}
		}
	}
}