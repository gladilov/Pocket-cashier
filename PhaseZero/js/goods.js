var TRADE_GOODS_INFO_URL = globalAPITp + "goods";

function getTradeGoodsList() {
	globalAPIDebugOutput("\n\ngetTradeGoodsList:\n");
	Rest.Json.get(TRADE_GOODS_INFO_URL, null, false)
		.done(function(response) {
			globalAPIDebugOutput(JSON.stringify(response));
			OnTradeGoodsListLoaded(!response.Exception ? response.Result : false);
		})
		.fail(function(jqxhr, textStatus, error) {
			globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
			OnTradeGoodsListLoaded(false);
		});
}
