import EoneUtility from '../utility/EoneUtility';

var fs = require('fs');
//configure logger with scriptName
var logger = require('../utility/LogUtilty');
logger.configure('UBEGetXML');

describe('test', function() {
  it('Navigates to JDE ', function () {
    EoneUtility.open('http://denac144.us.oracle.com:25022/jde/E1Menu.maf');
    //logger.info("Hello_ronny1");
    //EoneUtility.open('http://denac138.us.oracle.com:25091/jde/E1Menu.maf?','testName');
    EoneUtility.login('RD9076642','RD90766421','PY920C1','TG2');
    browser.pause(10000);
    //EoneUtility.removeXML('R40G031_QA40G031B');
    });

it.skip('Step 1 : Open Batch Versions) ', function () {

    EoneUtility.fastPath('BV');
    EoneUtility.setHeaderText('C0_11','R40G031');
    EoneUtility.setGridQBEValues('0','Version=QA40G031B');
    EoneUtility.clickToolBarImage('Find');
    EoneUtility.selectDeselectByRowNo('0','0');
        
  });

it.skip('Step 1 : Open Batch Versions) ', function () {

    EoneUtility.fastPath('BV');
    EoneUtility.validateFrame('ABC');
    EoneUtility.setHeaderText('C0_11','ssad');
    browser.debug();
    EoneUtility.isError();
    EoneUtility.getGridRowCount();
    browser.debug();
        
  });
it.skip('Step 3 : Open Batch Versions) ', function () {

    //EoneUtility.UBESubmit('R40G031_QA40G031B');
    var e1Browser = '//iframe[@name="e1menuAppIframe"]';
    var dun = '//div[starts-with(@id,"procIndicator")]';
    //var dun = '//div[starts-with(@id,"procIndicator")]';
    EoneUtility.selectFrame(e1Browser);
    var toot = browser.getAttribute(dun,'display');
    console.log("Here 1"+toot);
    EoneUtility.fastPath('BV');
    //var dun = '//div[starts-with(@id,"procIndicator")]';
    EoneUtility.selectFrame(dun);
    var stat = browser.getAttribute(dun,'display');
    console.log("Here "+stat);
    //EoneUtility.syncFrame();
    browser.debug();
        
  });

it.skip('Step  : XML Test) ', function () {

  //var result = EoneUtility.XML2JSON('test');
  //EoneUtility.nodeValueTest(result,'BatchOutput.Pages.Page.Item[3].$.Value','01/18/19');

  var dir = global.downloadDir;
  var filename = "test";
  /* Open a file for read and write. The second parameter can be r(reading), 
  w(writing), a(appending), r+(w+)(read and write), a+(reading and appending)*/
  console.log("The dir is: "+dir);
  fs.openSync(dir+'/'+filename+'.xml');
  browser.debug();

        
  });

  it('Step  : XML Test ', function () {

  //EoneUtility.fastPath('P07210I');
  //EoneUtility.selectRowMenu('Print;Print All');

  EoneUtility.UBEGetXML('R31802A_QAMFGB01');

  browser.debug();
  });  

});