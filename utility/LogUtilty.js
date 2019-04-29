var log4js = require('log4js');
var path = require('path');
var fs = require('fs');
var ini = require('ini');

var XLSX = require('xlsx');
var workbook = XLSX.utils.book_new();

global.screenshot = 0;

/*log4js.configure({
	  appenders: { 'file': { type: 'file', filename: './logs/output.log' } },
	  categories: { default: { appenders: ['file'], level: 'trace' } }
});
*/
var start = new Date()

// shifting to IST
start.setHours(start.getHours()+5);
start.setMinutes(start.getMinutes()+30);

var utcDate = start.toUTCString().slice(0,-4).replace(/:/g, '-'); 

var log,script,resultPath ;

var resultFolder;

function configure(scriptName)
{	
	script=scriptName;

	resultFolder=script+' '+utcDate;
	resultPath = path.join(resultDir,resultFolder);

	//make result folder
	if(!fs.existsSync(resultPath))
	{
		fs.mkdirSync(resultPath);
	}

	//make datatable
	//  workbook.Props = {
	// 					Title: "SheetJS Tutorial",
	// 					Subject: "Test",
	// 					Author: "Red Stapler",};
	workbook.SheetNames.push('global');

	var login = ini.parse(fs.readFileSync('./Login.ini', 'utf-8'));
	var User = login.ENVIRONMENT.User;
	
	var arr = [];
	var item = {};
  item["USER"]=User;
  arr.push(item);
	var ws = XLSX.utils.json_to_sheet(arr);
	
	workbook.Sheets['global'] = ws;

	XLSX.writeFile(workbook,'./logs/'+resultFolder+'/'+'datatable.xls')

	// initialising script logs
	log4js.configure({
		 appenders: { 'file': { type: 'file', filename: './logs/'+resultFolder+'/'+script+'.log' } },
		 categories: { default: { appenders: ['file'], level: 'trace' } }
  });

	log = log4js.getLogger();


}



function info(message)
{
	log.info(message);
	return;
}

function warn(message)
{
	log.warn(message);
} 

function error(message)
{
	log.error(message);
	//implement saving with dynamic names
	browser.saveScreenshot('./logs/'+resultFolder+'/'+script+'_'+screenshot+'.png');
} 

function fatal(message)
{
	log.fatal(message);
}

// function addToDataTable(header,value)
// {
// 	var workbook = XLSX.readFile('./logs/'+resultFolder+'/'+'datatable.xls');
// 	var sheet = workbook.Sheets[workbook.SheetNames[0]];

// 	var range = XLSX.utils.decode_range(sheet['!ref']);

// 	//increase the column range by 1 to adjust the header
// 	range.e.c += 1;

// 	sheet['!ref'] = XLSX.utils.encode_range(range);//encoding the new column range

// 	var cellRef = XLSX.utils.encode_cell({c:range.e.c,r:0});
// 	var cell = { v : header};
// 	sheet[cellRef]=cell;
// 	//cell referencing for the value
// 	// cellRef = XLSX.utils.encode_cell({c:range.e.c,r:range.e.r});
// 	// cell = { v : value}
// 	// sheet[cellRef]=cell;
	
// 	workbook.Sheets["global"] = sheet; //reassigning the sheet to workbook with updated data

// 	XLSX.writeFile(workbook,'./logs/'+resultFolder+'/'+'datatable1.xls');

// }




//exports.log = log;

module.exports.configure = configure;
module.exports.info= info;
module.exports.warn= warn;
module.exports.error= error;
module.exports.fatal= fatal;
// module.exports.addToDataTable = addToDataTable;
