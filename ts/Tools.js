var MTools;
(function (MTools) {
    function merge(hashDestination, hashSource) {
        for (var key in hashSource) {
            hashDestination[key] = hashSource[key];
        }
    }
    MTools.merge = merge;
    var CHash = (function () {
        function CHash() {
        }
        return CHash;
    })();
    function mergeTo(hashA, hashB) {
        var resultHash = new CHash;
        for (var key in hashA) {
            resultHash[key] = hashA[key];
        }
        for (var key in hashB) {
            resultHash[key] = hashB[key];
        }
        return resultHash;
    }
    MTools.mergeTo = mergeTo;
})(MTools || (MTools = {}));
//# sourceMappingURL=Tools.js.map