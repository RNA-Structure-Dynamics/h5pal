$(document).ready(function () {
	var json_event_list=[{"y": 808, "x": 528}, {"y": 632, "x": 688}, {"y": 672, "x": 736}, {"y": 392, "x": 1168}, {"y": 280, "x": 1264}, {"y": 400, "x": 1280}, {"y": 320, "x": 1472}, {"y": 616, "x": 656}, {"y": 296, "x": 1392}, {"y": 280, "x": 1392}, {"y": 304, "x": 1344}, {"y": 304, "x": 1344}, {"y": 1136, "x": 1216}, {"y": 1072, "x": 1536}, {"y": 1048, "x": 1488}, {"y": 1104, "x": 1280}, {"y": 1088, "x": 1344}, {"y": 408, "x": 432}, {"y": 1296, "x": 704}, {"y": 1080, "x": 720}, {"y": 1152, "x": 672}, {"y": 1120, "x": 512}, {"y": 1136, "x": 480}, {"y": 1160, "x": 432}, {"y": 296, "x": 560}, {"y": 1120, "x": 1376}, {"y": 1048, "x": 1328}, {"y": 264, "x": 1296}, {"y": 264, "x": 1296}, {"y": 264, "x": 1296}, {"y": 320, "x": 768}, {"y": 376, "x": 1328}];
	var	imageLoader = {
	 loaded:true,
	 loadedImages:0,
	 totalImages:0,
	 load:function(url){
		 this.totalImages++;
		 this.loaded = false;
		 var image = new Image();
		 image.src = url;
		 image.onload = function(){
			imageLoader.loadedImages++;
			if(imageLoader.loadedImages === imageLoader.totalImages){
				imageLoader.loaded = true;
				}
			}
		 return image;
	 }
	}

	var protagonist={
			name:"protagonist",
			pixelWidth:22,
			pixelHeight:50,
			pixelOffsetX:0,
			pixelOffsetY:50,
			spriteImages:{
			down:0,
			left:3,
			up:6,
			right:9			
			},
			player_coordinate:{x:18,y:20,h:1},//[x,y,h]
			player_last_coordinate:{x:18,y:20,h:1},
			player_direction:"down",
			is_moving:false,
			player_current_frame:0,//[0,1,2]
			init:function(){
				this.spriteSheet = imageLoader.load('images/'+this.name+'.png');
			},
			update_pos:function(delta_x,delta_y,new_direction){
				this.player_last_coordinate={x:this.player_coordinate.x,y:this.player_coordinate.y,h:this.player_coordinate.h};
				this.is_moving=true;
				this.player_coordinate.x+=delta_x;
				this.player_coordinate.y+=delta_y;	
				this.player_direction=new_direction;		
				this.player_coordinate.h=1-this.player_coordinate.h;
				//setTimeout(protagonist.update_pos_frame,800);
			},
			update_pos_frame:function(){
				if(protagonist.is_moving){
					protagonist.player_current_frame=(protagonist.player_current_frame+1)%3;
					if(protagonist.player_current_frame==0){
						protagonist.is_moving=false;
					}
					else{
					//	setTimeout(protagonist.update_pos_frame,800);
						//		protagonist.update_pos_frame();
					}
				}
			},
			draw:function(){
				//use box to locate the sprite
				//clear the previous front convas context should be done before calling this function
				var currentOffset=this.spriteImages[this.player_direction]+this.player_current_frame;
				if(this.player_current_frame==1){
				[x_center,y_center]=game.toGameCoordinate(this.player_last_coordinate);
				}
				else{
				[x_center,y_center]=game.toGameCoordinate(this.player_coordinate);
				}
				//parameter:img,split_pos_x,split_pos_y,split_width;split_height;
				//pos_x_canvas,pos_y_canvas,scaling_x,scaling_y
				game.foreground_ctx.strokeRect(x_center-this.pixelWidth/2,y_center-this.pixelHeight+4,this.pixelWidth,this.pixelHeight);
				game.foreground_ctx.drawImage(this.spriteSheet,this.pixelWidth*currentOffset,0,this.pixelWidth,this.pixelHeight,
				x_center-this.pixelWidth/2,y_center-this.pixelHeight+4,this.pixelWidth,this.pixelHeight);
			}
		}
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
		protagonist.update_pos_frame();
		protagonist.draw();
		game.drawDiamond(game.toGameCoordinate([protagonist.player_coordinate.x,protagonist.player_coordinate.y,protagonist.player_coordinate.h]));
		if (game.running){
			//requestAnimationFrame(game.drawingLoop);
			setTimeout(game.drawingLoop,200);
		}
	},
	animationLoop:function(){
		for(var i=0;i<game.items.length;i++)
				game.items[i].animate();
	},
	processKeyboardEvent:function(ev){
		switch(ev.which){
			case 38://up
			if(protagonist.player_coordinate.h==0){
				protagonist.update_pos(0,-1,"up");
			
			}
			else{
				protagonist.update_pos(1,0,"up");
			}
			break;
			case 40://key_board_down
			if(protagonist.player_coordinate.h==0){
				protagonist.update_pos(-1,0,"down");
			}
			else{
				protagonist.update_pos(0,1,"down");
			}
			break;
			case 39://right
			if(protagonist.player_coordinate.h==1){
				protagonist.update_pos(1,1,"right");
			}
			else{
				protagonist.update_pos(0,0,"right");				
			}
			break;
			case 37://left
			if(protagonist.player_coordinate.h==0){
				protagonist.update_pos(-1,-1,"left");
			}
			else{
				protagonist.update_pos(0,0,"left");
			}
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
		protagonist.init();
	},
	toGameCoordinate:function(xyHPos){
		if (xyHPos.x){
			tmp=xyHPos;
			[x,y,h]=[tmp.x,tmp.y,tmp.h];
		}
		else{
		[x,y,h]=xyHPos;
		}
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


