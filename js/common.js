var globalAPIPc = "http://mirror.ac-nn.ru:28080/";
var globalAPITp = "http://mirror.ac-nn.ru:28081/";
//var globalAPIPc = "http://localhost:8080/";
//var globalAPITp = "http://localhost:8081/";

if (!Number.prototype.round) {
	Number.prototype.round = function(places) {
		return +(Math.round(this + "e+" + places) + "e-" + places);
	}
}

if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] != 'undefined'
				? args[number]
				: match
				;
		});
	};
}

if (!String.prototype.formatHtml) {
	String.prototype.formatHtml = function() {
		var args = arguments;
		return this.replace(/<!-- {(\d+)} -->/g, function(match, number) {
			return typeof args[number] != 'undefined'
				? args[number]
				: match
				;
		});
	};
}