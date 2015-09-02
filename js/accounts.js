var ACCOUNT_INFO_URL = globalAPIPc + "account/info";

function globalAPIGetAccountInfo() {
    globalAPIDebugOutput("\n\ngetAccountInfo:\n");
	Rest.Json.get(ACCOUNT_INFO_URL, null, false, { Authorization: "bearer " + globalAPISessionId })
        .done(function(response) {
            globalAPIDebugOutput(JSON.stringify(response));
            OnAccountInfoLoaded(!response.Exception ? response.Result : false);
        })
        .fail(function(jqxhr, textStatus, error) {
            globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
            OnAccountInfoLoaded(false);
        });
}
