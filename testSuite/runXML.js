var EoneUtility = require('../utility/EoneUtility');


var logger = require('../utility/LogUtilty');
logger.configure('XML');

var result = EoneUtility.XML2JSON('test');

//result = result.BatchOutput.Pages;
//console.log("Final:"+result.BatchOutput.Pages.Page[1].Item[6].$.Value);

//.Page[3].Item[3].$.Value
//var r1 = result.BatchOutput.Pages.Page.Item[3];

EoneUtility.nodeValueTest(result,'BatchOutput.Pages.Page.Item[3].$.Value','01/18/19');
