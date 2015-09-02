module Rest {
    export class Method {
        public static options = 'OPTIONS';
        public static getMethod = 'GET';
        public static head = 'HEAD';
        public static post = 'POST';
        public static put = 'PUT';
        public static deleteMethod = 'DELETE';
        public static trace = 'TRACE';
        public static connect = 'CONNECT';
    }

    export class Json {
        private static jsonType = 'json';
		private static standardTimeout: number = 120 * 1000;	// 120s
		private static longTimeout: number = 15 * 60 * 1000;	// 15m

		public static setWaitMessage() {
		}

        public static post(url: string, data: any, longRequest: boolean, headers: { [name: string]: string; } = null, method: string = Method.post) {
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
        }

        public static get(url: string, data: any, longRequest: boolean, headers: { [name: string]: string; } = null) {
            return this.post(url, data, longRequest, headers, Method.getMethod);
        }

        public static postJsonP(url: string, data: any, longRequest: boolean, headers: { [name: string]: string; } = null, method: string = Method.post) {
            var jsonpUrl = url + (url.indexOf("?") == -1 ? "?" : "&") + "callback=?";
            return this.post(jsonpUrl, data, longRequest, headers, method);
        }
    }
} 