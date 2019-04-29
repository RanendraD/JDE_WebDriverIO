/*This creates child process*/

/*var cluster = require('cluster');

if (cluster.isWorker) {
  console.log('I am a worker');
} else {
  console.log('I am a master');
  cluster.fork();
  cluster.fork();
}
*/


/*

This creates a web server at port 8050 locally. Hello World is seen
http://localhost:8050

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8050);*/

// var start = new Date()

// start.setHours(start.getHours()+5);
// start.setMinutes(start.getMinutes()+30);

// var utcDate = start.toUTCString().slice(0,-4).replace(/ /g, '');

// console.log(utcDate);
// function addToDataTable(sheet,header,value)
// {
//   var range = XLSX.utils.decode_range(sheet['!ref']);
//   console.log(JSON.stringify(range));
//   var columnRange = range.e.c;
//   console.log("C Range "+columnRange);
//   range.e.c = columnRange+1;
//   sheet['!ref'] = XLSX.utils.encode_range(range);
//   range = XLSX.utils.decode_range(sheet['!ref']);
//   console.log("New "+JSON.stringify(range));
//   var rowStartRange =0;
// 	var cellRef = XLSX.utils.encode_cell({c:3,r:0});
// 	// if(!sheet[cellRef]) 
// 	// {	
// 	// 	console.log("Cell ref doesnt exist for header");
//   // }; // if cell doesn't exist
//   var cell = { v : header};
//   //cell.v = header;
//   //cell.t = 's';

//   sheet[cellRef]=cell;

// 	//var cell = sheet[cellRef];
// 	//sheet[cellRef] = header;
// 	// cellRef = XLSX.utils.encode_cell({c:columnRange+1,r:rowStartRange+1});
// 	// if(!sheet[cellRef]) 
// 	// {	
// 	// 	console.log("Cell ref doesnt exist for value");
// 	// }; // if cell doesn't exist
// 	// var cell = sheet[cellRef];
// 	// cell.v = value;
// 	return sheet;
// }

function addToDataTable(sheet,header,value)
{
  var range = XLSX.utils.decode_range(sheet['!ref']);
  console.log("C Range "+range.e.c);
  range.e.c += 1;
  //console.log("R Range "+range.e.r);
  //range.e.c = columnRange+1;
  console.log("New C range "+range.e.c);
  sheet['!ref'] = XLSX.utils.encode_range(range);
  //range = XLSX.utils.decode_range(sheet['!ref']);
  console.log("Latest "+JSON.stringify(range));
  var rowStartRange =0;
	var cellRef = XLSX.utils.encode_cell({c:range.e.c,r:0});
	// if(!sheet[cellRef]) 
	// {	
	// 	console.log("Cell ref doesnt exist for header");
  // }; // if cell doesn't exist
  var cell = { v : header};
  //cell.v = header;
  //cell.t = 's';

  sheet[cellRef]=cell;

	//var cell = sheet[cellRef];
	//sheet[cellRef] = header;
	// cellRef = XLSX.utils.encode_cell({c:columnRange+1,r:rowStartRange+1});
	// if(!sheet[cellRef]) 
	// {	
	// 	console.log("Cell ref doesnt exist for value");
	// }; // if cell doesn't exist
	// var cell = sheet[cellRef];
	// cell.v = value;
	return sheet;
}






var XLSX = require('xlsx');
var workbook = XLSX.utils.book_new();

var workbook = XLSX.readFile('one.xlsx');
var sheet = workbook.Sheets[workbook.SheetNames[0]];

var ws = addToDataTable(sheet,"ada","dada");
workbook.Sheets["Test Sheet"] = ws;
XLSX.writeFile(workbook,'one.xlsx');



