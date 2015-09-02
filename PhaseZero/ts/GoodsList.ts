//===============================================================================================
// CGoodsList
class CGoodsList {

	/*
		Singltone
	*/

	private static instance: CGoodsList = null;

	constructor() {
		if (CGoodsList.instance) {
			throw new Error("Error: Instantiation failed: Use Get() instead of new.");
		}
		CGoodsList.instance = this;
	}

	public static get(): CGoodsList {
		if (CGoodsList.instance === null) {
			CGoodsList.instance = new CGoodsList();
			CGoodsList.instance.reset();
		}
		return CGoodsList.instance;
	}

	public currentCategoryGoods;

	private categoriesAndGoods;
	private currentCategoryPath;
	private currentCategoryList;	
	private basket;
	private combineItems: boolean = true;

	private reset(){
		this.categoriesAndGoods = new Array();
		this.currentCategoryPath = new Array();
		this.currentCategoryList = new Array();
		this.currentCategoryGoods = new Array();
		this.basket = new Array();
		this.combineItems = true;
	}

	init(goods) {

		this.reset();

		this.categoriesAndGoods = goods;
		this.currentCategoryPath.length = 0;

		if (this.categoriesAndGoods.length) {
			this.currentCategoryPath.push({ "CategoriesAndGoods": this.categoriesAndGoods, "CategoryName": "Товары" });
			this.render();
		}
	}

	render() {

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
	}

	renderCategories() {
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
	}

	renderGoodsList() {
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
	}

	renderOperationComplete(ok) {
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
	}

	deleteBasket() {
		this.basket.length = 0;
		this.renderBasket();
	}

	deleteFromBasket(goodIndex) {
		this.basket.splice(goodIndex, 1);
		this.renderBasket();
	}

	addToBasket(goodIndex) {

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
	}

	renderBasket() {

		var contentHeader = $("#iTPBasketHeader");
		contentHeader.html("Корзина");

		var content = $("#iTPBasket");
		var total = 0;

		var render = "<table class='cCommon'>\n<tr><th>Товар</th><th>Стоимость</th><th>Колличество</th><th class='cActive cRemove' onclick=\"CGoodsList.get().deleteBasket()\">&times;</th></tr>\n";
		if (this.basket.length != 0) {
			for (var j = 0; j < this.basket.length; j++) {
				var tg = this.basket[j];
				total = total + Number(tg.Price) * Number(tg.Quantity);
				render += MUi.newResource("<tr id=\"iBasketTr_{2}\"><td id=\"iBasketTd_{2}_1\">{0}</td><td id=\"iBasketTd_{2}_2\">{1} <i>р.</i></td><td>{4} {5}</td><td class='cActive cRemove' onclick=\"CGoodsList.get().deleteFromBasket({3})\">&times;</td></tr>\n").format(
					tg.Name, tg.Price, tg.Id, j, tg.Quantity, tg.Mesure);
			}
			render += MUi.newResource("<tr id='iBasketBuy' class='cActive' onclick='CGoodsList.get().onBuyAction()'><td><b>Итого</b></td><td><b>{0}<i>р.</i></b></td><td><b>Купить</b></td><td><div class='cTriangleRight'></div></td></tr>\n").format(total);
		}
		else {
			render += "<tr><td>Козина пуста</td><td></td><td></td><td></td></tr>\n";
		}
		render += "</table>\n";
		content.html(render);
	}

	onSelectCategoryFromPathAction(pathIndex) {
		this.currentCategoryPath = this.currentCategoryPath.slice(0, pathIndex + 1);
		CGoodCursor.get().reset();
		this.render();
	}

	onSelectCategoryFromListAction(listIndex) {
		this.currentCategoryPath.push({ "CategoriesAndGoods": this.currentCategoryList[listIndex].Children, "CategoryName": this.currentCategoryList[listIndex].Name });
		CGoodCursor.get().reset();
		this.render();
	}

	onBuyAction() {
		globalAPIBuyP0(this.basket);
	}

	// Сlone array function
	clone(obj) {
		var copy = {};
		for (var key in obj) {
			copy[key] = obj[key];
		}
		return copy;
	}
};
// CGoodsList
//===============================================================================================