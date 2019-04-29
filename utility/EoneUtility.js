/***************************************************************************************/
/**
					place holder for framework reusable library
 **/
/****************************************************************************************/


var assert = require('assert');
//var chai = require('chai').use(require('chai-as-promised'));
//var expect = require('chai').expect;
//var should = require('chai').should();

//A dynamic array at global scope to host the grid Id's
//let gridIds = new Array();
var path = require('path');


//imports for xml test
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray : false});

//imports performance evaluator
const { performance } = require('perf_hooks');

var XLSX = require('xlsx');
//{explicitArray : false}
//to get data from json array
var _ = require('lodash');

var gridUtility = require('./Grid');

var ini = require('ini');

//var log4js = require('log4js');

var logger = require('./LogUtilty');

global.gridIds = [];


module.exports = {


startE1 : function()
{	
	logger.info("Starting function E1");

	var login = ini.parse(fs.readFileSync('./Login.ini', 'utf-8'));
	var User,Password,Role,Env,url;

	User = login.ENVIRONMENT.User;
	Password = login.ENVIRONMENT.Password;
	Role = login.ENVIRONMENT.Role;
	Env = login.ENVIRONMENT.Environment;
	url =login.ENVIRONMENT.LoginURL;

	browser.url(url);

	logger.info("User is :"+User);
	logger.info("Password is :"+Password);
	logger.info("Environment is :"+Env);
	logger.info("Role is: "+Role);
	logger.info("URL is : "+url);
	
	browser.setValue('input[id="User"]',User);
	browser.setValue('input[id="Password"]',Password);
	browser.click('img[id="ADVANCED_IMG"]');
	browser.setValue('input[id="Environment"]',Env);
	browser.setValue('input[id="Role"]', Role);
	browser.click('input[value="Sign In"]');	

	logger.info("User clicked Sign In");
	logger.info("Ending function E1");

	//wait for exist

	
},

open : function(path,scriptName){

	browser.url(path);

	/*//configuration for LOG File
	log4js.configure({
	  appenders: { 'file': { type: 'file', filename: './logs/'+scriptName+'.log' } },
	  categories: { default: { appenders: ['file'], level: 'trace' } }
});

	logger = log4js.getLogger();
	


*/

	logger.info('Ronny is Comté1.');
},

/***************************************************************************************/
  /*
   * method login (userName,passWord,Environment,Role)
   * function to log into the JDE application
   * @param {userName}    - The username of the user
   * @param {passWord}    - The password of the corresponding user
   * @param {Environment} - The Environment in which the user has to login
   * @param {Role}		  - The Role in which the user has to login			
   **/
  /****************************************************************************************/

login : function(userName,passWord,Environment,Role)
{
	browser.setValue('input[id="User"]',userName);
	browser.setValue('input[id="Password"]',passWord);
	browser.click('img[id="ADVANCED_IMG"]');
	browser.setValue('input[id="Environment"]',Environment);
	browser.setValue('input[id="Role"]', Role);
	browser.click('input[value="Sign In"]');	

},	


fastPath : function(module)
{
	//focus on the top frame before
	//module.exports.selectFrame('div[id="drop_mainmenu"]');
	logger.info("Clicking on fastPath");

	browser.click('div[id="drop_mainmenu"]');
	browser.setValue('input[id="TE_FAST_PATH_BOX"]',module);
	browser.click('a[id="fastPathButton"]');

	logger.info("fastPath clicked");
},


/*validateFrame : function(frameName)
{
	var count = browser.elements('iframe').value.length;
	var bool;
	for(var i=0; i<count; i++)
  {
	browser.frame(i);
	bool = browser.isExisting("//span[@id='jdeFormTitle0']");

	if(bool)
	{	
	var title = browser.getText("//span[@id='jdeFormTitle0']").trim();
	expect(title).to.equal(frameName);
	break;
	}
	else
	{
	browser.frameParent();	
	}
	
  }
},
*/


validateFrame : function(frameName)
{

	var selector = '//span[@id="jdeFormTitle0"]';
	module.exports.selectFrame(selector);
	var title = browser.getText(selector).trim();

	if(title == frameName)
	{
		logger.info("The expected frameName "+frameName+" and actual frameName "+title+" is equal");
	}
	else
	{
		logger.error("The expected frameName "+frameName+" and actual frameName "+title+" is not equal equal");
	}

	//assert.equal(title,frameName,"The expected frameName and actual frameName is not equal");
	//assert(title,frameName,"The expected frameName and actual frameName is not equal");

},


/*
clickToolBarImage : function(action)
{
	browser.frameParent();

	var count = browser.elements('iframe').value.length;
	var bool;
	var imageId="#hc_"+action;

	for(var i=0; i<count; i++)
    {
	browser.frame(i);
	//"img[id='hc_Add']"
	bool = browser.isExisting(imageId);

	if(bool)
	{
	browser.click(imageId);	
	break;
	}
	else
	{
	browser.frameParent();
	}	
    }
},
*/

clickToolBarImage : function(action)
{	
	logger.info("Starting function clickToolBarImage on "+action);
	var imageId="#hc_"+action;
	module.exports.selectFrame(imageId);
	browser.click(imageId);	
	logger.info(action+" clicked!");
	logger.info("Starting function clickToolBarImage on "+action);
},



syncFrame : function()
{
	//write the correct logic later
	browser.pause(10000);
},

/*
setHeaderText : function(inputId,inputValue)
{
	browser.frameParent();

	var count = browser.elements('iframe').value.length;
	var bool;
	var selectorId="//input[@id='"+inputId+"']";
	var selectorVal = inputValue.trim();

	for(var i=0; i<count; i++)
    {
	browser.frame(i);

	bool = browser.isExisting(selectorId);

	if (bool) 
	{
	console.log("start here");	
	browser.click(selectorId);	
	browser.setValue(selectorId,selectorVal);
	browser.click(selectorId);
	browser.keys("Tab");
	console.log("finish here");
	browser.pause(2000);
	//browser.keys("Tab");
	browser.pause(1000);
	break;
	}
	else
	{
	browser.frameParent();	
	}
    }

},
*/

/*setHeaderText : function(inputId,inputValue)
{	
	var BACKSPACE_UNICODE = "\uE003";
	var selectorId='//input[@id="'+inputId+'"]';

	inputValue = inputValue.trim();
	
	module.exports.selectFrame(selectorId);

	browser.click(selectorId);	
	//browser.setValue(selectorId, [inputValue,' ',BACKSPACE_UNICODE]);
	browser.setValue(selectorId,inputValue);
	browser.click(selectorId);
	browser.keys("Tab");
	
},*/


setHeaderText : function(inputId,inputValue)

{
	//logger.info("Starting SetHeaderText for id "+inputId+" and value "+inputValue);
	var selectorId = '//input[@id="'+inputId+'"]';

	inputValue=inputValue.trim();

	module.exports.selectFrame(selectorId);

	var getValue;

	browser.execute(gridUtility.setHeaderText,inputId,inputValue);
	getValue = browser.getValue(selectorId);
	
	browser.pause(1000);
	//logger.info("Value set at "+id+" is: "+getValue);
	//logger.info("Ending function SetHeaderText");
	
	//browser.debug();
},


/*clickHyperLink : function(linkTest)
{
	browser.frameParent();

	var count = browser.elements('iframe').value.length;
	var bool;

	var selector = '='+linkTest;
	var selectorFinal = selector.trim();

	for(var i=0; i<count; i++)
    {
	browser.frame(i);

	bool = browser.isExisting(selectorFinal);

	if(bool)
	{
	browser.click(selectorFinal);
	console.log('clicked');	
	browser.pause(5000);
	break;
	}
	else
	{
	browser.frameParent();
	}	
    }
},*/

clickHyperLink : function(linkTest)
{
	logger.info("Starting function clickHyperLink for "+linkTest);
	var selector = '='+linkTest;
	var selectorFinal = selector.trim();

	module.exports.selectFrame(selectorFinal);
	browser.click(selectorFinal);
	logger.info(linkTest+" clicked.");	
	logger.info("Ending function clickHyperLink.")	
},



info : function(text)
{
	console.log(text);
},



selectFrame : function(selector)
{
	browser.frameParent();

	var count = browser.elements('iframe').value.length;
	var bool;
	var selectorId = selector;

	for(var i=0; i<count; i++)
    {
	  browser.frame(i);
	
	  bool = browser.isExisting(selectorId);

	if(bool)
	{
	  break;
	}
	else
	{
	  browser.frameParent();
	}	
    }

},

/*gridFieldCount : function()
{
 
 
	browser.frameParent();

	var count = browser.elements('iframe').value.length;
	var bool;
	//the Xpath returns multiple grid fields, traverse through indices
	//var qbeTitleName ="//input[starts-with(@name,'qbe')]";
	// same as name query selector'[name^="qbe"]'

	for(var i=0; i<count; i++)
    {
	browser.frame(i);

	bool = browser.isExisting('//input[starts-with(@name,"qbe")]');
	console.log("Found @ "+i+bool);

	if(bool)
	{
		var count = browser.elements('//input[starts-with(@name,"qbe")]').value.length;
        console.log("Grid Count is"+count);
        return count;
        break;
	}
	else
	{
		browser.frameParent();
	}
	}		

},*/


gridFieldCount : function()
{
 	var gridNameId = '//input[starts-with(@name,"qbe")]';

 	module.exports.selectFrame(gridNameId);

 	var count = browser.elements(gridNameId).value.length;

 	return count;
 	//console.log("The grid count is:"+count);
	
},


/*setGridQBEValues : function(value)
{	
	//global replacement use /g
	console.log("Value"+value);
	var valString = value.replace ( /=/g , ';');
	console.log("valString"+valString);
	var arrayVal = valString.split(';');
	console.log("arrayVal"+arrayVal);
	var arrayLen = arrayVal.length;
	console.log("arrayLen"+arrayLen);

	var myMap = new Map();

	for(var start=0; start<arrayLen; start=start+2)
	{
		//console.log("In here top "+arrayVal[start]);
		myMap.set(arrayVal[start].trim(), arrayVal[start+1].trim());
		//console.log("Out here bottom "+arrayVal[start]);	
	}
	console.log("Total number of query elements is"+myMap.size);

	var count = module.exports.gridFieldCount();
	console.log("The Grid count is "+count);

	//so the focus now will be on grid bearing frame only

	while(count>0)
	{
		var selector = '(//input[starts-with(@name,"qbe")])['+ count +']';
		//var selector = '(//input[starts-with(@name,"qbe")])[2]';
		var title = browser.getAttribute(selector,"title");
		console.log("Title is: "+title);
		var bool = myMap.has(title);
		console.log("Is title in Map? :"+bool);
		if (bool)
		{
			var setValue = myMap.get(title.trim());
			browser.setValue(selector,setValue);
			
		}
		count--;
	}
},*/
//sets grid Ids in an array
setGridIds : function()
{	
	//Empty the gridIDs array first
	gridIds = [];

	var gridSelector = '//table[@class="JSGridQTPClass"]';

	module.exports.selectFrame(gridSelector);

	console.log("Frame selected");

	var count = browser.elements(gridSelector).value.length;
	
	var index = 1;

	while(index <= count)
	{
		var finalGridSelector = '//table[@class="JSGridQTPClass"]['+ index +']';
		var id = browser.getAttribute(finalGridSelector,"id");
		console.log("ID of grid in index position"+index+" is: "+id);
		var numericID = id.replace('jdeGrid','');
		//gridIds.push(numericID); add items to last
		gridIds.unshift(numericID);
		console.log("Grid id is" + gridIds[index-1]);
		index++;
	}
	//return gridIds;
},

//get grid Ids from that array
getGridIds : function(index)
{	
	var copyOfGridIds = Array.from(gridIds);
	var gridIndex = index;
	var gridIdsLen = gridIds.length;
	var gridIdVal;

	if(gridIndex > gridIdsLen)
	{
		return null;
	}
	
	while(gridIndex >= 0)
	{	
	if(gridIndex<gridIdsLen)
	{
	    gridIdVal = copyOfGridIds.shift();

	}
	else
	{
		console.log("Grid index not present in the frame");
	}
	gridIndex--;
	}
	return gridIdVal;	
},

/*gridColumnCount : function(gridID)
{
	var gridSelector = '(//input[starts-with(@name,"qbe"'+'gridID'+')])';

	selectFrame(gridSelector);

	var count = browser.elements(gridSelector).value.length;

	return count;
},*/

/*
setGridQBEValues : function(value)
{
	//global replacement use /g
	var valString = value.replace ( /=/g , ';');
	var arrayVal = valString.split(';');
	//pop the first element of the array
	var gridIndex = arrayVal.shift();
	var arrayLen = arrayVal.length;

	var myMap = new Map();

	module.exports.setGridIds();

	var gridId = module.exports.getGridIds(gridIndex);

	console.log("Inside setGridQBEValues grid ID"+gridId);

	
	for(var start=0; start<arrayLen; start=start+2)
	{
		//console.log("In here top "+arrayVal[start]);
		myMap.set(arrayVal[start].trim(), arrayVal[start+1].trim());
		//console.log("Out here bottom "+arrayVal[start]);	
	}

	var mapSize = myMap.size;

	var iterator = myMap.keys();

	while(mapSize>0)
	{
		var set_key = iterator.next().value ;
		var set_val = myMap.get(set_key);
		var selector = '[title="'+ set_key +'"][name*="qbe'+gridId+'"]';
		browser.setValue(selector,set_val);
		console.log("Set title is:"+set_key+" and val is:"+set_val);
		mapSize--;
	}

	//myMap.forEach(module.exports.setValueForQBE);

},*/

setGridQBEValues : function(iIndex,sParams)
{	
	logger.info("Starting function setGridQBEValues");
	var tempFld,tempVal,qbeId;
	var param = sParams.split(";");
	var gridId,colIndex;

	module.exports.setGridIds();

	gridId = module.exports.getGridIds(iIndex);
	logger.info("Grid Id of the grid is : "+gridId);

	if(gridId != null)
	{
		for (var i=0; i<param.length ; i++)
		{
			var fieldVal = param[i].split("=");

			    if (fieldVal.length==2){
					tempFld=fieldVal[0];
					tempVal=fieldVal[1];
					tempVal=tempVal.replace(/~/g, "=");
				}else{
					tempFld=fieldVal[0];
					tempVal=null;
				}
			
			colIndex=module.exports.getColIndexForColName(gridId,tempFld);
			
			if(colIndex != null)
			{
				var qbeId = browser.execute(gridUtility.setQBECellElemForColumn,gridId,colIndex,tempVal);
				qbeId = qbeId.value; 	
				if(qbeId != null)
				{
				var selector = '//input[@id="'+qbeId+'"]';
				browser.setValue(selector,tempVal);
				logger.info("Identified " +tempFld+" field and Entered " + tempVal);	
				logger.info("Ending function SetGridQBEValues");
				}
			}	

		}
	}
	else
	{
		logger.error("[SetGridQBEValues] SetQBE Failed: QBE field for column "+tempFld+" not exist");
	}

},

validateGridRowCount : function(gridIndex,rowCount)
{	
	logger.info("Starting function validateGridRowCount");	
	var rowC = rowCount;
	module.exports.setGridIds();
	var	gridIdIndex = module.exports.getGridIds(gridIndex);

	logger.info("Grid Id is:"+gridIdIndex);

	var output = browser.execute(gridUtility.getvisibleRowCount,gridIdIndex);	

	output=output.value;

	var input = output;	
	logger.info("Grid row count is:"+output);

	browser.pause(1000);
	if (rowCount == input)
	{
		logger.info("The expected grid Row Count is "+rowCount+" and the actual is "+input);
	} 
	else
	{
		logger.error("The expected grid Row Count is "+rowCount+" and the actual is "+input);
	}
	logger.info("Ending function validateGridRowCount");

	// //browser.debug();
	// //work on this .....	
	// //expect(rowC).to.equal(input);
	// assert.equal(rowC,input,"The Grid row count assertion failed");

},



getRowIndexForVisibleRow : function(gridId,ivisibleRow)
{
	var iRowIndex =-1;

	if(gridId != null)
	{
		iRowIndex = browser.execute(gridUtility.getRowIndex,gridId,ivisibleRow);
		iRowIndex = iRowIndex.value;
		console.log("Row Index from getRowIndexForVisibleRow is: "+iRowIndex);
	}

	return iRowIndex;
},


getColIndexForColName : function(gridId,colName)
{
	var colIndex = null;
	var colFlag = false;
	var index = null;

	// global replacement operator, acts as replaceAll in Java
	colName = colName.replace ( /~/g , "=");
	colName = colName.replace ( / /g , "");
	colName = colName.replace ( /&#37;/g , "%");
	colName = colName.replace ( /&#39;/g , "'");
	colName = colName.replace ( /&#45;/g , "-");
	colName = colName.replace ( /&#40;/g , "(");
	colName = colName.replace ( /&#41;/g , ")");
	colName = colName.replace ( /&#42;/g , "*");
	colName = colName.replace ( /&#43;/g , "+");
	colName = colName.replace ( /&#38;/g , "&");

	if(gridId != null)
	{	
		var colCount = browser.execute(gridUtility.getColLen,gridId);
		// returns Json object, pick up val from it 
		
		colCount=colCount.value;

		var ivx;
		var fieldName = null;
		var c2=colName.trim();

		console.log("ColName: "+c2);

		for(ivx=-2;ivx<colCount;ivx++)
		{
			fieldName = browser.execute(gridUtility.getColLabel,gridId,ivx);

			fieldName = fieldName.value;	
			
				if(fieldName != null){
				var fldName = fieldName;
				//.replace( /~/g , "=");
				fldName = fldName.replace ( / /g , "");
				fldName = fldName.replace ( /&#37;/g , "%");
				fldName = fldName.replace ( /&#39;/g , "'");
				fldName = fldName.replace ( /&#45;/g , "-");
				fldName = fldName.replace ( /&#40;/g , "(");
				fldName = fldName.replace ( /&#41;/g , ")");
				fldName = fldName.replace ( /&#42;/g , "*");
				fldName = fldName.replace ( /&#43;/g , "+");
				fldName = fldName.replace ( /&#38;/g , "&");

				var c1 = fldName.trim();

				console.log("FieldName: "+c1);

				if(c1 == c2)
				{
					var colIsHidden = browser.execute(gridUtility.gridCellIsHidden,gridId,ivx);
					colIsHidden =colIsHidden.value;
					console.log("From get Col Index Hidden: "+colIsHidden);

					if (colIsHidden == false)
					{
						colIndex = ivx;
						console.log(c1+" has column no "+colIndex);
						return colIndex;
						/*console.log(c1+"has colomn no"+colIndex)
						break;*/
						
					}
					console.log(fieldName +" hidden = "+colIsHidden);
				}

			}
		}


	}
	
},

validateGridRowData: function(index,iRow,value)
{	
	logger.info("Starting Function validateGridRowData");
	var gridId, tempFld, tempVal, colIndex, sCellData = null;
	var param = value.split(";");
	var paramLen = param.length;
	var idx;

	module.exports.setGridIds();
	gridId = module.exports.getGridIds(index);

	if(gridId != null)
	{
		var rowCount = browser.execute(gridUtility.getvisibleRowCount,gridId);
		rowCount = rowCount.value;

		//if no rows are there
		if(iRow >= rowCount)
		{
			logger.error("Report Failure, no rows in grid index "+index);
			//console.log("Report Failure");
			return;
		}

		var rowIndex = module.exports.getRowIndexForVisibleRow(gridId,iRow);
		
		logger.info("Row Index at grid id "+gridId+"is "+rowIndex);

		for(idx=0 ; idx<paramLen; idx++)
		{
			var fieldVal = param[idx].split("=");

			if(fieldVal.length == 2){
				tempFld=fieldVal[0];
				tempVal=fieldVal[1];
				tempVal=tempVal.replace(/~/g , "=");
			}else if(fieldVal.length == 3)
			{
				tempFld=fieldVal[0];
				tempVal=fieldVal[1]+"="+fieldVal[2];
			}else
			{
				tempFld=fieldVal[0];
				tempVal="";
			}

			colIndex = module.exports.getColIndexForColName(gridId,tempFld);

			if(colIndex != null)
			{
				sCellData = browser.execute(gridUtility.getGridRowCellValue,gridId,rowIndex,colIndex);
				sCellData = sCellData.value;
				var  tempVal1 = tempVal.trim();

				if((sCellData.startsWith("-")) || (sCellData.endsWith("-"))){
					if((tempVal1.startsWith("-"))||(tempVal1.endsWith("-"))){
							tempVal1=tempVal1.replace("-", "");
							sCellData=sCellData.replace("-", "");
					}
				}

				// expect --> expect(sCellData).to.equal(tempVal1);
				if (tempVal1.trim() == sCellData.trim())
				{	
					logger.info("The expected value is "+tempVal1+"and actual value is"+sCellData);
					browser.pause(1000);
				}
				else
				{
					logger.error("Test Failed: expected val is "+tempVal1+"and actual value is "+sCellData);
					browser.pause(1000);
				}
			}
		}
    }
		logger.info("Starting Function validateGridRowData");

},



/*
openDataBrowser : function(sTable)
{
	sTable=sTable.toUpperCase();

	//later implement close databrowser

	if((sTable == null) || (sTable.length() == 0))
	{
		console.log("Failure: Invalid Table Name or No Tables passed in OpenDataBrowser, Exiting Function");
	}

	var qSelector = '//span[starts-with(@title,"Query")]';

	module.exports.fastPath("databrowser");
	browser.pause(5000);

	var tabs = browser.getTabIds();

	var count = tabs.length;

	console.log("The window tabs are: "+tabs);
	console.log("The window count is: "+count);

	while (count > 0)
	{
		var win = tabs[count-1];//returns a handle
		console.log("At"+count+"handle is"+win);
		browser.switchTab(win);
		var title = browser.getTitle();
		console.log("The title is: "+title);
		count--;
	}
},
*/

openDataBrowser : function(sTable)
{
	logger.info("Starting Function openDataBrowser");
	sTable=sTable.toUpperCase();

	module.exports.closeDataBrowsers();

	var parentTab = browser.getCurrentTabId();
	
	var tabs, title;

	title = browser.getTitle();
	console.log("The parent Tab title is: "+title);
	//implement close all tabs except parentTab

	module.exports.fastPath("databrowser");
	browser.pause(5000);

	tabs = browser.getTabIds();
	// an array is returned with parent as index 0

	console.log("The window tabs are: "+tabs);
	console.log("The window count is: "+tabs.length);

	browser.switchTab(tabs[1]);

	title = browser.getTitle();
	console.log("The title is: "+title);
	if (title == "Query Selector")
	{	
		var qSelector_Radio = '//input[@id="table"]';
		var qSelector_Table = '//input[@id="tableName"]';
		var qSelector_Button = '//input[@value="OK"]';

		module.exports.selectFrame(qSelector_Radio);

		browser.click(qSelector_Radio);
		browser.setValue(qSelector_Table,sTable);
		browser.keys("Tab");
		browser.pause(2000);
		browser.click(qSelector_Button);
	}
	else
	{
		console.log("Test Failure");
	}

	// in the data browser

	tabs = browser.getTabIds();
	// an array is returned with parent as index 0

	console.log("The window tabs are: "+tabs);
	console.log("The window count is: "+tabs.length);

	browser.switchTab(tabs[2]);
	browser.pause(10000);

	title = browser.getTitle();
	console.log("The title is: "+title);

	var bool1 = title.startsWith("Data");
	var bool2 = title.startsWith("Browser",5);

	//var bool = title.includes("Data Browser");

	if (bool1 && bool2)
	{
		logger.info("Data Browser for table "+sTable+" opened");
	}
	else
	{
		logger.error("Failure: Data Browser for table "+sTable+" did not open.");	
	}

	logger.info("Ending Function openDataBrowser");
},

closeDataBrowsers : function()
{
	logger.info("Starting function closeDataBrowsers");
	var tabs = browser.getTabIds();

	var tabSize = tabs.length;

	var currentTab = browser.getCurrentTabId();
	browser.switchTab(currentTab);

	var  title = browser.getTitle();

	if(tabSize == 1 && title == "JD Edwards")
	{
		logger.info("No extra data browsers  and the title of frame is "+title);
		return;
	}

	while(tabSize > 1)
	{
		browser.switchTab(tabs[tabSize-1]);
		browser.close(tabs[tabSize-2]);
		tabSize--;
	}
	logger.info("All databrowsers are closed");

},


selectDeselectByRowNo : function(gridIndex,iRow)
{
	module.exports.setGridIds();
	var selColIndex, selectColIndex, colIndex;
	var gridId = module.exports.getGridIds(gridIndex);
	var rowCount = browser.execute(gridUtility.getvisibleRowCount,gridId);
	rowCount = rowCount.value;

	var rowIndex = module.exports.getRowIndexForVisibleRow(gridId,iRow);

	if((iRow>=0) && (iRow<rowCount))
	{
		for(var x=0; x<100 ;x++)
		{
			var checkBoxView = browser.execute(gridUtility.scrollCheckBoxIntoView,gridId,rowIndex,x);
			checkBoxView = checkBoxView.value;

			if(checkBoxView == "true")
				break;
			else if(checkBoxView == "false")
			{
				browser.pause(1000);
				continue;
			}
			else
				break;
		}

		selColIndex = module.exports.getColIndexForColName(gridId, "Sel");
		selectColIndex = module.exports.getColIndexForColName(gridId, "Select");

		console.log("Inside selectDeselectByRowNo, coln indexes are: "+selColIndex+" , "+selectColIndex);

		if(selectColIndex != null || selColIndex != null)
		{
			if(selectColIndex != null)
			{
				colIndex = selectColIndex;

				if((iRow>=0) && (iRow<rowCount))
				{
					var cellValue = browser.execute(gridUtility.getGridCheckboxId, gridId, rowIndex, colIndex);
					console.log("Inside selectDeselectByRowNo cellValue is: "+cellValue);
					browser.debug();
					// complete the logic later, my ube is running on else part now
				}


			}

		}
		else
		{
			module.exports.selectDeselectByRowNormal(gridId,rowIndex);
		}


	}
},



selectDeselectByRowNormal : function(gridId,rowIndex)
{
	var colObj, chStatus, chS;

	for(var cnt=0 ;cnt<10 ; cnt++)
	{
		colObj = browser.execute(gridUtility.setRowSelector, gridId,rowIndex);
		colObj = colObj.value;
		console.log("The row selector are:"+colObj);

		var temp = colObj[0];

		if((temp!=null)&&((temp.length!=0)))
			{	
				console.log("Inside selectDeselectByRowNormal:" +colObj);
				break;
			}
	}


	if((colObj[1]!=null)&&((colObj[1]).toLowerCase() === ("radio")))
	{
		browser.execute(gridUtility.clickRadio,temp);
		browser.pause(1000);
		console.log("The radio button is clicked!")
	}
	else if((colObj[1]!=null)&&((colObj[1]).toLowerCase() === ("checkbox")))
	{
		browser.execute(gridUtility.clickCheckbox,temp);
		// as of now not implementing scrolling to extreme left code
		var cbSelector = '//input[@id="'+temp+'"]';
		chStatus = browser.getAttribute(cbSelector,'checked');
		console.log("The status of checkbox is: "+chStatus);

		if(!chStatus)
		{
		browser.execute(gridUtility.clickCheckbox,temp);
		console.log("Checkbox is selected secondtime.");
		}
		//browser.debug();
	}

	else
	{
		console.log("Test Failed");
	}


},


// used by ube, only has one grid
getGridRowCount : function()
{
	var gridId,output;
	var rowCount =-1;

	gridId = module.exports.getGridIds(0);

	if(gridId != null)
	{
		output = browser.execute(gridUtility.getvisibleRowCount,gridId);
		rowCount = output.value;

		console.log("Grid has " + rowCount+ " rows");
	}
	return rowCount;
},

/************************************************************************************************************
	 * Function: isError
	 * Description: This function will return true if there is an error on page,
	 *		        and false if no error on page
	 * **********************************************************************************************************
******/

isError : function()
{
	

	var errorSel1 = '//img[starts-with(@alt,"Error")][starts-with(@id,"WIDGETID")]';
	var errorSel2 = '//a[starts-with(@href,"javascript:inyfeHandler.toggleDescription")]';
	// this xpath references the error text
	var errorSel3 = '//a[starts-with(@href,"javascript:inyfeHandler.toggleDescription")][(text())]';

	module.exports.selectFrame(errorSel1);

	var bool1 = browser.isExisting(errorSel1);
	var bool2 = browser.isExisting(errorSel2);

	var errMessage;

	if(bool1 && bool2)
	{
		errMessage = browser.getText(errorSel3);
		console.log("DONE: Error '" + errMessage + "' found.");	
		return true;	
	}
	else
	{
		return false;
	}
},

/************************************************************************************************************
	 * Function: getGridRowCount
	 * Description: This function will return the number of rows in the first grid on the webpage. Will not work for multiple grid webpages 
	 * Returns: 
	 * 		@return Number of rows in the grid
	 * **********************************************************************************************************
	 */
/*getGridRowCount : function()
{
	var gridId,output; 
	var rowCount = -1;

	module.exports.setGridIds();

	gridId = module.exports.getGridIds('2');

	if(gridId!=null)
	{
		output = browser.execute(gridUtility.getGridRowCount,gridId);
		rowCount = output.value;
	}

	console.log("Grid has " + rowCount+ " rows");

	return rowCount;
},
*/

// write logic to unclick checkbox too
checkBox : function(id,status)
{	
	var count = 5;
	while(count>0)
	{
		if(status == "true")
		{
		browser.execute(gridUtility.clickCheckbox,id);
		}

		var checkBoxId = '//input[@id="'+id+'"]';	
		var bool = browser.isSelected(checkBoxId);
		if(bool == status)
		{
			break;
		}
		count--;
	}

	if(count==0)
	{
		console.log("Checkbox successfully set to: "+status);
	}
	else
	{
		console.log("Checkbox couldnot be set to: "+status);
	}


},




 
// syncFrame : function()
// {
// //$("#procIndicatorFloatLyr").css("display", "block");	
// ////div[starts-with(@id,'procIndicator')]
// var e1Browser = '//iframe[@name="e1menuAppIframe"]';
// var loadStatus = '//div[@id="ariaLog"]';
// var indicator = '//div[starts-with(@id,"procIndicator")]';

// var eOneHome = '[title*="EnterpriseOne"]';
// /*
// var text = browser.waitForExist(e1Browser,1000);



// var isExist = false;

// do{

// var status = browser.getText(loadStatus);

// if(status=="")
// {
// 	isExist = true;
// 	browser.pause(1000);
// }
// browser.pause(1000);	
// }
// while(isExist);
// */

// browser.waitForExist(e1Browser,1000);


// browser.pause(1000);

// var bool1 = true;
// var bool2 = true;
// var count = 0;

// module.exports.selectFrame(e1Browser);

// while((bool1 || bool2) && count<10)
// {
// 	//returns null if display is none
// 	//check for loading indicator
// 	if(browser.isExisting(indicator))
// 	{	
// 	var status = browser.getAttribute(indicator,'display');
	
// 		if (status == null)
// 		{
// 			bool1 = false;
// 		}	
// 	}

// 	browser.pause(1000);

// 	status = browser.getText(loadStatus);

// 	//after page loads : "page loading complete"
// 	if (status != "")
// 	{
// 		bool1 = false;
// 	}

// 	//returns null if display is none
// 	//check for loading indicator

// 	browser.pause(1000);
// 	if (browser.isExisting(eOneHome))
// 	{
// 		bool1 = false;
// 		bool2 = false;
// 		browser.pause(2000);
// 	}

// 	count++;

// }
// }, 


/************************************************************************************************************
     * Function: selectFormMenu
	 * Description: This function is used to click the Form Menu link and the specifed Exit buttons under the Form link
	 * Created By: Ranendra
	 * Date: April 2019
	 * Input Parameters: 
	 * 		@param formMenuPath: The sub menu item  available  under the Form  menu.
	 * Returns: 
	 * 		@return Nil

* **********************************************************************************************************
*/


selectFormMenu : function(formMenuPath)
{
	logger.info("Starting function selectFormMenu");

	var formImg = '//img[@id="FORM_EXIT_BUTTON"]';

	module.exports.selectFrame(formImg);

	var launchmenuID = browser.getAttribute(formImg,'launchmenuid');

	var selector = '//div[@id="'+launchmenuID+'"]';

	do
	{
		browser.click(formImg);
		browser.pause(1000);
	}
	while(!browser.isVisible(selector));

	selector = '//nobr[contains(text(),"'+formMenuPath+'")]';

	logger.info("Clicking on "+formMenuPath);

	browser.click(selector);

	browser.pause(1000);

	logger.info("Ending function selectFormMenu");

	// id //nobr[contains(text(),'Submitted Jobs')]
},


selectFormMenu : function(formMenuPath)
{
	logger.info("Starting function selectFormMenu");

	var formItems = formMenuPath.split(";");

	var formItemLen = formItems.length;

	console.log("The form menu path items are: "+formItems+" and length is :"+formItemLen);

	var formImg = '//img[@id="ROW_EXIT_BUTTON"]';

	module.exports.selectFrame(formImg);

	var launchmenuID = browser.getAttribute(formImg,'launchmenuid');

	var selector = '//div[@id="'+launchmenuID+'"]';

	browser.click(formImg);

	var formMenuSelector,count=0;

	while(browser.isVisible(selector) && (count<formItemLen))
	{
		formMenuSelector = '//nobr[contains(text(),"'+formItems[count]+'")]';
		browser.moveToObject(formMenuSelector);
		browser.pause(500);
		browser.click(fromMenuSelector);
		browser.pause(1000);
		count++;
	}

	logger.info("Ending function selectFormMenu");

},



//Print,Print All


selectRowMenu : function(rowMenuPath)
{
	logger.info("Starting function selectRowMenu");

	var rowItems = rowMenuPath.split(";");

	var rowItemLen = rowItems.length;

	console.log("The row menu path items are: "+rowItems+" and length is :"+rowItemLen);

	var rowImg = '//img[@id="ROW_EXIT_BUTTON"]';

	module.exports.selectFrame(rowImg);

	var launchmenuID = browser.getAttribute(rowImg,'launchmenuid');

	var selector = '//div[@id="'+launchmenuID+'"]';

	browser.click(rowImg);

	var rowMenuselector,count=0;

	while(browser.isVisible(selector) && (count<rowItemLen))
	{
		rowMenuselector = '//nobr[contains(text(),"'+rowItems[count]+'")]';
		browser.moveToObject(rowMenuselector);
		browser.pause(500);
		browser.click(rowMenuselector);
		browser.pause(1000);
		count++;
	}

	logger.info("Ending function selectRowMenu");

},

performance : function(start)
{
	  var execTime = (now()-start).toFixed(3);
	  logger.info("The run time of the script is "+execTime+" ms.");
},




//------------------------------------------START of UBE Functions---------------------------------------------------

/************************************************************************************************************
	  * Function: UBESetXML  
	  * Description: This function can be used to turn on XML output when submitting a UBE.
	  * 				It will simply click the Document Setup tab, click the OSA Interface checkbox,
	  * 				enter XML in the edit box, then click OK.
	  * Created By: Ranendra
	  * Date: February 2019
	  * Input Parameters: 
	  *      @param Nil             		
	  * Returns: 
	  * 		@return Nil
	  * **********************************************************************************************************
	  */

// //a[@id='CT0_30.2'] - Document Setup
UBESetXML : function()
{
	console.log("Starting:Function UBESetXML");

	module.exports.selectFrame('//form[@id="E1PaneForm"]');

	var bool = browser.isExisting('//form[@id="E1PaneForm"]');

	var selector = '//input[@id="C0_98"]';

	var selectorCB = "C0_98";

	var selectorInp = '//input[@id="C0_100"]';
	if(bool)
	{
		
			browser.click('//a[@id="CT0_30.2"]');
			browser.waitForExist(selector,'5000');
			
			module.exports.syncFrame();
			module.exports.checkBox(selectorCB,"true");
			//not firing the textbox
			//use wait untill logic
			browser.waitForExist(selectorInp,'3000');
			module.exports.setHeaderText("C0_100","XML");
			browser.pause(1000);
			module.exports.clickToolBarImage("OK");
	}
	else
	{	
		logger.error("E1 Page not exists");
	}

	console.log("Finished:Function UBESetXML ");
},



UBESubmit : function(sReport)
{
	console.log("Starting:Function UBESubmit");

	var sReportID, sVersionID;

	var sUBE = sReport.split("_");
	sReportID = sUBE[0];
	sVersionID = sUBE[1];

	module.exports.fastPath("BV");
	module.exports.setGridQBEValues("0", "Version="+sVersionID);

	module.exports.setHeaderText("C0_11",sReportID);

	module.exports.clickToolBarImage("Find");

	var count = module.exports.getGridRowCount();
	console.log("The rows in grid are : "+count);

	if (count==0)
	{
		logger.error("Function UBESubmit Failed, there seems no matching row in grid");
		return false;
	}

	module.exports.selectDeselectByRowNo(0,0);

	module.exports.clickToolBarImage("Select");

	module.exports.syncFrame();
	// write logic to sync frame 
	//browser.pause(2000);

	if(module.exports.isError())
	{
		logger.error("Function UBESubmit Failed, error on BV page");
		module.exports.clickToolBarImage('Close');
		browser.pause(1000);
		module.exports.syncFrame();
		return false;
	}

	//var bool = browser.isExisting('//span[contains(text(),"Version Prompting")]');

	module.exports.selectFrame('[title*="Version Prompting"]');

	var bool = browser.isExisting('[title*="Version Prompting"]');

	console.log("Version Prompting screen found: "+bool);

	if(bool)
	{
		browser.click('//img[@id="hc0"]');
		browser.pause(5000);

		if(module.exports.isError())
		{
			logger.error("Function UBESubmit Failed, error on Version Prompting page");
		    module.exports.clickToolBarImage('Cancel');
		    browser.pause(1000);
		    module.exports.syncFrame()

		    module.exports.clickToolBarImage('Close');
			browser.pause(1000);
			module.exports.syncFrame()
			return false;
		}

	}

	//bool = browser.isExisting('//span[contains(text(),"Processing Options")]');
	bool = browser.isExisting('[title="Processing Options"]');

	console.log("Processing Options screen found: "+bool);

	if(bool)
	{
		browser.click('//img[@id="hc_Select"]');
		browser.pause(1000);

		if(module.exports.isError())
		{
			//failure write logic
			return false;
		}
	}

	//focus on the frame
	module.exports.selectFrame('//span[starts-with(@title,"Printer")][contains(text(),"Selection")]');

	var cnt=0;
	while(!(browser.isExisting('//a[contains(text(),"Document Setup")]')))
	{
		browser.pause(1000);
		cnt++;

		if(cnt>60)
		{
			//failure write logic
			console.log("Failed in Processing Options");
			break;
		}
	}

	module.exports.UBESetXML();	

	browser.waitForExist('[title*="Work With Batch Versions - Available Versions"]','5000');

	//wait ..
	// focus on the frame of Printer Selection

	module.exports.selectFrame('//form[@id="E1PaneForm"]');

	if(module.exports.isError() && browser.isExisting('//span[starts-with(@title,"Printer")][contains(text(),"Selection")]'))
	{
		//failure write logic
		return false;
	}

	module.exports.clickToolBarImage("Close");
	browser.pause(1000);

	//module.exports.selectFrame('[title*="Work With Batch Versions - Available Versions"]');

	bool = browser.isExisting('[title*="Work With Batch Versions - Available Versions"]');

	if(module.exports.isError() && bool)
	{
		//failure write logic
		return false;
	}
	
	console.log("Ending:Function UBESubmit");

	return true;

},


UBEGetXML : function(sReport)
{
	logger.info("Starting function UBEGetXML");

	logger.info("Calling function removeXML");

	module.exports.removeXML(sReport);

	module.exports.fastPath("WSJ");

	module.exports.syncFrame();

	sReport = sReport.substr(0,16).trim();

	module.exports.setGridQBEValues(0,"Job="+sReport+"*");

	module.exports.clickToolBarImage("Find");

	if(module.exports.getGridRowCount()==0)
	{
		logger.error("The UBE and/or Version " + sReport + " was not found.");
		module.exports.syncFrame();
		module.exports.clickToolBarImage("Close");
		module.exports.syncFrame();

		return;
	}

	module.exports.selectDeselectByRowNo(0, 0); 

	module.exports.selectRowMenu("View OSA");

	browser.pause(5000);

	if(module.exports.isDownload(sReport))
	{
		logger.info("The UBE "+sReport+" was downloaded successfully.");
	}
	else
	{
		logger.fatal("File could not be downloaded.")
	}

},





//------------------------------------------START of XML Test Functions---------------------------------------------------
/************************************************************************************************************
	  * Function: XML2JSON  
	  * Description:This function can be used to convert an XML to JSON.
	  * 			It uses the node-xml2js module to convert to JS object.
	  				https://www.npmjs.com/package/xml2js#options
	  * Created By: Ranendra
	  * Date: March 2019
	  * Input Parameters: 
	  *      @fileName            		
	  * Returns: 
	  * 		@returns JSON convert of XML
	  * **********************************************************************************************************
	  */

XML2JSON : function(fileName){

	var resultJSON;

	var dir = global.downloadDir;

	var fileList = fs.readdirSync(dir);

	//var data = fs.readFileSync(dir+'/'+filename+'.xml');
	//var data = fs.readFileSync('../WebDIO/xmlFiles/'+filename+'.xml');

	var file,bool,data;

	for(var i=0; i<fileList.length ; i++)
	{
		file = fileList[i];//.slice(0,-4); // trims the .xml extension
		bool = file.includes(fileName);
		if(bool)
		{	
			logger.info('Converting '+file+' to JSON array');
			data = fs.readFileSync(dir+'/'+file);
			parser.parseString(data,function(err,result){
			resultJSON = result;	
			});
		}
	}
	return resultJSON;
},

/************************************************************************************************************
	  * Function: nodeValueTest  
	  * Description: This function can be used to test node items of an XML report.
	  * Created By: Ranendra
	  * Date: March 2019
	  * Input Parameters: 
	  *      @nodePath is the JS Obj array node path for a particular item  
	  *		 eg - result.BatchOutput.Pages.Page.Item[3].$.Value		          		
	  * Returns: 
	  * 		@returns JSON convert of XML
	  * **********************************************************************************************************
	  */

nodeValueTest : function(jsonObj,nodePath,value,isStore)
{
	var item = _.get(jsonObj,nodePath,'Not found');
	console.log("The node item at mentioned nodePath :"+item);

	if (isStore==undefined)
	{	
		try
		{
			assert.equal(item,value,"The expected and actual nodeValue is not equal");
		}
		catch(err)
		{
			logger.error(err.message);
		}
		
	}
	else
	{
		return item;
	}
	
},






removeXML : function(fileName)
{
	/*var dir = path.join(global.downloadDir,fileName);
	logger.info('The directory is'+dir);
	*/
	var dir = global.downloadDir;
	logger.info('The dir is:'+dir+' starting removeXML');

	var fileList = fs.readdirSync(dir);

	var file,bool;

	for(var i=0; i<fileList.length ; i++)
	{
		file = fileList[i];//.slice(0,-4); // trims the .xml extension
		bool = file.includes(fileName);
		if(bool)
		{	
			logger.info('The xml-file already exists in the download loc, deleting now');
			file = file.replace(fileName,"");
			fileName = fileName + file;
			dir = path.join(global.downloadDir,fileName);
			fs.unlinkSync(dir);

		}

	}



},


/************************************************************************************************************
	  * Function: isDownload  
	  * Description: This function is used to check if an XML report file was downloaded.
	  * Created By: Ranendra
	  * Date: April 2019
	  * Input Parameters: 
	  *      @fileName is the name of the report file           		
	  * Returns: 
	  * 		@returns boolean value
	  * **********************************************************************************************************
	  */


isDownload : function(fileName)
{
	var dir = global.downloadDir;

	var fileList = fs.readdirSync(dir);

	var file,bool;

	for(var i=0; i<fileList.length ; i++)
	{
		file = fileList[i];	
		bool = file.includes(fileName);
		if(bool)
		{
			return true;
		}
	}

	return false;


},
//------------------------------------------DataTable Manipulation Functions---------------------------------------------------

outputHeaderText : function(header,value)
{
	logger.addToDataTable(header,value);
},



//------------------------------------------Performance Evaluation Functions---------------------------------------------------


startFlag : function()
{	
	let start = performance.now();
	logger.info("the starting time is"+start);
	return start;
},

evaluateTime : function(start)
{
	let execTime = performance.now();
	execTime = (execTime - start).toFixed(3);
	logger.info("The execution time is "+execTime);
}


//module close brace
}

