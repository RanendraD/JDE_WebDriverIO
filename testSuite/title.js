//var assert = require('assert'); node assertions
// chai assertions centralized in wdio.conf.js in before hook
import assert from 'assert'; 

describe('webdriver.io page', function() {
    it('should have the right title - the fancy generator way', function () {
        browser.url('/');
        var title = browser.getTitle();
        //assert.equal(title, 'WebdriverIO · Next-gen WebDriver test framework for Node.js');
        expect(title).to.equal('WebdriverIO · Next-gen WebDriver test framework for Node.js');
        browser.pause(3000);
    });

    it.only('should have the right API link', function () {
        browser.url('/');
        var hasApiLink = browser.isExisting('=API'); 
        //browser.isExisting('a[href="/api.html"]')
        assert(hasApiLink);
    });

    it('should navigate to API page', function () {
        browser.url('/');
        browser.debug();
        browser.click('=API');
        var title = browser.getTitle();
        //assert.equal(title, 'API Docs · WebdriverIO');
        title.should.equal('API Docs · WebdriverIO');
        browser.pause(3000);	
        //browser.pause(2000);
        //browser.debug();
    });

    it('should filter API results', function () {
        browser.url('/docs/api.html');
        
        browser.setValue('input[id="search_input_react"]','debug');
        browser.saveScreenshot('api-with-result.png');
    });
});