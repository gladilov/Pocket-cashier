var BUY_URL =  globalAPIPc + "trade/buy";

function globalAPIBuyP0(basket) {
	globalAPIDebugOutput("\n\nbuy:\n");
	var request = { "TpTag": "GasStation123", "PosId": 1, "Cart": [] };
	
	for(var j = 0; j < basket.length; j++) {
		var good = basket[j];
			
		request.Cart.push({"Id": good.Id, "Quantity": Number(good.Quantity)});
	}	
	
	Rest.Json.post(BUY_URL, request, false, { Authorization: "bearer " + globalAPISessionId })
		.done(function(response) {
			globalAPIDebugOutput(JSON.stringify(response));
			OnBuyComplete(!response.Exception);
		})
		.fail(function(jqxhr, textStatus, error) {
			globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
			OnBuyComplete(false);
		});
}
