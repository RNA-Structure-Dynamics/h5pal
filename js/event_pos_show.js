$(document).ready(function () {
	var json_event_list_str='[{"y": 808, "x": 528}, {"y": 632, "x": 688}, {"y": 672, "x": 736}, {"y": 392, "x": 1168}, {"y": 280, "x": 1264}, {"y": 400, "x": 1280}, {"y": 320, "x": 1472}, {"y": 616, "x": 656}, {"y": 296, "x": 1392}, {"y": 280, "x": 1392}, {"y": 304, "x": 1344}, {"y": 304, "x": 1344}, {"y": 1136, "x": 1216}, {"y": 1072, "x": 1536}, {"y": 1048, "x": 1488}, {"y": 1104, "x": 1280}, {"y": 1088, "x": 1344}, {"y": 408, "x": 432}, {"y": 1296, "x": 704}, {"y": 1080, "x": 720}, {"y": 1152, "x": 672}, {"y": 1120, "x": 512}, {"y": 1136, "x": 480}, {"y": 1160, "x": 432}, {"y": 296, "x": 560}, {"y": 1120, "x": 1376}, {"y": 1048, "x": 1328}, {"y": 264, "x": 1296}, {"y": 264, "x": 1296}, {"y": 264, "x": 1296}, {"y": 320, "x": 768}, {"y": 376, "x": 1328}]'
	var json_event_list=JSON.parse(json_event_list_str);
	var game={
	init:function(){
		game.$canvas=$("#canvas");//back canvas,jquery object
		game.ctx = game.$canvas[0].getContext("2d");  
		game.ctx.strokeStyle="#ff0000";
		for(var i=0;i<json_event_list.length;i++){
			game.drawDiamond([json_event_list[i].x,json_event_list[i].y]);	
			game.ctx.strokeText(String(i),json_event_list[i].x,json_event_list[i].y);
		}
	},
	drawDiamond:function(gameCoordinate){
		[x_center,y_center]=gameCoordinate;
		game.ctx.beginPath();
		game.ctx.moveTo(x_center+16,y_center);
		game.ctx.lineTo(x_center,y_center-8);
		game.ctx.lineTo(x_center-16,y_center);
		game.ctx.lineTo(x_center,y_center+8);
		game.ctx.lineTo(x_center+16,y_center);
		game.ctx.stroke();
		}
	};

	
	game.init();
});


