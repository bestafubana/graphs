/* Coded by Natanael Silva - just for fun
*	https://github.com/bestafubana
*/

(function(chartTitleId, xTitleId, yTitleId, xValueId, yValueId, textColourId,
		 barColourId, barCId, textCId, buttonId, helpId){

	var ctx = document.getElementById("canvas").getContext('2d');

	var yAxis = [75,45];
	var xAxis = [600,495];
	var origin = [75,495];

	var xData = ["ABC", "BCD", "CDE", "DEF", "EFG", "FGH", "GHI"];
	var yData = [200, 400, 150, 550, 320, 350, 40];

	var barColor = 'rgba(164,255,66,0.7)';
	var textColor = 'rgba(96,51,39,1.0)';

	function drawLine(point1, point2){
		ctx.beginPath();
		ctx.moveTo(point1[0],point1[1]);
		ctx.lineTo(point2[0],point2[1]);
		ctx.stroke();
	}

	function clear(){
		ctx.fillStyle = 'rgba(255,255,255,1.0)';
		ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
	}

	function drawRectangle(startingPoint, width, height, color){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.moveTo(startingPoint[0], startingPoint[1]);
		ctx.fillRect(startingPoint[0],startingPoint[1], width, height);
	}
	
	function drawAxis(){
		drawLine(yAxis, origin);
		drawLine(origin, xAxis);

		//drawing the arrows
		drawLine(yAxis, relativePointTo(yAxis, -5, 10));
		drawLine(yAxis, relativePointTo(yAxis, 5, 10));

		drawLine(xAxis, relativePointTo(xAxis, -10, 5));
		drawLine(xAxis, relativePointTo(xAxis, -10, -5));
	}

	function relativePointTo(point, x_offset, y_offset){
		return [point[0] +x_offset, point[1] + y_offset];
	}

	function highestValue(values){
		var value = 0;
	
		for(i = 0; i < values.length; i++){
			if(values[i] > value){
				value = values[i];
			}
		}
	
		return value;
	}

	function longestValue(values) {
		var value = 0;
	
		for(i = 0; i < values.length; i++){
			if(values[i].toString().length > value){
				value = ctx.measureText(values[i].toString()).width;
			}
		}
	
		return value;
	}

	function write(text, point , rgbaColor){
		ctx.fillStyle = rgbaColor;
		ctx.fillText(text, point[0], point[1]);
	}

	function writeBarXLegend(text, point, barWidth, rgbaColor){
		ctx.fillStyle = rgbaColor;
		ctx.font = "7pt Arial";
		ctx.fillText(text, 
					 point[0] + (barWidth - ctx.measureText(text).width)/2,
					 point[1] + 15);
	}

	function drawGraph(xData, yData, color, legendColor){
		var barWidth = ((xAxis[0] - origin[0] - 20)*0.8)/xData.length;
		var barHorizontalSpace = ((xAxis[0] - origin[0] - 20)*0.2)/xData.length;
	
		var VerticalUnity = (yAxis[1] - origin[1])*0.8/highestValue(yData);
		var longestVal = longestValue(yData);
	
		for(i = 0; i < yData.length; i++){
			var startingPoint = relativePointTo(origin, barHorizontalSpace*(i+1) + barWidth*i, -1);
			drawRectangle(startingPoint, barWidth, yData[i]*VerticalUnity, color);
		
			writeBarXLegend(xData[i], startingPoint, barWidth,legendColor);
		
			write(yData[i], relativePointTo(origin, -longestVal -5, yData[i]*VerticalUnity), legendColor);
		}
	}

	function writeTitle(text, color){
		ctx.font = "28pt Arial";
		var x = (ctx.canvas.width - ctx.measureText(text).width)/2;
	
		write(text,[x, 35] ,color);
	}

	function writeXTitle(text, color){
		ctx.font = "10pt Arial";
		var x = (ctx.canvas.width - ctx.measureText(text).width)/2;
	
		write(text,[x, ctx.canvas.height - 15] ,color);
	}

	function writeYTitle(text, color){
		ctx.font = "10pt Arial";
		var y = ctx.measureText(text).width + (ctx.canvas.height - ctx.measureText(text).width)/2;
	
		ctx.save();
		ctx.translate(0, 0);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		write(text,[-y, 30] ,color);
		ctx.restore();
	
	}

	function main(){
	
		clear();
		drawAxis();
	
		barColor = document.getElementById(barCId).style.backgroundColor;
		textColor = document.getElementById(textCId).style.backgroundColor;
	
		xData = document.getElementById(xValueId).value.replace(/\s/g, "").split(",");
		yData = document.getElementById(yValueId).value.replace(/\s/g, "").split(",");
	
		drawGraph(xData, yData, barColor, textColor);

		writeTitle(document.getElementById(chartTitleId).value, textColor);

		writeXTitle(document.getElementById(xTitleId).value, textColor);

		writeYTitle(document.getElementById(yTitleId).value, textColor);

		var dataURL = document.getElementById("canvas").toDataURL();
		document.getElementById('imgLink').href = dataURL;
	}

	function init(){
		changeTextColor();
		changeBarColor();
	}
	
	function changeTextColor(){
		var text = document.getElementById(textColourId).value;
		var pattern = /^\#[\dA-Fa-f]{6}$/;
	
		var reg = new RegExp(pattern);
	
		if(reg.test(text)){
			document.getElementById(textCId).style.backgroundColor = text;
			document.getElementById(textColourId).style.backgroundColor = "#FFFFFF";
		}else{
			document.getElementById(textColourId).style.backgroundColor = "#FFC1D2";
		}
	}
	
	function changeBarColor(){
		var text = document.getElementById(barColourId).value;
		var pattern = /^\#[\dA-Fa-f]{6}$/;
	
		var reg = new RegExp(pattern);

		if(reg.test(text)){
			document.getElementById(barCId).style.backgroundColor = text;
			document.getElementById(barColourId).style.backgroundColor = "#FFFFFF";
		}else{
			document.getElementById(barColourId).style.backgroundColor = "#FFC1D2";
		}
	}
	
	function showTooltip(){
		document.getElementById("tooltip").style.display = "block";
	}
	
	function hideTooltip(){
		document.getElementById("tooltip").style.display = "none";		
	}

	init();
	main();
	
	document.getElementById(buttonId).addEventListener("click", function(){
															main();
														}, false);
	document.getElementById(textColourId).addEventListener("input", function(){
															changeTextColor();
														}, false);			

	document.getElementById(barColourId).addEventListener("input", function(){
															changeBarColor();
														}, false);			

	document.getElementById(textColourId).addEventListener("click", function(){
															document.getElementById(textColourId).value = "#";
														}, false);			

	document.getElementById(barColourId).addEventListener("click", function(){
															document.getElementById(barColourId).value = "#";
														}, false);
														
	document.getElementById(helpId).addEventListener("mouseover", function(){
															showTooltip();
														}, false);					
	document.getElementById(helpId).addEventListener("mouseout", function(){
															hideTooltip();
														}, false);																															
})("chartTitle", "xTitle","yTitle", "xValue", "yValue", "textColour", "barColour",
 "barC", "textC", "generate", "help");