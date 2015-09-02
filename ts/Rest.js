var Rest;
(function (Rest) {
    var Method = (function () {
        function Method() {
        }
        Method.options = 'OPTIONS';
        Method.getMethod = 'GET';
        Method.head = 'HEAD';
        Method.post = 'POST';
        Method.put = 'PUT';
        Method.deleteMethod = 'DELETE';
        Method.trace = 'TRACE';
        Method.connect = 'CONNECT';
        return Method;
    })();
    Rest.Method = Method;
    var Json = (function () {
        function Json() {
        }
        Json.setWaitMessage = function () {
        };
        Json.post = function (url, data, longRequest, headers, method) {
            if (headers === void 0) { headers = null; }
            if (method === void 0) { method = Method.post; }
            headers = headers || {};
            if (longRequest) {
                headers['Connection'] = "Keep-Alive";
            }
            return $.ajax({
                type: method || Method.post,
                url: url,
                data: data,
                timeout: longRequest ? this.longTimeout : this.standardTimeout,
                dataType: this.jsonType,
                headers: headers
            });
        };
        Json.get = function (url, data, longRequest, headers) {
            if (headers === void 0) { headers = null; }
            return this.post(url, data, longRequest, headers, Method.getMethod);
        };
        Json.postJsonP = function (url, data, longRequest, headers, method) {
            if (headers === void 0) { headers = null; }
            if (method === void 0) { method = Method.post; }
            var jsonpUrl = url + (url.indexOf("?") == -1 ? "?" : "&") + "callback=?";
            return this.post(jsonpUrl, data, longRequest, headers, method);
        };
        Json.jsonType = 'json';
        Json.standardTimeout = 120 * 1000; // 120s
        Json.longTimeout = 15 * 60 * 1000; // 15m
        return Json;
    })();
    Rest.Json = Json;
})(Rest || (Rest = {}));
//# sourceMappingURL=Rest.js.map