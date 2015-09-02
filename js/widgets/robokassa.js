// http://mirror.ac-nn.ru:10080/mediawiki/index.php/Use_Case_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B_%D0%A0%D0%BE%D0%B1%D0%BE%D0%BA%D0%B0%D1%81%D1%81%D0%B0
var ROBOKASSA_URL = "https://auth.robokassa.ru/Merchant/Index.aspx";

function globalAPIRobokassaWidget(account, defaultValue, openInNewWindow) {
	this.RegisterWidget();
	this.Account = account;
	this.DefaultValue = defaultValue ? defaultValue : 1000;
	this.OpenInNewWindow = openInNewWindow;
}

globalAPIRobokassaWidget.prototype = BaseWidget;
if (globalPhaseVersion == 1) {
	globalAPIRobokassaWidget.prototype.Template =
		"<img id='robokassa_widget_button_{0}' class='cRobokassaButton' src='images/robokassa.png' alt='RoboKassa'/>\
	<div id='robokassa_widget_dialog_{0}' title='Пополнение счета'>\
		<label for='robokassa_ammount'>Размер вклада в рублях:</label>\
		<input type='number' id='robokassa_ammount_{0}' value='{1}'/>\
	</div>\
	<script>\
		var robokassa_widget_dialog_{0} = $('#robokassa_widget_dialog_{0}');\
		var robokassa_widget_button_{0} = $('#robokassa_widget_button_{0}');\
		robokassa_widget_dialog_{0}.dialog({ autoOpen: false, modal: true,\
			buttons: {\
				'Пополнить': function() { BaseWidget.Registry[{0}].Fund(); },\
				'Отмена': function() { robokassa_widget_dialog_{0}.dialog('close'); }\
			}\
		});\
		robokassa_widget_button_{0}.click(function() { robokassa_widget_dialog_{0}.dialog('open'); });\
	</script>";
} else {
	globalAPIRobokassaWidget.prototype.Template =
		"<a href='#robokassa_widget_dialog_{0}' data-rel='popup' data-position-to='window' border='0'>\
			<img id='robokassa_widget_button_{0}' class='cRobokassaButton' src='images/robokassa.png' alt='RoboKassa'/>\
		</a>\
		<div id='robokassa_widget_dialog_{0}' data-role='popup' data-overlay-theme='a' data-theme='c' class='ui-corner-all'>\
				<div data-role='header' class='ui-corner-top' data-theme='a'>\
					<h2><font>Пополнение счета</font></h2>\
				</div>\
				<div data-role='content' class='ui-corner-bottom ui-content' data-theme='d'>\
					<p>\
						<label for='robokassa_ammount_{0}'>Размер вклада в рублях:</label>\
						<font><input type='number' id='robokassa_ammount' value='{1}'/></font>\
					</p>\
					<a href='#' data-role='button' data-inline='true' data-icon='plus' onclick='BaseWidget.Registry[{0}].Fund();'>Пополнить</a>\
					<a href='#' data-rel='back' data-role='button' data-inline='true' data-icon='delete'>Закрыть</a>\
				</div>\
		</div>\
		<script>\
			var robokassa_widget_dialog_{0} = $('#robokassa_widget_dialog_{0}');\
			var robokassa_widget_button_{0} = $('#robokassa_widget_button_{0}');\
			robokassa_widget_dialog_{0}.popup();\
			robokassa_widget_dialog_{0}.enhanceWithin();\
			robokassa_widget_button_{0}.enhanceWithin();\
		</script>";
}

globalAPIRobokassaWidget.prototype.render = function () {
	return MUi.newResource(this.Template).format(this.Id, this.DefaultValue);
}

globalAPIRobokassaWidget.prototype.getButtonId = function () {
	return 'robokassa_widget_button_' + this.Id;
}

globalAPIRobokassaWidget.prototype.Fund = function () {
	var ammountElement = $("#robokassa_ammount_" + this.Id);
	var amount = +ammountElement.val();
	if(!amount) {
		ammountElement.addClass('cUiStateError');
		return;
	}
	ammountElement.removeClass('cUiStateError');
	if (globalPhaseVersion == 1) {
		$("#robokassa_widget_dialog_" + this.Id).dialog('close');
	} else {
		$("#robokassa_widget_dialog_" + this.Id).popup('close');
	}

	var robokassa = new RobokassaController(this);
	robokassa.CreateUnconfirmedPayment(this.Account, amount);
}

globalAPIRobokassaWidget.prototype.OnUnconfirmedPaymentCreated = function (id, account, amount, login, signature) {
	// TODO: handle observer.OnUnconfirmedPaymentCreated(false) call in case of error
	var description = MUi.newResource("Пополнение счета {0} на {1}р по операции {2}").format(account, amount, id);
	if (this.OpenInNewWindow) {
		$("#iRobokassaLoginW").val(login);
		$("#iRobokassaSumW").val(amount);
		$("#iRobokassaIdW").val(id);
		$("#iRobokassaDescW").val(description);
		$("#iRobokassaSignatureW").val(signature);
		$("#iRobokassaFormW").submit();
	} else {
		$("#iRobokassaLogin").val(login);
		$("#iRobokassaSum").val(amount);
		$("#iRobokassaId").val(id);
		$("#iRobokassaDesc").val(description);
		$("#iRobokassaSignature").val(signature);
		$("#iRobokassaForm").submit();
	}
}
