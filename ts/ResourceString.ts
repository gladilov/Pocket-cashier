module MUi{
	export class CResourceString {

		public str: string;
		private static resources = {};
		private resourceId: string;
		private static nextId = 0;

		constructor(resourceStr: string, resourceId?: string) {
			this.resourceId = resourceId;
			this.str = resourceStr;
		}

		static constractById(resourceId: string) {
			return new CResourceString(CResourceString.getById(resourceId), resourceId);
		}

		private static getById(resourceId: string) {

			var result;
			if (!CResourceString.resources.hasOwnProperty(resourceId)) {
				var resource = $("#" + resourceId);
				result = resource.html();
				CResourceString.resources[resourceId] = result;
			}
			else {
				result = CResourceString.resources[resourceId];
			}

			return result;
		}

		private generateId(newId: string): string {
			if (newId == null || newId == undefined || newId == "") {
				newId = "iGeneratedId" + String(CResourceString.nextId++);
			}
			return newId;
		}
		
		/*
			Возвращает строку ресурса
		*/
		resourceString() {
			return this.str;
		}

		/*
			Подменяет _key_ на
			значение из переданного списка ключ-значение, при соответствии ключа key.
		*/

		apply(args: any) {
			var result: string = this.str;
			for (var key in args) {
				var reg = new RegExp("_" + key + "_", "g");
				result = result.replace(reg, args[key]);
			}

			var reg = new RegExp("_[A-Za-z0-9]+_", "g");
			result = result.replace(reg, "");

			return result;
		}


		/*
			Подменяет _NewId_ на указанный Id, если newId == "" или newId == undefined, то Id генерируется автоматически.
			Подменяет _key_ на
			значение из переданного списка ключ-значение, при соответствии ключа key.
		*/

		applyAndSetId(args: any, newId?: string): { html: string; id: string} {
			var result: string = this.str;
			for (var key in args) {
				var reg = new RegExp("_" + key + "_", "g");
				result = result.replace(reg, args[key]);
			}
			
			//Генерирем id если id не задан
			newId = this.generateId(newId);

			var regId = new RegExp("_NewId_", "g");			
			result = result.replace(regId, newId);

			var reg = new RegExp("_[A-Za-z0-9]+_", "g");
			result = result.replace(reg, "");
			
			return { html: result, id: newId};
		}


		/*
			Подменяет {n} на
			переданные параметры, n соответствует порядковому номеру параметра.
		*/

		format(...args: any[]) {
			return this.str.replace(/{(\d+)}/g, (match, number) => typeof args[number] != 'undefined'
			    ? args[number]
			    : match);
		}
	
		/*
			Подменяет <!-- {n} --> на
			переданные параметры, n соответствует порядковому номеру параметра.
		*/
		formatHtml(...args: any[]) {
			return this.str.replace(/<!-- {(\d+)} -->/g, (match, number) => typeof args[number] != 'undefined'
			    ? args[number]
			    : match);
		}

		/*
			Получает стиль ресурса из css, возвращает цвет стиля.
		*/
		color() {
			if (this.resourceId != "" && this.resourceId != undefined) {
				var rgb = $('#' + this.resourceId).css('color').match(/\d+/g);
				var hexColor = '#' + String('0' + Number(rgb[0]).toString(16)).slice(-2) + String('0' + Number(rgb[1]).toString(16)).slice(-2) + String('0' + Number(rgb[2]).toString(16)).slice(-2);
				return hexColor;
			}
			return "#000000";
		}

		/*
			Получает стиль ресурса из css, возвращает знаяение стиля.
		*/
		css(key: string) {

			if (this.resourceId != "" && this.resourceId != undefined) {

				return $('#' + this.resourceId).css(key);
			}

			return "";
		}
	}

	export function newResource(resourceStr: string) { // В качестве ресурса используеться переданная строка, возвращает ресурс как CResourceString.
		return new CResourceString(resourceStr);
	}

	export function getResource(resourceId: string) {	// Достает ресурс из html, возвращает ресурс как CResourceString.
		return CResourceString.constractById(resourceId);
	}
}