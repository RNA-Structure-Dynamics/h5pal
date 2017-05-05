$(document).ready(function () {
	var json_event_list_str='[{"y": 808, "x": 528}, {"y": 632, "x": 688}, {"y": 672, "x": 736}, {"y": 392, "x": 1168}, {"y": 280, "x": 1264}, {"y": 400, "x": 1280}, {"y": 320, "x": 1472}, {"y": 616, "x": 656}, {"y": 296, "x": 1392}, {"y": 280, "x": 1392}, {"y": 304, "x": 1344}, {"y": 304, "x": 1344}, {"y": 1136, "x": 1216}, {"y": 1072, "x": 1536}, {"y": 1048, "x": 1488}, {"y": 1104, "x": 1280}, {"y": 1088, "x": 1344}, {"y": 408, "x": 432}, {"y": 1296, "x": 704}, {"y": 1080, "x": 720}, {"y": 1152, "x": 672}, {"y": 1120, "x": 512}, {"y": 1136, "x": 480}, {"y": 1160, "x": 432}, {"y": 296, "x": 560}, {"y": 1120, "x": 1376}, {"y": 1048, "x": 1328}, {"y": 264, "x": 1296}, {"y": 264, "x": 1296}, {"y": 264, "x": 1296}, {"y": 320, "x": 768}, {"y": 376, "x": 1328}]'
	var json_event_list=JSON.parse(json_event_list_str);
	var game={
	animationTimeout:100,
	viewportWidth:0,
	viewportHeight:0,
	gridsize:24,
	panningThreshold:20, // Distance from edge of canvas at which panning starts
	panningSpeed:1,
	refreshBackground:true,
	running:true,
	items:[],
	mapHeight:2064,
	mapWidth:2064,
	offsetX:300,
	offsetY:200,
	player_coordinate:{x:18,y:20,h:1},//[x,y,h]
	mapBorderHiddenOffset:0,
	handlePanning:function(){
		if(!mouse.insideCanvas)return
		 if(mouse.x<=game.panningThreshold){
		if (game.offsetX>=(game.panningSpeed+game.mapBorderHiddenOffset)){
		 game.refreshBackground = true;
		 game.offsetX -= game.panningSpeed;
		 }
		 } else if (mouse.x>= game.viewportWidth - game.panningThreshold){
		 if (game.offsetX + game.viewportWidth+ game.panningSpeed+game.mapBorderHiddenOffset <= game.mapWidth){
		 game.refreshBackground = true;
		 game.offsetX += game.panningSpeed;
		 }
		 }

		 if(mouse.y<=game.panningThreshold){
		 if (game.offsetY>=(game.panningSpeed+game.mapBorderHiddenOffset)){
		 game.refreshBackground = true;
		 game.offsetY -= game.panningSpeed;
		 }
		 } else if (mouse.y>= game.viewportHeight - game.panningThreshold){
		 if (game.offsetY + game.viewportHeight + game.panningSpeed+game.mapBorderHiddenOffset <= game.mapHeight){
		 game.refreshBackground = true;
		 game.offsetY += game.panningSpeed;
		 }
	}
    },
	drawingLoop:function(){
		game.handlePanning();
		if (game.refreshBackground){
			$("#canvas").css("background-position","-"+String(game.offsetX)+"px "+"-"+String(game.offsetY)+"px");
			//console.log(game.offsetX,game.offsetY);
			game.refreshBackground = false;
		}
		game.foreground_ctx.clearRect(0,0,game.viewportWidth,game.viewportHeight);
		game.drawDiamond(game.toGameCoordinate([game.player_coordinate.x,game.player_coordinate.y,game.player_coordinate.h]));
		if (game.running){
			requestAnimationFrame(game.drawingLoop);
		}
	},
	animationLoop:function(){
		for(var i=0;i<game.items.length;i++)
				game.items[i].animate();
	},
	processKeyboardEvent:function(ev){
		switch(ev.which){
			case 38://up
			if(game.player_coordinate.h==0){
				game.player_coordinate.x-=1;
				game.player_coordinate.y-=1;
			}
			game.player_coordinate.h=1-game.player_coordinate.h;
			break;
			case 40://down
			if(game.player_coordinate.h==1){
				game.player_coordinate.x+=1;
				game.player_coordinate.y+=1;
			}
			game.player_coordinate.h=1-game.player_coordinate.h;
			break;
			case 37://left
			if(game.player_coordinate.h==0){
				game.player_coordinate.x-=1;
			}
			else{
				game.player_coordinate.y+=1;
			}
			game.player_coordinate.h=1-game.player_coordinate.h;
			break;
			case 39://right
			if(game.player_coordinate.h==0){
				game.player_coordinate.y-=1;
			}
			else{
				game.player_coordinate.x+=1;
			}
			game.player_coordinate.h=1-game.player_coordinate.h;
			break;

			default:break;
		}
	},
	init:function(){
		game.$canvas=$("#canvas");//back canvas,jquery object
		game.ctx = game.$canvas[0].getContext("2d");  
		game.foreground_canvas=$("#foreground_canvas")[0];
		game.foreground_ctx=game.foreground_canvas.getContext("2d");
		game.viewportWidth=game.$canvas[0].width;
		game.viewportHeight=game.$canvas[0].height;
		game.foreground_ctx.strokeStyle="#00ff00";
		game.ctx.strokeStyle="#ff0000";
		
	},
	toGameCoordinate:function(xyHPos){
		[x,y,h]=xyHPos;
		if(h==0){
			x_center=x*32+16-game.offsetX;
			y_center=y*16+8-game.offsetY;
		}
		else{
			x_center=(x+1)*32-game.offsetX;
			y_center=(y+1)*16-game.offsetY;
		}
		return [x_center,y_center];
	},
	drawDiamond:function(gameCoordinate,isBackground){
		if(isBackground){
		[x_center,y_center]=gameCoordinate;
		game.ctx.beginPath();
		game.ctx.moveTo(x_center+16,y_center);
		game.ctx.lineTo(x_center,y_center-8);
		game.ctx.lineTo(x_center-16,y_center);
		game.ctx.lineTo(x_center,y_center+8);
		game.ctx.lineTo(x_center+16,y_center);
		game.ctx.stroke();
		}
		else{
		[x_center,y_center]=gameCoordinate;
		game.foreground_ctx.beginPath();
		game.foreground_ctx.moveTo(x_center+16,y_center);
		game.foreground_ctx.lineTo(x_center,y_center-8);
		game.foreground_ctx.lineTo(x_center-16,y_center);
		game.foreground_ctx.lineTo(x_center,y_center+8);
		game.foreground_ctx.lineTo(x_center+16,y_center);
		game.foreground_ctx.stroke();
		}
	},
	toXYHCoordinate:function(pos_x,pos_y){
		x = Math.round(pos_x / 32);
		y = Math.round(pos_y / 16);
		h = 1;

	   xr = pos_x % 32;
	   yr = pos_y % 16;

	   if (xr + yr * 2 >= 16)
	   {
		  if (xr + yr * 2 >= 48)
		  {
			 x++;
			 y++;
		  }
		  else if (32 - xr + yr * 2 < 16)
		  {
			 x++;
		  }
		  else if (32 - xr + yr * 2 < 48)
		  {
			 h = 0;
		  }
		  else
		  {
			 y++;
		  }
	   }
	   return [x,y,h];
		
	}
	
	}
	
	var mouse={
		x:0,
		y:0,
		insideCanvas:false,

		init:function(){
			var $foreground_canvas=$("#foreground_canvas");
			$foreground_canvas.mousemove(function(ev){
				var offset = $foreground_canvas.offset();
				mouse.x = ev.pageX - offset.left;
				mouse.y = ev.pageY - offset.top;
			//	console.log(mouse.x,mouse.y);
				if (mouse.buttonPressed){
					if ((Math.abs(mouse.dragX - mouse.x) > 4 || Math.abs(mouse.dragY - mouse.y)
						> 4)){
						mouse.dragSelect = true
					}
				} else {
				mouse.dragSelect = false;
				}
			});
			$foreground_canvas.mouseleave(function(ev) {
				mouse.insideCanvas = false;
			});
			$foreground_canvas.mouseenter(function(ev) {
				mouse.insideCanvas = true;
			});
			
			$foreground_canvas.mousedown(function(ev) {
				if(ev.which == 1){
					ev.preventDefault();
				}
				return false;
			});
			$foreground_canvas.mouseup(function(ev) {
				return false;
			});
			$(document).keydown(function(ev){
				game.processKeyboardEvent(ev);
			});
		}
		
	}

	
	game.init();
	mouse.init();
	game.drawingLoop();
	//game.animationLoop();
	//game.animationInterval = setInterval(game.animationLoop,game.animationTimeout);
});


