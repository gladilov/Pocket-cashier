//Case 0
function cResourceStringFormatHtmlTestCase() {
    var str = "TestCase0: <!-- {0} -->, TestCase1: <!-- {1} -->, TestCase2: <!-- {2} -->, TestCase1: <!-- {1} -->";
    var reference = "TestCase0: Passed0, TestCase1: Passed1, TestCase2: Passed2, TestCase1: Passed1";
    var result = MUi.newResource(str).formatHtml("Passed0", "Passed1", "Passed2");
    if (reference != result) {
        alert('CResourceStringFormatHtmlTestCase - faled:\nreference:\t' + reference + '\nresult:\t' + result);
    }
}
//Case 1
function cResourceStringFormatTestCase() {
    var str = "TestCase0: {0}, TestCase1: {1}, TestCase2: {2}, TestCase1: {1}";
    var reference = "TestCase0: Passed0, TestCase1: Passed1, TestCase2: Passed2, TestCase1: Passed1";
    var result = MUi.newResource(str).format("Passed0", "Passed1", "Passed2");
    if (reference != result) {
        alert('CResourceStringFormatTestCase - faled:\nreference:\t' + reference + '\nresult:\t' + result);
    }
}
;
var CListTest = (function () {
    function CListTest(testCase0, testCase1, testCase2, testCase3) {
        this.testCase0 = testCase0;
        this.testCase1 = testCase1;
        this.testCase2 = testCase2;
        this.testCase3 = testCase3;
        this.testCase0 = testCase0;
        this.testCase1 = testCase1;
        this.testCase2 = testCase2;
        this.testCase3 = testCase3;
    }
    return CListTest;
})();
function cResourceStringApplyTestCase() {
    var list = {
        testCase0: "TestCase0 - Passed",
        testCase1: "Case 1 - Passed",
        testCase2: "Case 2 - Passed",
        testCase3: "Case 3 - Passed"
    };
    var cList = list;
    var iList = cList;
    var resStr = "_testCase0_, _testCase1_, _testCase0_, _testCase2_, __testCase3__, _testCase1_";
    var reference = "TestCase0 - Passed, Case 1 - Passed, TestCase0 - Passed, Case 2 - Passed, _Case 3 - Passed_, Case 1 - Passed";
    var result0 = MUi.newResource(resStr).apply(iList);
    var result1 = MUi.newResource(resStr).apply(cList);
    var result2 = MUi.newResource(resStr).apply(list);
    var result3 = MUi.newResource(resStr).apply({
        testCase0: "TestCase0 - Passed",
        testCase1: "Case 1 - Passed",
        testCase2: "Case 2 - Passed",
        testCase3: "Case 3 - Passed"
    });
    if (reference != result0) {
        alert('CResourceStringApplyTestCase 0 - faled:\nreference:\t' + reference + '\nresult:\t' + result0);
    }
    if (reference != result1) {
        alert('CResourceStringApplyTestCase 1 - faled:\nreference:\t' + reference + '\nresult:\t' + result1);
    }
    if (reference != result1) {
        alert('CResourceStringApplyTestCase 2 - faled:\nreference:\t' + reference + '\nresult:\t' + result2);
    }
    if (reference != result1) {
        alert('CResourceStringApplyTestCase 3 - faled:\nreference:\t' + reference + '\nresult:\t' + result3);
    }
}
//# sourceMappingURL=ResourceStringTests.js.map