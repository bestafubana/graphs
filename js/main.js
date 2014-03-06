function draw() {
	
	var ctx = document.getElementById("canvas").getContext('2d');
	
	// Draw background
	ctx.fillStyle = 'rgb(255,0,0)';
	ctx.fillRect(0,0,150,37.5);
	ctx.fillStyle = 'rgb(0,255,0)';
	ctx.fillRect(0,37.5,150,37.5);
	ctx.fillStyle = 'rgb(0,0,255)';
	ctx.fillRect(0,75,150,37.5);
	ctx.fillStyle = 'rgb(255,255,0)';
	ctx.fillRect(0,112.5,150,37.5);
	
	// Overlay rectangular transparencies
	for (i=0;i<10;i++){
		ctx.fillStyle = 'rgba(255,255,255,'+(i+1)/10+')';
		for (j=0;j<4;j++){
			ctx.fillRect(5+i*14,5+j*37.5,14,27.5)
		}
	}
} 

var ctx = document.getElementById("canvas").getContext('2d');

var yAxis = [25,25];
var xAxis = [550,475];
var origin = [25,475];
var xData = ["ABC", "BCD", "CDE", "DEF", "EFG", "FGH", "GHI"];
var yData = [200, 400, 150, 550, 320, 330, 40];

function drawLine(point1, point2){
	ctx.beginPath();
	ctx.moveTo(point1[0],point1[1]);
	ctx.lineTo(point2[0],point2[1]);
	ctx.stroke();
}

function drawRectangle(startingPoint, width, height, color){
	ctx.beginPath();
	ctx.fillStyle = 'rgba(164,255,66,0.7)';
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
	ctx.fillText(text, 
				 point[0] + (barWidth - ctx.measureText(text).width)/2,
				 point[1] + 15);
}

function drawGraph(xData, yData){
	var barWidth = ((xAxis[0] - origin[0] - 20)*0.8)/xData.length;
	var barHorizontalSpace = ((xAxis[0] - origin[0] - 20)*0.2)/xData.length;
	
	var VerticalUnity = (yAxis[1] - origin[1])*0.8/highestValue(yData);
	var longestVal = longestValue(yData);
	
	for(i = 0; i < yData.length; i++){
		var startingPoint = relativePointTo(origin, barHorizontalSpace*(i+1) + barWidth*i, -1);
		drawRectangle(startingPoint, barWidth, yData[i]*VerticalUnity);
		
		writeBarXLegend(xData[i], startingPoint, barWidth,'rgba(96,51,39,0.7)');
		
		write(yData[i], relativePointTo(origin, -longestVal -5, yData[i]*VerticalUnity), 'rgba(96,51,39,0.7)');
	}
}

drawAxis();
//drawRectangle(nearPoint(origin, 20,0), 30, -80);
drawGraph(xData, yData);

var dataURL = document.getElementById("canvas").toDataURL();
document.getElementById('imgLink').href = dataURL;


/*
var dataURL = canvas.toDataURL();
document.getElementById('canvasImg').src = dataURL;
*/
/*ctx.beginPath();
ctx.moveTo(25,25);
ctx.lineTo(25,475);
ctx.lineTo(550,475);
ctx.stroke();*/