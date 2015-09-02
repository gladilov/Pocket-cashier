var MUi;
(function (MUi) {
    var globalViewСache = {};
    var globalViewDataСache = {};
    function disableContent(contentName) {
        setDisplay(contentName, "none");
    }
    MUi.disableContent = disableContent;
    function enableContent(contentName) {
        setDisplay(contentName, "block");
    }
    MUi.enableContent = enableContent;
    function setDisplay(id, value) {
        if (id != "") {
            var element = document.getElementById(id);
            element.style.display = value;
        }
    }
    MUi.setDisplay = setDisplay;
    function moveViewContent(sourceViewId, destinationViewId) {
        if (sourceViewId != "" && destinationViewId != "") {
            var content = $('#' + sourceViewId).html();
            setView(destinationViewId, content);
            resetView(sourceViewId);
        }
    }
    MUi.moveViewContent = moveViewContent;
    function getViewContent(sourceViewId, destinationViewId) {
        if (sourceViewId != "" && destinationViewId != "") {
            return $('#' + sourceViewId).html();
        }
        return "";
    }
    MUi.getViewContent = getViewContent;
    function copyViewContent(sourceViewId, destinationViewId) {
        if (sourceViewId != "" && destinationViewId != "") {
            var content = $('#' + sourceViewId).html();
            setView(destinationViewId, content);
        }
    }
    MUi.copyViewContent = copyViewContent;
    function applyToView(viewId, resourceId, viewData) {
        globalViewDataСache[viewId] = viewData;
        var res = MUi.getResource(resourceId).apply(viewData);
        setView(viewId, res);
    }
    MUi.applyToView = applyToView;
    function setView(viewId, resource) {
        globalViewСache[viewId] = resource;
        var content = $('#' + viewId);
        content.html(globalViewСache[viewId]);
        MUi.enableContent(viewId);
    }
    MUi.setView = setView;
    function resetView(viewId) {
        globalViewDataСache[viewId] = undefined;
        globalViewСache[viewId] = undefined;
        MUi.disableContent(viewId);
        var content = $('#' + viewId);
        content.html("");
    }
    MUi.resetView = resetView;
    function appendToView(viewId, resourceId, viewData) {
        var resursResult;
        if (viewData != undefined) {
            globalViewDataСache[viewId] = viewData;
            resursResult = MUi.getResource(resourceId).apply(viewData);
        }
        else {
            resursResult = MUi.getResource(resourceId).resourceString();
        }
        appendResourceToView(viewId, resursResult);
    }
    MUi.appendToView = appendToView;
    function appendResourceToView(viewId, resource) {
        if (globalViewСache[viewId] == undefined) {
            globalViewСache[viewId] = resource;
        }
        else {
            globalViewСache[viewId] = globalViewСache[viewId] + resource;
        }
        var content = $('#' + viewId);
        content.html(globalViewСache[viewId]);
        MUi.enableContent(viewId);
    }
    MUi.appendResourceToView = appendResourceToView;
    function updateView(viewId, resourceId, viewData) {
        var resursResult;
        if (viewData != undefined) {
            if (globalViewDataСache[viewId] == undefined) {
                globalViewDataСache[viewId] = viewData;
            }
            else {
                MTools.merge(globalViewDataСache[viewId], viewData);
            }
            resursResult = MUi.getResource(resourceId).apply(globalViewDataСache[viewId]);
        }
        else {
            resursResult = MUi.getResource(resourceId).resourceString();
        }
        globalViewСache[viewId] = resursResult;
        var content = $('#' + viewId);
        content.html(resursResult);
        MUi.enableContent(viewId);
    }
    MUi.updateView = updateView;
    var EBlockingState;
    (function (EBlockingState) {
        EBlockingState[EBlockingState["Blocked"] = 0] = "Blocked";
        EBlockingState[EBlockingState["Unblocked"] = 1] = "Unblocked";
    })(EBlockingState || (EBlockingState = {}));
    var counter = 0;
    var blockUIDefaultViewId = 'iLockUiDefaultView';
    var blockingState = EBlockingState.Unblocked;
    function setBlockUIDefaultViewId(viewId) {
        blockUIDefaultViewId = viewId;
    }
    MUi.setBlockUIDefaultViewId = setBlockUIDefaultViewId;
    function forceBlockUI(blockUIHandler) {
        if (blockUIHandler === void 0) { blockUIHandler = null; }
        if (blockingState == EBlockingState.Blocked) {
            throw new Error("Error: UI must be unblocked first!");
        }
        blockingState = EBlockingState.Blocked;
        var theViewId;
        if (blockUIHandler != null) {
            theViewId = blockUIHandler.blockUIEventHandler();
        }
        else {
            theViewId = blockUIDefaultViewId;
            $.blockUI({
                message: $('#' + theViewId),
                css: {
                    border: 'none',
                    padding: '15px',
                    'background-color': '#ffffff',
                    backgroundColor: '#ffffff',
                    '-webkit-border-radius': '3px',
                    '-moz-border-radius': '3px',
                    'border-radius': '3px',
                    opacity: .9,
                    color: '#000000'
                }
            });
        }
    }
    MUi.forceBlockUI = forceBlockUI;
    function forceUnblockUI(blockUIHandler) {
        if (blockUIHandler === void 0) { blockUIHandler = null; }
        if (blockingState == EBlockingState.Unblocked) {
            throw new Error("Error: UI must be locked first!");
        }
        blockingState = EBlockingState.Unblocked;
        if (blockUIHandler != null) {
            blockUIHandler.unblockUIEventHandler();
        }
        else {
            $.unblockUI();
        }
    }
    MUi.forceUnblockUI = forceUnblockUI;
})(MUi || (MUi = {}));
var MUiFormats;
(function (MUiFormats) {
    function rub(kop) {
        var r = NaN;
        if (kop != 0) {
            r = kop / 100;
        }
        return r;
    }
    MUiFormats.rub = rub;
    function lit(ml) {
        var l = NaN;
        if (ml != 0) {
            l = ml / 1000;
        }
        return l;
    }
    MUiFormats.lit = lit;
    function kop(rub) {
        return rub * 100;
    }
    MUiFormats.kop = kop;
    function ml(lit) {
        return lit * 1000;
    }
    MUiFormats.ml = ml;
})(MUiFormats || (MUiFormats = {}));
//# sourceMappingURL=BaseUI.js.map