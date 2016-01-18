/*jslint node: true */
"use strict";

describe("redirect user's view to top of the page", function() {
	it("scrollTop is set to 0", function() {
		document.body.scrollTop = 10;
		document.documentElement.scrollTop = 10;
		gototop();
		expect(document.body.scrollTop).toEqual(0);
		expect(document.documentElement.scrollTop).toEqual(0);
	});
});