var globalDebugOutput = "";
var globalDebugVisibility = false;

function OnSwitchDebugAction(){
	if(globalDebugVisibility) {
		MUi.setDisplay("iDebugOutput", "none");
		globalDebugVisibility = false;
	}
	else {
		MUi.setDisplay("iDebugOutput", "block");
		globalDebugVisibility = true;
	}
}

function globalAPIDebugOutput( text ) {
	if(window.globalEnableDebugOutput){
		globalDebugOutput = globalDebugOutput + text;
		var debug = $("#iDebugOutputStream");
		debug.text(globalDebugOutput);
	}
}
