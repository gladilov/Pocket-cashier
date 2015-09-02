module MUi {
	interface IViewСache {
		[viewId: string]: any;
	}

	var globalViewСache: IViewСache = {};

	interface IViewDataСache {
		[viewId: string]: any;
	}

	var globalViewDataСache: IViewDataСache = {};


	export function disableContent(contentName: string): void {
		setDisplay(contentName, "none");
	}

	export function enableContent(contentName: string): void {
		setDisplay(contentName, "block");
	}

	export function setDisplay(id: string, value: string): void {
		if (id != "") {
			var element = document.getElementById(id);
			element.style.display = value;
		}
	}

	export function moveViewContent(sourceViewId: string, destinationViewId: string): void {
		if (sourceViewId != "" && destinationViewId != "") {
			var content = $('#' + sourceViewId).html();
			setView(destinationViewId, content);
			resetView(sourceViewId);
		}
	}

	export function getViewContent(sourceViewId: string, destinationViewId: string): string {
		if (sourceViewId != "" && destinationViewId != "") {
			return $('#' + sourceViewId).html();
		}
		return "";
	}
	export function copyViewContent(sourceViewId: string, destinationViewId: string): void {
		if (sourceViewId != "" && destinationViewId != "") {
			var content = $('#' + sourceViewId).html();
			setView(destinationViewId, content);
		}
	}

	export function applyToView(viewId: string, resourceId: string, viewData: any) {
		globalViewDataСache[viewId] = viewData;
		var res = MUi.getResource(resourceId).apply(viewData);
		setView(viewId, res);
	}

	export function setView(viewId: string, resource: string) {
		globalViewСache[viewId] = resource;
		var content = $('#' + viewId);
		content.html(globalViewСache[viewId]);
		MUi.enableContent(viewId);
	}

	export function resetView(viewId: string) {
		globalViewDataСache[viewId] = undefined;
		globalViewСache[viewId] = undefined;
		MUi.disableContent(viewId);
		var content = $('#' + viewId);
		content.html("");
	}

	export function appendToView(viewId: string, resourceId: string, viewData?: any) {
		var resursResult: string;

		if (viewData != undefined) {
			globalViewDataСache[viewId] = viewData;
			resursResult = MUi.getResource(resourceId).apply(viewData);
		}
		else {
			resursResult = MUi.getResource(resourceId).resourceString()
		}

		appendResourceToView(viewId, resursResult);
	}

	export function appendResourceToView(viewId: string, resource: string) {
		if (globalViewСache[viewId] == undefined) {
			globalViewСache[viewId] = resource;

		}
		else {
			globalViewСache[viewId] = globalViewСache[viewId] + resource;
		}
		var content = $('#' + viewId);
		content.html(globalViewСache[viewId]);
		MUi.enableContent(viewId);
	}

	export function updateView(viewId: string, resourceId: string, viewData?: any) {
		var resursResult: string;

		if (viewData != undefined) {
			if (globalViewDataСache[viewId] == undefined) {
				globalViewDataСache[viewId] = viewData;
			}
			else {
				MTools.merge(globalViewDataСache[viewId], viewData);
			}
			resursResult = MUi.getResource(resourceId).apply(globalViewDataСache[viewId]);
		}
		else {
			resursResult = MUi.getResource(resourceId).resourceString();
		}

		globalViewСache[viewId] = resursResult;

		var content = $('#' + viewId);
		content.html(resursResult);
		MUi.enableContent(viewId);
	}

	export interface IBlockUIHandler {
		blockUIEventHandler: () => string;
		unblockUIEventHandler: () => void;
	}

	enum EBlockingState {
		Blocked,
		Unblocked
	}

	var counter: number = 0;
	var blockUIDefaultViewId: string = 'iLockUiDefaultView';
	var blockingState: EBlockingState = EBlockingState.Unblocked;

	export function setBlockUIDefaultViewId(viewId: string) {
		blockUIDefaultViewId = viewId;
	}

	export function forceBlockUI(blockUIHandler: IBlockUIHandler = null) {

		if (blockingState == EBlockingState.Blocked) {
			throw new Error("Error: UI must be unblocked first!");
		}

		blockingState = EBlockingState.Blocked;

		var theViewId: string;

		if (blockUIHandler != null) {
			theViewId = blockUIHandler.blockUIEventHandler();
		}
		else {
			theViewId = blockUIDefaultViewId;

			$.blockUI({
				message: $('#' + theViewId),
				css: {
					border: 'none',
					padding: '15px',
					'background-color': '#ffffff',
					backgroundColor: '#ffffff',
					'-webkit-border-radius': '3px',	/* Safari, Chrome */
					'-moz-border-radius': '3px',		/* Firefox */
					'border-radius': '3px',			/* CSS3 */
					opacity: .9,
					color: '#000000'
				}
			});
		}
	}

	export function forceUnblockUI(blockUIHandler: IBlockUIHandler = null): void {

		if (blockingState == EBlockingState.Unblocked) {
			throw new Error("Error: UI must be locked first!");
		}

		blockingState = EBlockingState.Unblocked;

		if (blockUIHandler != null) {
			blockUIHandler.unblockUIEventHandler();
		}
		else {
			$.unblockUI();
		}
	}
}

module MUiFormats {

	export function rub(kop: number): number {
		var r = NaN;
		if (kop != 0) {
			r = kop / 100;
		}
		return r;
	}

	export function lit(ml: number): number {
		var l = NaN;
		if (ml != 0) {
			l = ml / 1000;
		}
		return l;
	}

	export function kop(rub: number): number {
		return rub * 100;
	}

	export function ml(lit: number): number {
		return lit * 1000;
	}
}