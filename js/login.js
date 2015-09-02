var REGISTER_URL =  globalAPIPc + "user/register";
var LOGIN_URL =  globalAPIPc + "user/login";
var SESSION_STORAGE_MINUTES = 60;
var SESSION_COOKIE_NAME = "pcshr_session";

var globalAPISessionId;

function register() {
	var login = $("#iRegisterLogin").val();
	var pass = $("#iRegisterPassword").val();

	if( login != "" && pass != "" && login == login.trim() && pass == pass.trim() ) {
		globalAPIDebugOutput("\n\register:\n");
		dropSession();
		Rest.Json.post(REGISTER_URL, { Login: login, Password: pass }, false)
			.done(function(response) {
				globalAPIDebugOutput(JSON.stringify(response));
				globalAPISessionId = response.Result;
				saveSession();
				OnLoginEvent(!response.Exception);
			})
			.fail(function(jqxhr, textStatus, error) {
				globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
				OnLoginEvent(false);
			});
	} else {
		if (globalPhaseVersion == 1) {
			$('#iRegistrationInvalid').dialog('open');
		} else {
			$('#iDialogInvalidResitrationInfo').popup('open');
		}
	}
}

function login() {
	var loginVal = $("#iEditLogin").val();
	var pass = $("#iEditPassword").val();

	if( loginVal != "" && pass != "" ) {
		globalAPIDebugOutput("\n\nlogin:\n");
		dropSession();
		Rest.Json.post(LOGIN_URL, { Login: loginVal.trim(), Password: pass.trim() }, false)
			.done(function(response) {
				globalAPIDebugOutput(JSON.stringify(response));
				globalAPISessionId = response.Result;
				saveSession();
				OnLoginEvent(!response.Exception);
			})
			.fail(function(jqxhr, textStatus, error) {
				globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
				OnLoginEvent(false);
			});
	}
}

function logout() {
	MLukStateMachine.CMachine.emmitGlobalCancelViewEvent();
	MLukStateMachine.CMachine.selfDestroy();
	globalAPIDebugOutput("\n\logout\n\n\n\n");

	dropSession();
	globalAPISessionId = null;
}

// Cookie lib is used: https://github.com/carhartl/jquery-cookie
// via CDN: http://cdnjs.com/libraries/jquery-cookie
function saveSession() {
	var expire = new Date();
	expire.setTime(expire.getTime() + SESSION_STORAGE_MINUTES * 60 * 1000);

	$.cookie(SESSION_COOKIE_NAME, globalAPISessionId, { expires: expire });
}

function restoreSession() {
	globalAPISessionId = $.cookie(SESSION_COOKIE_NAME);
}

function dropSession() {
	$.removeCookie(SESSION_COOKIE_NAME);
}
