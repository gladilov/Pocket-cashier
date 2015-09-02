function startUnitTests() {
	cResourceStringFormatHtmlTestCase();
	cResourceStringFormatTestCase();
	cResourceStringApplyTestCase();

	observerTestCase0();
	observerTestCase1();

	stateMachineTestCase0();
}

startUnitTests();