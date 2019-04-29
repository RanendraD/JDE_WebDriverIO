import EoneUtility from '../utility/EoneUtility';
import { basename } from 'path';
var scriptName = basename(__filename).replace(".js","");
	
import { configure } from '../utility/LogUtilty';
var startFlag;
configure(scriptName);

describe('FT_FMS_3_P09626_Add_Auto_Reconcilation_Rule', function() {
      
    it('Step 1 : Launch P09626 in Fastpath (there are no processing options associated with this application so no versions exist) ', function () {
      startFlag = EoneUtility.startFlag();
      EoneUtility.startE1();
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
      EoneUtility.setHeaderText('C0_90','Automation ADD test');
      EoneUtility.setHeaderText('C0_143','M');
      EoneUtility.clickHyperLink('Receipt Clear');
      EoneUtility.syncFrame();
      EoneUtility.setHeaderText('C0_32','1');
      EoneUtility.clickToolBarImage('OK');
      EoneUtility.syncFrame();
   });
    it('Step 4 : In the QBE line, enter Reconciliation Rule = TEST Click <FIND>', function () {
    
      EoneUtility.setGridQBEValues('0','Reconciliation Rule=TEST');
      EoneUtility.clickToolBarImage('Find');
      EoneUtility.validateGridRowCount('0','1');
      EoneUtility.validateGridRowData('0','0','Reconciliation Rule=TEST');
   });
    it('Step 5 : <CLOSE>', function () {
      EoneUtility.clickToolBarImage('Close');
      EoneUtility.syncFrame();
            
   });
    it('Step 6 : open DATABROWSER Table = F09626 Where Reconciliation Rule = TEST TR CD = CR', function () {
      EoneUtility.openDataBrowser('F09626');
      EoneUtility.setGridQBEValues('0','Reconciliation Rule=TEST;TR CD = CR');
      EoneUtility.clickToolBarImage('Find');
      EoneUtility.validateGridRowCount('0','1');
      EoneUtility.validateGridRowData('0','0','Reconciliation Code=M;Value Date GL Date Flag=0;Variance Flag=0');
   });
    it('Step 6 : open DATABROWSER Table = F09626 Where Reconciliation Rule = TEST TR CD = CK', function () {
    
      EoneUtility.setGridQBEValues('0','Reconciliation Rule=TEST;TR CD = CK');
      EoneUtility.clickToolBarImage('Find');
      EoneUtility.validateGridRowCount('0','1');
      EoneUtility.validateGridRowData('0','0','Reconciliation Code=M;Value Date GL Date Flag=0;Variance Flag=0');
      EoneUtility.closeDataBrowsers();
      EoneUtility.evaluateTime(startFlag);
   });
      
});

  