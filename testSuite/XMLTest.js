var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray : false});


module.exports={

/*resultXMLJSON : function(filename){

	var resultJSON;

	fs.readFile(filename+'.xml',function(err,data){

		parser.parseString(data,function(err,result){
			//console.log("Step here:");
			console.log(result);
			resultJSON = result;	
			
		});
	});
	console.log("RJSON:"+resultJSON);
	return resultJSON;
	
},*/


XML2JSON : function(filename){

	var resultJSON;

	var data = fs.readFileSync(filename+'.xml');

	parser.parseString(data,function(err,result){
			resultJSON = result;	
		});
	return resultJSON;
},


attributeTest : function(result,nodePath,nodeValue)
{	
	var bool = false;
	//nodePath = BatchOutput.Pages.Page.Item[14]
	var attributePath = 'result.'+nodePath+'.$.Value';

	var value = attributePath;

	console.log("The value is: "+value);

	if (value==nodeValue)
	{
		bool = true;
	}

},

XMLTest : function(filename,nodePath,xc)
{}

}