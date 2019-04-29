import EoneUtility from '../utility/EoneUtility';

describe('test', function() {
  it('Navigates to JDE ', function () {
    //EoneUtility.open('http://denac144.us.oracle.com:25022/jde/E1Menu.maf');
    EoneUtility.open('http://denac138.us.oracle.com:25091/jde/E1Menu.maf');
    EoneUtility.login('RD9076642','RD9076642','PY920C1','TG1');
    browser.pause(20000);
  });

it('Step 1 : Launch DataBrowser) ', function () {

    EoneUtility.openDataBrowser('F0911');
    //EoneUtility.closeDataBrowsers();
    EoneUtility.setGridQBEValues('0','DocCo=1');
    browser.debug();
    
    
  });

});
