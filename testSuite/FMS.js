import EoneUtility from '../utility/EoneUtility';

var logger = require('../utility/LogUtilty');
logger.configure('IniTest');

//var path = require('path');
//var scriptName = path.basename(__filename);

describe('FT_FMS_3 P09626 Add Auto Reconcilation Rule', function() {

  it.only('Navigates to JDE ', function () {
    //EoneUtility.open('http://denac144.us.oracle.com:25022/jde/E1Menu.maf');
    EoneUtility.open('http://denac138.us.oracle.com:25091/jde/E1Menu.maf');
    EoneUtility.startE1();
    //EoneUtility.login('RD9076642','RD90766421','PY920C1','TG1');
    //browser.pause(20000);
  });

  it('Step 1 : Launch P09626 in Fastpath (there are no processing options associated with this application so no versions exist) ', function () {

    EoneUtility.fastPath('P09626');
    EoneUtility.syncFrame();
    EoneUtility.validateFrame('Work With Auto Reconciliation Rules');
    
  });

   it('Step 2 : Click <Add>', function () {
    
    EoneUtility.clickToolBarImage('Add');
    EoneUtility.syncFrame();
    EoneUtility.validateFrame('Revise Auto Reconciliation Rules');
  });

   it('Step 3 : in header- Reconciliation Rule = TEST  description = Automation ADD test  Payment Clear tab: Reconciliation Code = M Receipt Clear tab: Reconciliation Code = 1 select <OK>', function () {

   	EoneUtility.setHeaderText('C0_13','TEST');
    EoneUtility.syncFrame();
    EoneUtility.setHeaderText('C0_90','Automation ADD test');
    EoneUtility.syncFrame();
    EoneUtility.setHeaderText('C0_143','M');
    EoneUtility.syncFrame();
    browser.debug();
    EoneUtility.clickHyperLink('Receipt Clear');
    EoneUtility.syncFrame();
    EoneUtility.setHeaderText('C0_32','1');
    EoneUtility.clickToolBarImage('OK');
  });


   it.skip('Step 4 : In the QBE line, enter Reconciliation Rule = TEST Click <FIND>', function () {
    
    EoneUtility.setGridQBEValues('0','Reconciliation Rule=TEST');
    EoneUtility.clickToolBarImage('Find');
    browser.pause(7000);
    EoneUtility.validateGridRowCount('0','1');
    EoneUtility.validateGridRowData('0','0','Reconciliation Rule=TEST');
       
  });


   it.skip('Step 4 : In the QBE line, enter Reconciliation Rule = TEST Click <FIND>', function () {
    
    EoneUtility.setGridQBEValues('0','Reconciliation Rule=TEST');
    EoneUtility.clickToolBarImage('Find');
    browser.pause(7000);
    EoneUtility.validateGridRowCount('0','1');
    EoneUtility.validateGridRowData('0','0','Reconciliation Rule=TEST');
       
  });

   it.skip('Step 5 : <CLOSE>', function () {
    
    EoneUtility.clickToolBarImage('Close');
    browser.pause(7000);       
  });

   it.skip('Step 6 : open DATABROWSER Table = F09626 Where Reconciliation Rule = TEST TR CD = CR', function () {
    
    //EoneUtility.openDataBrowser('F09626');
    EoneUtility.openDataBrowser('F96511');
    //EoneUtility.setGridQBEValues('0','Reconciliation Rule=TEST;TR CD = CR');
    EoneUtility.setGridQBEValues('0','Path Code=PY920');
    EoneUtility.clickToolBarImage('Find');
    browser.pause(5000);
    EoneUtility.validateGridRowCount('0','10');
    browser.debug();
    //EoneUtility.validateGridRowData('0','0','Reconciliation Code=1;Value Date GL Date Flag=0;Create Auto Batch Receipt=0;Variance Flag=0');       
    EoneUtility.validateGridRowData('0','0','Machine Key=DENDCAS2;Port Number=6211');
  });


   it.skip('Step 7 : open DATABROWSER Table = F09626 Where Reconciliation Rule = TEST TR CD = CK', function () {
    
    EoneUtility.openDataBrowser('F09626');
    EoneUtility.setGridQBEValues('0','Reconciliation Rule=TEST;TR CD = CK');
    EoneUtility.clickToolBarImage('Find');
    EoneUtility.validateGridRowCount('0','1');
    EoneUtility.validateGridRowData('0','0','Reconciliation Code=M;Value Date GL Date Flag=0;Variance Flag=0'); 
    EoneUtility.closeDataBrowsers();      
  });





});
