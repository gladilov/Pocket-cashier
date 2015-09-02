// http://mirror.ac-nn.ru:10080/mediawiki/index.php/Use_Case_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B_%D0%A0%D0%BE%D0%B1%D0%BE%D0%BA%D0%B0%D1%81%D1%81%D0%B0
var CREATE_PAYMENT_URL = globalAPIPc + "paymentSystems/common/createUnconfirmedPayment";

function RobokassaController(observer) {
	this.Observer = observer;
}

RobokassaController.prototype.CreateUnconfirmedPayment = function(account, amount) {
	// TODO: account id is not used yet
	var observer = this.Observer;
	globalAPIDebugOutput("\n\nRobokassaController.CreateUnconfirmedPayment():\n");
	Rest.Json.post(CREATE_PAYMENT_URL, { "PaymentSystemId": "Robokassa", "Amount": amount }, false, { Authorization: "bearer " + globalAPISessionId })
		.done(function(response) {
			globalAPIDebugOutput(JSON.stringify(response));
			if(response.Exception) {
				observer.OnUnconfirmedPaymentCreated(false);
			}
			else {
				observer.OnUnconfirmedPaymentCreated(
					response.Result.Id,
					account,
					response.Result.PsData.Sum,
					response.Result.PsData.Login,
					response.Result.PsData.Signature);
			}
		})
		.fail(function(jqxhr, textStatus, error) {
			globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
			observer.OnUnconfirmedPaymentCreated(false);
		});
}
