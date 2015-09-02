/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/jquery/jquery.blockUI.d.ts" />

// GoodCursor.ts & GoodsList.ts
declare var globalAPIBuyP0: (basket: any) => any;

// Model.ts
declare var globalAPIDebugOutput: (text: string) => void;
declare var globalAPIPc: string;
declare var globalAPISessionId: string;
declare var globalPhaseVersion: number;

// Viewmodel.ts
declare class globalAPIRobokassaWidget {
// ReSharper disable InconsistentNaming
	Id: number;
// ReSharper restore InconsistentNaming

	constructor(account: number, defaultValue: number, openInNewWindow: boolean);

	render(): string;
	getButtonId(): string;
}

declare function globalAPIOnRestart();
declare function globalAPIGetAccountInfo();
declare function globalAPISavePaymentContext(context: MLukPayAndShip.IInputModel);