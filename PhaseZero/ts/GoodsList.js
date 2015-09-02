//===============================================================================================
// CGoodsList
var CGoodsList = (function () {
    function CGoodsList() {
        this.combineItems = true;
        if (CGoodsList.instance) {
            throw new Error("Error: Instantiation failed: Use Get() instead of new.");
        }
        CGoodsList.instance = this;
    }
    CGoodsList.get = function () {
        if (CGoodsList.instance === null) {
            CGoodsList.instance = new CGoodsList();
            CGoodsList.instance.reset();
        }
        return CGoodsList.instance;
    };
    CGoodsList.prototype.reset = function () {
        this.categoriesAndGoods = new Array();
        this.currentCategoryPath = new Array();
        this.currentCategoryList = new Array();
        this.currentCategoryGoods = new Array();
        this.basket = new Array();
        this.combineItems = true;
    };
    CGoodsList.prototype.init = function (goods) {
        this.reset();
        this.categoriesAndGoods = goods;
        this.currentCategoryPath.length = 0;
        if (this.categoriesAndGoods.length) {
            this.currentCategoryPath.push({ "CategoriesAndGoods": this.categoriesAndGoods, "CategoryName": "Товары" });
            this.render();
        }
    };
    CGoodsList.prototype.render = function () {
        var currentCategory = this.currentCategoryPath[this.currentCategoryPath.length - 1];
        //Split on goods & categories	
        this.currentCategoryGoods.length = 0;
        this.currentCategoryList.length = 0;
        for (var j = 0; j < currentCategory.CategoriesAndGoods.length; j++) {
            var goodOrCategory = currentCategory.CategoriesAndGoods[j];
            if (goodOrCategory.Id > 0) {
                this.currentCategoryGoods.push(goodOrCategory);
            }
            else {
                this.currentCategoryList.push(goodOrCategory);
            }
        }
        //Render header
        var headerContent = $("#iTPHeader");
        headerContent.html("АЗС №256");
        //Render category
        this.renderCategories();
        //Render goods list
        this.renderGoodsList();
    };
    CGoodsList.prototype.renderCategories = function () {
        //Category path
        var renderCategoryPath = "";
        var length = this.currentCategoryPath.length;
        var j;
        for (j = 0; j < length; j++) {
            var categoryName = this.currentCategoryPath[j].CategoryName;
            if (j == length - 1) {
                renderCategoryPath = renderCategoryPath + MUi.getResource("iTPCategoriesPathLastResource").format(categoryName);
            }
            else {
                renderCategoryPath = renderCategoryPath + MUi.getResource("iTPCategoriesPathResource").apply({ CategoryIndexInPath: j, CategoryName: categoryName });
            }
        }
        //Categories list
        var renderCategoriesList = "";
        for (j = 0; j < this.currentCategoryList.length; j++) {
            renderCategoriesList = renderCategoriesList + MUi.getResource("iTPCategoriesListResource").apply({ CategoryIndexInPath: j, Category: this.currentCategoryList[j].Name });
        }
        //Categories
        var categoriesContent = $("#iTPCategories");
        categoriesContent.html(MUi.getResource("iTPCategoriesResource").format(renderCategoryPath, renderCategoriesList));
    };
    CGoodsList.prototype.renderGoodsList = function () {
        var content = $("#iTPGoodsList");
        if (!this.currentCategoryGoods || !Array.isArray(this.currentCategoryGoods)) {
            content.html("Ошибка отображения списка товаров.");
        }
        else {
            var headerContent = $("#iTPGoodsListHeader");
            headerContent.html(this.currentCategoryPath[this.currentCategoryPath.length - 1].CategoryName);
            if (this.currentCategoryGoods.length) {
                var render = "";
                for (var j = 0; j < this.currentCategoryGoods.length; j++) {
                    var tg = this.currentCategoryGoods[j];
                    render += MUi.getResource("iTPGoodsListTrResource").apply({ categoryGoodName: tg.Name, categoryGoodPrice: tg.Price, categoryGoodId: tg.Id, categoryGoodIndex: j });
                }
                content.html(MUi.getResource("iTPGoodsListTableResource").formatHtml(render));
                CGoodCursor.get().selectAction(this.currentCategoryGoods[0].Id, 0);
            }
            else {
                content.html("Выберите подкатегорию товара");
            }
        }
        this.renderBasket();
    };
    CGoodsList.prototype.renderOperationComplete = function (ok) {
        var content = $("#iTPBasket");
        var contentHeader = $("#iTPBasketHeader");
        contentHeader.html("Результат покупки");
        if (!ok) {
            content.html("Операция покупки неудалась.");
        }
        else {
            this.deleteBasket();
            content.html("Покупка произведена успешно.");
        }
    };
    CGoodsList.prototype.deleteBasket = function () {
        this.basket.length = 0;
        this.renderBasket();
    };
    CGoodsList.prototype.deleteFromBasket = function (goodIndex) {
        this.basket.splice(goodIndex, 1);
        this.renderBasket();
    };
    CGoodsList.prototype.addToBasket = function (goodIndex) {
        var number = $("#iNumbersOfGoodItems").val();
        if (number > 0) {
            var basketGoodIndex = this.basket.length;
            var newGoodInbasket = true;
            if (this.combineItems) {
                var id = this.currentCategoryGoods[goodIndex].Id;
                for (var j = 0; j < this.basket.length; j++) {
                    if (this.basket[j].Id == id) {
                        basketGoodIndex = j;
                        newGoodInbasket = false;
                        break;
                    }
                }
            }
            if (newGoodInbasket) {
                this.basket.push(this.clone(this.currentCategoryGoods[goodIndex]));
            }
            if (newGoodInbasket) {
                this.basket[basketGoodIndex].Quantity = number;
            }
            else {
                this.basket[basketGoodIndex].Quantity = MUi.newResource("{0}").format(Number(this.basket[basketGoodIndex].Quantity) + Number(number));
            }
            this.renderBasket();
        }
    };
    CGoodsList.prototype.renderBasket = function () {
        var contentHeader = $("#iTPBasketHeader");
        contentHeader.html("Корзина");
        var content = $("#iTPBasket");
        var total = 0;
        var render = "<table class='cCommon'>\n<tr><th>Товар</th><th>Стоимость</th><th>Колличество</th><th class='cActive cRemove' onclick=\"CGoodsList.get().deleteBasket()\">&times;</th></tr>\n";
        if (this.basket.length != 0) {
            for (var j = 0; j < this.basket.length; j++) {
                var tg = this.basket[j];
                total = total + Number(tg.Price) * Number(tg.Quantity);
                render += MUi.newResource("<tr id=\"iBasketTr_{2}\"><td id=\"iBasketTd_{2}_1\">{0}</td><td id=\"iBasketTd_{2}_2\">{1} <i>р.</i></td><td>{4} {5}</td><td class='cActive cRemove' onclick=\"CGoodsList.get().deleteFromBasket({3})\">&times;</td></tr>\n").format(tg.Name, tg.Price, tg.Id, j, tg.Quantity, tg.Mesure);
            }
            render += MUi.newResource("<tr id='iBasketBuy' class='cActive' onclick='CGoodsList.get().onBuyAction()'><td><b>Итого</b></td><td><b>{0}<i>р.</i></b></td><td><b>Купить</b></td><td><div class='cTriangleRight'></div></td></tr>\n").format(total);
        }
        else {
            render += "<tr><td>Козина пуста</td><td></td><td></td><td></td></tr>\n";
        }
        render += "</table>\n";
        content.html(render);
    };
    CGoodsList.prototype.onSelectCategoryFromPathAction = function (pathIndex) {
        this.currentCategoryPath = this.currentCategoryPath.slice(0, pathIndex + 1);
        CGoodCursor.get().reset();
        this.render();
    };
    CGoodsList.prototype.onSelectCategoryFromListAction = function (listIndex) {
        this.currentCategoryPath.push({ "CategoriesAndGoods": this.currentCategoryList[listIndex].Children, "CategoryName": this.currentCategoryList[listIndex].Name });
        CGoodCursor.get().reset();
        this.render();
    };
    CGoodsList.prototype.onBuyAction = function () {
        globalAPIBuyP0(this.basket);
    };
    // Сlone array function
    CGoodsList.prototype.clone = function (obj) {
        var copy = {};
        for (var key in obj) {
            copy[key] = obj[key];
        }
        return copy;
    };
    /*
        Singltone
    */
    CGoodsList.instance = null;
    return CGoodsList;
})();
;
// CGoodsList
//=============================================================================================== 
//# sourceMappingURL=GoodsList.js.map