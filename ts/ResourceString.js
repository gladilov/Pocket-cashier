var MUi;
(function (MUi) {
    var CResourceString = (function () {
        function CResourceString(resourceStr, resourceId) {
            this.resourceId = resourceId;
            this.str = resourceStr;
        }
        CResourceString.constractById = function (resourceId) {
            return new CResourceString(CResourceString.getById(resourceId), resourceId);
        };
        CResourceString.getById = function (resourceId) {
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
        };
        CResourceString.prototype.generateId = function (newId) {
            if (newId == null || newId == undefined || newId == "") {
                newId = "iGeneratedId" + String(CResourceString.nextId++);
            }
            return newId;
        };
        /*
            Возвращает строку ресурса
        */
        CResourceString.prototype.resourceString = function () {
            return this.str;
        };
        /*
            Подменяет _key_ на
            значение из переданного списка ключ-значение, при соответствии ключа key.
        */
        CResourceString.prototype.apply = function (args) {
            var result = this.str;
            for (var key in args) {
                var reg = new RegExp("_" + key + "_", "g");
                result = result.replace(reg, args[key]);
            }
            var reg = new RegExp("_[A-Za-z0-9]+_", "g");
            result = result.replace(reg, "");
            return result;
        };
        /*
            Подменяет _NewId_ на указанный Id, если newId == "" или newId == undefined, то Id генерируется автоматически.
            Подменяет _key_ на
            значение из переданного списка ключ-значение, при соответствии ключа key.
        */
        CResourceString.prototype.applyAndSetId = function (args, newId) {
            var result = this.str;
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
            return { html: result, id: newId };
        };
        /*
            Подменяет {n} на
            переданные параметры, n соответствует порядковому номеру параметра.
        */
        CResourceString.prototype.format = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return this.str.replace(/{(\d+)}/g, function (match, number) { return typeof args[number] != 'undefined'
                ? args[number]
                : match; });
        };
        /*
            Подменяет <!-- {n} --> на
            переданные параметры, n соответствует порядковому номеру параметра.
        */
        CResourceString.prototype.formatHtml = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return this.str.replace(/<!-- {(\d+)} -->/g, function (match, number) { return typeof args[number] != 'undefined'
                ? args[number]
                : match; });
        };
        /*
            Получает стиль ресурса из css, возвращает цвет стиля.
        */
        CResourceString.prototype.color = function () {
            if (this.resourceId != "" && this.resourceId != undefined) {
                var rgb = $('#' + this.resourceId).css('color').match(/\d+/g);
                var hexColor = '#' + String('0' + Number(rgb[0]).toString(16)).slice(-2) + String('0' + Number(rgb[1]).toString(16)).slice(-2) + String('0' + Number(rgb[2]).toString(16)).slice(-2);
                return hexColor;
            }
            return "#000000";
        };
        /*
            Получает стиль ресурса из css, возвращает знаяение стиля.
        */
        CResourceString.prototype.css = function (key) {
            if (this.resourceId != "" && this.resourceId != undefined) {
                return $('#' + this.resourceId).css(key);
            }
            return "";
        };
        CResourceString.resources = {};
        CResourceString.nextId = 0;
        return CResourceString;
    })();
    MUi.CResourceString = CResourceString;
    function newResource(resourceStr) {
        return new CResourceString(resourceStr);
    }
    MUi.newResource = newResource;
    function getResource(resourceId) {
        return CResourceString.constractById(resourceId);
    }
    MUi.getResource = getResource;
})(MUi || (MUi = {}));
//# sourceMappingURL=ResourceString.js.map