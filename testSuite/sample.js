/*var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray : false});
//parser = xml2js.Parser({ explicitArray: true });

fs.readFile('test.xml',function(err,data){

	//parser.parseString(data,function(err,result){
	parser.parseString(data,function(err,result){	
		//console.log('%s',JSON.stringify(result.BatchOutput.Pages[1]));

		
		//console.log(result.BatchOutput.Pages);

		var t = result.BatchOutput.Pages;
		//console.log(JSON.stringify(result['BatchOutput']['Pages']['Page']['Item[1]]));
		//var json = JSON.stringify(result);
		//console.log(json.length);
		//console.log(JSON.parse(result));

		console.log("*************");
		//console.log(result);
		//console.log(t['Page']['Item']);
		var len = t['Page']['Item'];

		
		console.log(t.Page.Item[3].$.Value);
			

		//console.log(JSON.stringify(t.Page.Item[1]));
		var length = len.length;

		console.log(length);
	});
});






*/



/*
const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'trace' } }
});
 
const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');

let os = require('os')
console.log(os.userInfo().homedir);

console.log("hehe:"+__dirname);// returns directory of the folder*/
// var  {performance}  = require('perf_hooks');
// var a = performance.now();
// console.log("The start time "+a.toFixed(5));
// var b;

// for(var i =0 ; i< 100 ; i++)
// {
// 	if(i%20==0)
// 	{
// 		b = performance.now();
// 		console.log("The interval is "+(b-a).toFixed(3)+" ms.");
// 	}

// }
// var fs = require('fs');
// var writeStream = fs.createWriteStream("test123.xls");

// var header="Sl No"+"\t"+" Age"+"\t"+"Name"+"\n";
// var row1 = "0"+"\t"+" 21"+"\t"+"Rob"+"\n";
// var row2 = "1"+"\t"+" 22"+"\t"+"bob"+"\n";

// writeStream.write(header);
// writeStream.write(row1);
// writeStream.write(row2);

// writeStream.close();

var XLSX = require('xlsx');
var workbook = XLSX.utils.book_new();

// var ws_name = "SheetJS";
 
// /* make worksheet */
// var ws_data = [
//   [ "S", "h", "e", "e", "t", "J", "S" ],
//   [  1 ,  2 ,  3 ,  4 ,  5 ]
// ];
// var ws = XLSX.utils.aoa_to_sheet(ws_data);
 
// /* Add the worksheet to the workbook */
// XLSX.utils.book_append_sheet(workbook, ws, ws_name);

// XLSX.writeFile(workbook,'try.xlsx');

workbook.Props = {
				Title: "SheetJS Tutorial",
                Subject: "Test",
                Author: "Red Stapler",

};

workbook.SheetNames.push("Test Sheet");

// var k = 'kaka';
 var arr = [];

 var item = {};
 item["User"]="RD9076642";
// //var data = {abc:k};
arr.push(item);
var ws = XLSX.utils.json_to_sheet(arr);

//,{header:['def','abc']}
// var ws_data = [['RD9076642']];

// var ws_sheet = XLSX.utils.aoa_to_sheet(ws_data);

//XLSX.utils.book_append_sheet(workbook,ws,"Test");
workbook.Sheets["Test Sheet"] = ws;

 
XLSX.writeFile(workbook,'one.xlsx');

// var workbook = XLSX.readFile('one.xlsx');
// var sheet_name_list = workbook.SheetNames;
// var t = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {raw: true, defval:null});
// console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {raw: true, defval:null}))
// console.log(t[0]);
// console.log(t[0].def);

// function addToDataTable(sheet,header,value)
// {
// 	var range = XLSX.utils.decode_range(sheet['!ref']);
// 	var columnRange = range.e.c;
// 	var rowStartRange =0;
// 	var cellRef = XLSX.utils.encode_cell({c:columnRange+1,r:rowStartRange});
// 	if(!sheet[cellRef]) 
// 	{	
// 		console.log("Cell ref doesnt exist for header");
// 	}; // if cell doesn't exist
// 	var cell = sheet[cellRef];
// 	cell.v = header;
// 	cellRef = XLSX.utils.encode_cell({c:columnRange+1,r:rowStartRange+1});
// 	if(!sheet[cellRef]) 
// 	{	
// 		console.log("Cell ref doesnt exist for value");
// 	}; // if cell doesn't exist
// 	var cell = sheet[cellRef];
// 	cell.v = value;
// 	return sheet;
// }



// var sheet = workbook.Sheets[workbook.SheetNames[0]];
// var range = XLSX.utils.decode_range(sheet['!ref']); 
// console.log("Range "+range.e.r);// get the range
//             for(var R = range.s.r; R <= range.e.r; ++R) {
//               for(var C = range.s.c; C <= range.e.c; ++C) {
//                 /* find the cell object */
//                 console.log('Row : ' + R);
//                 console.log('Column : ' + C);
//                 var cellref = XLSX.utils.encode_cell({c:C, r:R}); // construct A1 reference for cell
//                 if(!sheet[cellref]) continue; // if cell doesn't exist, move on
//                 var cell = sheet[cellref];
// 				console.log(cell.v);
// 				if(cell.v=='def')
// 				{
// 					var cellref1 = XLSX.utils.encode_cell({c:C, r:R+1}); // construct A1 reference for cell
// 					if(!sheet[cellref]) 
// 					{
// 					console.log('NOt found');
// 					continue;
// 					} // if cell doesn't exist, move on
// 					var cell1 = sheet[cellref1];
// 					console.log("def to"+cell1.v);	
// 				}

// 			  }}