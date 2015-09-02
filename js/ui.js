//===============================================================================================
// Globals

var ROBOKASSA_SUCCESS_URL = "/paymentSystems/robokassa/success";
var ROBOKASSA_FAILURE_URL = "/paymentSystems/robokassa/failure";
var PAYMENT_CONTEXT_FUNDSKOP_COOKIE_NAME = "pcshr_context_fundskop";
var PAYMENT_CONTEXT_FUELNAME_COOKIE_NAME = "pcshr_context_fuelname";

var globalCurrentMenuItemBackgroundColor = "#000000";
var globalMenuItemBackgroundColor = "#000000";

function getGlobalColorP1()
{
	if (globalPhaseVersion == 1) {
		globalCurrentMenuItemBackgroundColor = MUi.getResource("iCurrentMenuItemBackgroundColor").color();
		globalMenuItemBackgroundColor = MUi.getResource("iMenuItemBackgroundColor").color();
	}
}

var globalLastIdDefault = "iGeneralMenuItem";
var globalLastId = globalLastIdDefault;

//On ready reactor
$(document).ready(function(){
	// Register wait spinner for AJAX operations
	// http://jquery.malsup.com/block/
	$(document)
		.ajaxStart(
			function () {
				//MUi.forceBlockUI();
			})
		.ajaxStop(
			function () {
				//MUi.forceUnblockUI();
			}
		);

	// Start content
	getGlobalColorP1();
	restoreSession();
	if (globalAPISessionId) {
		Route();

		OnLoginEvent(true);
	}
	else {
		if (globalPhaseVersion == 1) {
			ActivateContentP1('iStartAreaView', 'iGeneralMenuItem');
		}
		else {
			MLukStaticViews.CMainMenuView.get().activateAreaView('iStartAreaView');
		}	
	}
});

// Globals
//===============================================================================================

function SetFocusTo(id) {
	if(id != "") {
		var element = document.getElementById(id);
		element.focus();
	}
}

function DisableAllContent() {
	MLukStaticViews.CMainMenuView.get().deactivateAll();
	MUi.disableContent("iTP");						// Только для нулевой демонстрации
}

/* login & logout */

function OnLoginEvent(loginResult) {

	if (loginResult) {

		// Enable menu items
		MUi.setDisplay("iAccauntsMenuItem", "inline-block");
		MUi.setDisplay("iProfileMenuItem", "inline-block");
		MUi.setDisplay("iGeneralMenuItem", "inline-block");

		if (globalPhaseVersion == 1) {
			DisableAllContent();

			MUi.setDisplay("iLogoutMenuItem", "block");
			MUi.setDisplay("iLoginView", "none");
			MUi.setDisplay("iRegestryMenuItem", "none");

			// Start content after login
			ActivateContentP1('iGeneralAreaView', 'iGeneralMenuItem');
		}
		else {
			$.mobile.changePage("#iIndexPageView", { transition: "slideup" });
			MLukStaticViews.CMainMenuView.get().activateAreaView('iGeneralAreaView');
		}
	}
	else {
		if (globalPhaseVersion == 1) {
			$('#iLoginInvalid').dialog('open');
		} else {
			$('#iDialogInvalidLogin').popup('open');
		}
	}
}

function RegisterAction() {

	if(window.globalEnableDebugUI){
		OnLoginEvent(true);
	}
	else {
		register();
	}
}

function LoginButtonAction() {

	if(window.globalEnableDebugUI){
		OnLoginEvent(true);
	}
	else {
		login();
	}
}

function LogoutMenuAction() {

	logout();

	MLukStaticViews.CMainMenuView.get().deactivateAll();

	if (globalPhaseVersion == 1) {
		MUi.disableContent("iTP");						// Только для нулевой демонстрации
		MUi.setDisplay("iLogoutMenuItem", "none");
	}
	else {
		$.mobile.changePage("#iLoginPageView", { transition: "slidedown" });
	}

	MUi.setDisplay("iLoginView", "block");

	// Disable menu items
	MUi.setDisplay("iAccauntsMenuItem", "none");
	MUi.setDisplay("iProfileMenuItem", "none");
	MUi.setDisplay("iGeneralMenuItem", "none");
	MUi.setDisplay("iCancelMenuItem", "none");

	// Start content after logout
	MUi.setDisplay("iStartAreaView", "block");
	MUi.setDisplay("iRegestryMenuItem", "block");
}

/* menu */
function HighlightMenu(id) {
	var lastId = globalLastId;
	if(id != "" && id != lastId) {
		var menuItem = document.getElementById(id);
		menuItem.style.backgroundColor = globalCurrentMenuItemBackgroundColor;
	}
}

function UnhighlightMenu(id) {
	var lastId = globalLastId;
	if(id != "" && id != lastId) {
		var menuItem = document.getElementById(id);
		menuItem.style.backgroundColor = globalMenuItemBackgroundColor;
	}
}

function globalAPIOnRestart() {

	if (globalPhaseVersion == 1) {
		ActivateContentP1('iGeneralAreaView', 'iGeneralMenuItem');
	}
	else {
		MLukStaticViews.CMainMenuView.get().activateAreaView('iGeneralAreaView');
	}
}

function ActivateContentP1(contentId, menuId) {

	if (globalPhaseVersion != 1) {
		return;
	}

	CGoodCursor.get().reset();

	var lastId = globalLastId;

	globalLastId = menuId;

	if(contentId != "") {
		
		MUi.disableContent("iTP");						// Только для нулевой демонстрации

		if(contentId == 'iStartAreaView'){
			MUi.disableContent('iScaleableZoneHeaderLink');
			MUi.enableContent('iScaleableZoneHeaderLinkText');
		}
		else {
			MUi.disableContent('iScaleableZoneHeaderLinkText');
			MUi.enableContent('iScaleableZoneHeaderLink');
		}
		var menuItem;
		if (menuId != "" && typeof (menuId) != "undefined" && menuId != undefined) {
			menuItem = document.getElementById(menuId);
			menuItem.style.backgroundColor = globalCurrentMenuItemBackgroundColor;

			if (menuId != lastId && lastId != "" && typeof (lastId) != "undefined" && lastId != undefined) {
				menuItem = document.getElementById(lastId);
				menuItem.style.backgroundColor = globalMenuItemBackgroundColor;
			}
		}
		else {
			if(lastId != "" && typeof(lastId) != "undefined") {
				menuItem = document.getElementById(lastId);
				menuItem.style.backgroundColor = globalMenuItemBackgroundColor;
			}
		}

		if (contentId == "iTP") {
			if (window.globalEnableDebugUI) {

				var goods = new Array(
					{ Name: "Аи-92", Price: "30", Id: "04", Mesure: "л." },
					{ Name: "Аи-95", Price: "35", Id: "01", Mesure: "л." },
					{ Name: "Аи-98", Price: "40", Id: "02", Mesure: "л." },
					{ Name: "Аи-80", Price: "25", Id: "08", Mesure: "л." }
					);

				OnTradeGoodsListLoaded(goods);
			}
			else {
				getTradeGoodsList();
			}
		}

		MLukStaticViews.CMainMenuView.get().activateAreaView(contentId);
	}
}

function OnAccountInfoLoaded(info) {
	RenderAccountInfo(info);
}

function RenderAccountInfo(info) {
	var content = $("#iAccountsAreaView");
	if(!	info || !Array.isArray(info)) {
		content.html("<h1>Ошибка отображения состояния счетов.</h1>");
	}
	else {
		var render = "";
		for(var j = 0; j < info.length; j++) {
			var acc = info[j];

			var rkWidget = new globalAPIRobokassaWidget(acc.Number);

			render += "<h1>Счета</h1>\n";
			render += MUi.newResource("<table class='cCommon'>\n<tr><th>Счет №</th><th>{0}</th></tr>\n<tr><td>Остаток</td><td>{1} <i>р.</i></td></tr><tr><td>Заблокировано</td><td>{2} <i>р.</i></td></tr><td>Пополнить через</td><td>{3}</i></td></tr>\n").format(
				acc.Number, acc.Free.round(2), (acc.Amount - acc.Free).round(2), rkWidget.render());
			render += "</table>";
		}
		content.html(render);
	}
}

function OnTradeGoodsListLoaded(goods) {
	CGoodsList.get().init(goods);
}

function OnBuyComplete(ok) {
	CGoodsList.get().renderOperationComplete(ok);
}

function ValidateRegistration() {
	var login = $("#iRegisterLogin");
	var pass = $("#iRegisterPassword");
	var pass2 = $("#iRegisterPassword2");
	var button = $("#iRegisterButton");

	var ok = true;
	if(login.val() == '') {
		login.addClass("cInputError");
		ok = false;
	}
	else {
		login.removeClass("cInputError");
	}
	if(pass.val() == '') {
		pass.addClass("cInputError");
		ok = false;
	}
	else {
		pass.removeClass("cInputError");
	}
	if(pass2.val() != pass.val()) {
		pass2.addClass("cInputError");
		ok = false;
	}
	else {
		pass2.removeClass("cInputError");
	}
	button.prop("disabled", !ok);
}

function Route() {
	var referrer = document.referrer;

	if(referrer.search(ROBOKASSA_SUCCESS_URL) >= 0) {
		LoadPaymentContext();
	}
	else if(referrer.search(ROBOKASSA_FAILURE_URL) >= 0) {
		if (globalPhaseVersion == 1) {
			$('#iAccountFndFailure').dialog('open');
		} else {
			$('#iDialogFundFailure').popup('open');
		}
		LoadPaymentContext();
	}
}

function OnPaymentContextLoaded(context) {
	MLukStaticViews.CMainMenuView.get().conitueAfterPaymentDataEventHandler(context);
}

function globalAPISavePaymentContext(context) {
	var expire = new Date();
	expire.setTime(expire.getTime() + SESSION_STORAGE_MINUTES * 60 * 1000);

	$.cookie(PAYMENT_CONTEXT_FUNDSKOP_COOKIE_NAME, context.FundsKop, { expires: expire });
	$.cookie(PAYMENT_CONTEXT_FUELNAME_COOKIE_NAME, context.FuelName, { expires: expire });
}

function LoadPaymentContext() {
	var fundsKop = +$.cookie(PAYMENT_CONTEXT_FUNDSKOP_COOKIE_NAME);
	var fuelName = $.cookie(PAYMENT_CONTEXT_FUELNAME_COOKIE_NAME);
	var context = null;

	if (fundsKop && fuelName) {
		context = { FundsKop: fundsKop, FuelName: fuelName }
	}

	OnPaymentContextLoaded(context);
	DeletePaymentContext();

	return context;
}

function DeletePaymentContext() {
	$.removeCookie(PAYMENT_CONTEXT_FUNDSKOP_COOKIE_NAME);
	$.removeCookie(PAYMENT_CONTEXT_FUELNAME_COOKIE_NAME);
}
