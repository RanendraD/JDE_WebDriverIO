/************************************************************************************************************
 * Function: myTimer
 * Description: Java script will wait
 * Input Parameters: Nil
 * Returns: Nil
 * **********************************************************************************************************
 */

function myTimer(){
	var d=new Date()
	var t=d.toLocaleTimeString()
	var ele=document.getElementById("demo")
	if(ele)
		document.getElementById("demo").innerHTML=t
}


/************************************************************************************************************
 * Function: getvisibleRowCount
 * Description: Return the visible row count in the grid on the EOne Apps screen.
 * Input Parameters: 
 * 		@param id :Id of the Grid
 * Returns: 
 *		@return visible row count
 * **********************************************************************************************************
 */

function getvisibleRowCount(id)
{
	var count=0
	if (typeof GCMH != "undefined" && GCMH != null)
		{
		var grid = GCMH.findGrid(id)
		if (grid){
			count=grid.visibleRowCount
			}
		}
	return count
};


function getRowIndex(id,ivisibleRow){
	var rowIndex=-1
	if (typeof GCMH != "undefined" && GCMH != null){
		var grid = GCMH.findGrid(id)
		if (grid){		
			if(grid.gridData.length == grid.visibleRowCount){
				rowIndex = ivisibleRow																							
			}else{
				rowIndex =-1
				for(var idx =0;idx<=ivisibleRow; idx++){
					rowIndex =grid.getNextVisibleRowIndex(rowIndex)
				}
			}
		}
	}
	return (rowIndex)

};



function getColLen(id)
{
	
	if (typeof GCMH != "undefined" && GCMH != null){
		var grid = GCMH.findGrid(id)
		if (grid) {
			var len =grid.getColCount()
			return len
		}else{
			return 0
		}
	}else{
		return 0
	}
};


function getColLabel(id,i){
	if (typeof GCMH != "undefined" && GCMH != null){
		var grid = GCMH.findGrid(id)
		if (grid) {
			var col=grid.getColumnByColIndex(i).label
			return col
		}              
	}
};



function gridCellIsHidden(id,colIndex){
	var bCellisHidden=false
	if (typeof GCMH != "undefined" && GCMH != null){
		var grid = GCMH.findGrid(id)
		if (grid){
			//alert("hidden " +grid.getColumnByColIndex(colIndex)._isHidden);
			bCellisHidden = grid.getColumnByColIndex(colIndex)._isHidden              
		}

	}
	return (bCellisHidden)
};


function getGridRowCellValue(id,rowIndex,colIndex){
	var  sGridValue=""
	if (typeof GCMH != "undefined" && GCMH != null) {
		var grid = GCMH.findGrid(id) 
		if (grid) { 
			var gridVal = grid.getValueAt(parseInt(rowIndex),colIndex)
			//alert(typeof gridVal);
			if(typeof gridVal == "object"){
				//alert("Inside if:\n object is icon, combobox or tree node - try and extract desired value");
				//object is icon, combobox or tree node - try and extract desired value
				var aFieldArr = gridVal
				if(typeof aFieldArr.getItem(1) == "object"){//typeof aFieldArr.getItem(1) == 'Object'
					//alert("Inside if:\n aFieldArr.getItem(1)");
					if(aFieldArr.getItem(3)){
						//alert("Inside if:\n Tree Node - node value in array posn 3");
						//Tree Node - node value in array posn 3
						sGridValue = aFieldArr.getItem(3)
					} else{
						//alert("Inside else:\n Combobox - selected index at array posn 0, available values list at array posn 1");
						//Combobox - selected index at array posn 0, available values list at array posn 1
						sGridValue = aFieldArr.getItem(1).getItem(aFieldArr.getItem(0))
					}
				} else{
					//alert("Inside else:\n Icon - data value in array posn 1");
					//Icon - data value in array posn 1
					sGridValue = aFieldArr.getItem(1)
				}
			}else{
				//alert("Inside else:\n text data");
				sGridValue = gridVal
			}
		}
	}
	return (sGridValue)
};


function setQBECellElemForColumn(id,colIndex,QBEVal){
	if (typeof GCMH != "undefined" && GCMH != null){
		var grid = GCMH.findGrid(id)
		if(grid){
			var qbe=grid.getQBECellElem(colIndex)
			if(qbe){
				var qbeFld=qbe.getElementsByTagName("INPUT")[0]    
				if(qbeFld.disabled==false){
					if(QBEVal==null){
						qbeFld.value=""
					}else{
						//qbeFld.value=QBEVal;
					}
					qbeFld.change     
					qbeFld.blur
					return qbeFld.id
				}else{
					return null
				}
			}
		} 
	}
};


function clickRadio(id)
{
	var element = document.getElementById(id)
	element.click()
	element.onClick()
};


function clickCheckbox(id)
{
	var element = document.getElementById(id)
	//element.focus()
	element.click()
};	


function setHeaderText(id,val)
{	
	var element = document.getElementById(id)
	element.value = val
	element.onblur() 
};


/************************************************************************************************************
 * Function: scrollCheckBoxIntoView
 * Description: scroll till expected row index is visible
 * 		
 * 
 **********************************************************************************************************
 */
function scrollCheckBoxIntoView(id,rowIndex,idx)
{
if (typeof GCMH != "undefined" && GCMH != null)
               {
               var grid = GCMH.findGrid(id)
               if(grid)
                              {
                              grid.gridBack.scrollLeft=0
                              var obj=grid.getRowSelector(parseInt(rowIndex))
							  
							  if((obj)||typeof(obj)=="undefined")
                                             {
                                             return true
                                             }
                              else
                                             {
                                             var totHt=grid.gridBack.scrollHeight
                                            // alert(totHt);
                                             var clHt=grid.gridBack.clientHeight
                                            // alert(clHt);
                                             if(parseInt(idx)<=(totHt/clHt))
                                                            {
                                                            grid.gridBack.scrollTop=(parseInt(idx)*clHt)
                                                            //alert(idx);
                                                            
                                                            var obj=grid.getRowSelector(parseInt(rowIndex))
                                                            if((obj)||typeof(obj)=="undefined")
                                                                           {
                                                                           //alert(obj);
                                                                           return true
                                                                           }
                                                            else{
                                                            return false}
                                                            }
                                             else
                                                            return null
                                             }
                              }
               }
};              




/************************************************************************************************************
 * Function: getGridCheckboxId
 * Description:It Returns the id and status of the cell at specified row and column index on the EOne Apps screen.
 * 		@param id :Id of the Grid
 *		@param rowIndex:visible row index of the specified row.
 * 		@param colIndex :Column Index of the Grid
 * Returns: 
 *      @return gridcell id
 *		@return gridcell type
 *		@return gridcell status
 **********************************************************************************************************
 */ 
function getGridCheckboxId(id,rowIndex,colIndex){
	var gridCell
	if (typeof GCMH != "undefined" && GCMH != null) {
		var grid = GCMH.findGrid(id) 
		if (grid) {
			grid.setFocusOnCell(parseInt(rowIndex), colIndex)
			gridCell = grid.getDataCell(parseInt(rowIndex), colIndex).getElementsByTagName("INPUT")[0]
			if((gridCell.type)=="checkbox"){                                               
				return [gridCell.id,gridCell.type,gridCell.status]
			}else{
				return [null,gridCell.type,gridCell.type]
			}
		}
	}                                                                                                              
};


/************************************************************************************************************
 * Function: setRowSelector
 * Description: Set the specified row of the grid  by selecting the Checkbox/radiobutton on the EOne Apps screen.
 * 		@param id :Id of the Grid
 *		@param rowIndex:visible row index of the specified row.
 * Returns: 
 *		@return id
 *      @return type.

 * **********************************************************************************************************
 */  

function setRowSelector(id,rowIndex){

	var rowSelector=null
	if (typeof GCMH != "undefined" && GCMH != null){
		var grid = GCMH.findGrid(id)
		if (grid){
			//setTimeout(function(){myTimer();},3000)			
			var obj=grid.getRowSelector(parseInt(rowIndex))
			//alert(obj);
			if(obj){
				rowSelector = grid.getRowSelector(parseInt(rowIndex))
				return [rowSelector.id,rowSelector.type]				
			}else{
				grid.gridBack.scrollLeft = 0
				return [null,null]
			}
		}
	}
};








module.exports.setRowSelector =  setRowSelector;
module.exports.getGridCheckboxId = getGridCheckboxId;
module.exports.setQBECellElemForColumn = setQBECellElemForColumn;
module.exports.getvisibleRowCount = getvisibleRowCount;
module.exports.getRowIndex = getRowIndex;
module.exports.getColLen = getColLen;
module.exports.getColLabel = getColLabel;
module.exports.gridCellIsHidden = gridCellIsHidden;
module.exports.getGridRowCellValue = getGridRowCellValue;
module.exports.setHeaderText = setHeaderText;
module.exports.scrollCheckBoxIntoView = scrollCheckBoxIntoView;
module.exports.clickCheckbox = clickCheckbox;
module.exports.clickRadio = clickRadio;