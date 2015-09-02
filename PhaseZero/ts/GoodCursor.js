//===============================================================================================
// CGoodCursor
var CGoodCursor = (function () {
    function CGoodCursor() {
        this.currentGoodIndex = 0;
        this.goodItemFontColorBackup = "";
        this.goodItemCursorStyleBackup = "";
        this.goodBackgroundColorBackup = "";
        this.goodFontWeightBackup = "";
        this.rightAreaBackgroundColorBackup = "";
        this.cursorType = "auto";
        if (CGoodCursor.instance) {
            throw new Error("Error: Instantiation failed: Use Get() instead of new.");
        }
        CGoodCursor.instance = this;
    }
    CGoodCursor.get = function () {
        if (CGoodCursor.instance === null) {
            CGoodCursor.instance = new CGoodCursor();
            CGoodCursor.instance.reset();
        }
        return CGoodCursor.instance;
    };
    CGoodCursor.prototype.reset = function () {
        this.currentGoodIndex = 0;
        this.goodItemFontColorBackup = "";
        this.goodItemCursorStyleBackup = "";
        this.goodBackgroundColorBackup = "";
        this.goodFontWeightBackup = "";
        this.rightAreaBackgroundColorBackup = "";
        this.cursorType = "auto";
        this.goodCursorFontColor = MUi.getResource("iGoodCursorFontColor").color();
        this.goodRightAreaBackgroundColorActive = MUi.getResource("iGoodRightAreaBackgroundColorActive").color();
        this.goodBackgroundColor = MUi.getResource("iGoodBackgroundColor").color();
        MUi.setDisplay("iTPGoodsListInfo", "none");
    };
    CGoodCursor.prototype.selectAction = function (goodItemIdToActivate, goodItemIndexToActivate) {
        var goodItemIndexToDactivate = this.currentGoodIndex;
        this.currentGoodIndex = goodItemIndexToActivate;
        var goodItemIdToDeactivate = CGoodsList.get().currentCategoryGoods[goodItemIndexToDactivate].Id;
        var goodTableRow = $("#iGoodTableRight");
        goodTableRow.html(MUi.getResource("iBasketSubmitFromResource").resourceString());
        var goodCursorIdToActivate = MUi.newResource("iGoodCursor_{0}").format(goodItemIdToActivate);
        MUi.setDisplay(goodCursorIdToActivate, "block");
        var goodItemTrToActivate = document.getElementById(MUi.newResource("iGoodTr_{0}").format(goodItemIdToActivate));
        this.goodItemFontColorBackup = goodItemTrToActivate.style.color;
        this.goodItemCursorStyleBackup = goodItemTrToActivate.style.cursor;
        this.goodBackgroundColorBackup = goodItemTrToActivate.style.backgroundColor;
        this.goodFontWeightBackup = goodItemTrToActivate.style.fontWeight;
        goodItemTrToActivate.style.color = this.goodCursorFontColor;
        goodItemTrToActivate.style.cursor = this.cursorType;
        goodItemTrToActivate.style.fontWeight = "bold";
        goodItemTrToActivate.style.backgroundColor = this.goodBackgroundColor;
        if (goodItemIndexToDactivate != goodItemIndexToActivate) {
            var goodCursorIdToDeactivate = MUi.newResource("iGoodCursor_{0}").format(goodItemIdToDeactivate);
            MUi.setDisplay(goodCursorIdToDeactivate, "none");
            var goodItemTrToDeactivate = document.getElementById(MUi.newResource("iGoodTr_{0}").format(goodItemIdToDeactivate));
            goodItemTrToDeactivate.style.color = this.goodItemFontColorBackup;
            goodItemTrToDeactivate.style.cursor = this.goodItemCursorStyleBackup;
            goodItemTrToDeactivate.style.backgroundColor = this.goodBackgroundColorBackup;
            goodItemTrToDeactivate.style.fontWeight = this.goodFontWeightBackup;
        }
        var goodsListInfo = $("#iTPGoodsListInfo");
        var goodItemToActivate = CGoodsList.get().currentCategoryGoods[goodItemIndexToActivate];
        goodsListInfo.html(MUi.getResource("iTPGoodsListInfoResource").format(goodItemToActivate.Description, goodItemToActivate.Price));
        MUi.setDisplay("iTPGoodsListInfo", "block");
    };
    CGoodCursor.prototype.putCurrentInBasketAction = function () {
        CGoodsList.get().addToBasket(this.currentGoodIndex);
    };
    CGoodCursor.prototype.decCurrentInBasketAction = function () {
        var value = $("#iNumbersOfGoodItems").val();
        if (value > 1) {
            value--;
            $("#iNumbersOfGoodItems").val(value);
        }
    };
    CGoodCursor.prototype.incCurrentInBasketAction = function () {
        var value = $("#iNumbersOfGoodItems").val();
        value++;
        $("#iNumbersOfGoodItems").val(value);
    };
    CGoodCursor.prototype.activateRightAreaAction = function (index) {
        if (typeof index == "boolean" || this.currentGoodIndex == index) {
            var goodId = CGoodsList.get().currentCategoryGoods[this.currentGoodIndex].Id;
            var itemRight = document.getElementById("iGoodTableRight");
            this.rightAreaBackgroundColorBackup = itemRight.style.backgroundColor;
            itemRight.style.backgroundColor = this.goodRightAreaBackgroundColorActive;
            var goodItemTr = document.getElementById(MUi.newResource("iGoodTr_{0}").format(goodId));
            goodItemTr.style.backgroundColor = this.goodRightAreaBackgroundColorActive;
            var triangle = document.getElementById(MUi.newResource("iGoodCursor_{0}").format(goodId));
            triangle.style.borderRightColor = this.goodRightAreaBackgroundColorActive;
            var info = document.getElementById("iTPGoodsListInfo");
            info.style.backgroundColor = this.goodRightAreaBackgroundColorActive;
        }
    };
    CGoodCursor.prototype.deactivateRightAreaAction = function (index) {
        if (typeof index == "boolean" || this.currentGoodIndex == index) {
            var goodId = CGoodsList.get().currentCategoryGoods[this.currentGoodIndex].Id;
            var item = document.getElementById("iGoodTableRight");
            item.style.backgroundColor = this.rightAreaBackgroundColorBackup;
            var goodItemTr = document.getElementById(MUi.newResource("iGoodTr_{0}").format(goodId));
            goodItemTr.style.backgroundColor = this.goodBackgroundColor;
            var triangle = document.getElementById(MUi.newResource("iGoodCursor_{0}").format(goodId));
            triangle.style.borderRightColor = this.goodBackgroundColor;
            var info = document.getElementById("iTPGoodsListInfo");
            info.style.backgroundColor = this.goodBackgroundColor;
        }
    };
    /*
        Singltone
    */
    CGoodCursor.instance = null;
    return CGoodCursor;
})();
// GoodCursor
//=============================================================================================== 
//# sourceMappingURL=GoodCursor.js.map