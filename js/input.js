$(document).ready(function () {
	var json_event_list=[{"y": 808, "x": 528}, {"y": 632, "x": 688}, {"y": 672, "x": 736}, {"y": 392, "x": 1168}, {"y": 280, "x": 1264}, {"y": 400, "x": 1280}, {"y": 320, "x": 1472}, {"y": 616, "x": 656}, {"y": 296, "x": 1392}, {"y": 280, "x": 1392}, {"y": 304, "x": 1344}, {"y": 304, "x": 1344}, {"y": 1136, "x": 1216}, {"y": 1072, "x": 1536}, {"y": 1048, "x": 1488}, {"y": 1104, "x": 1280}, {"y": 1088, "x": 1344}, {"y": 408, "x": 432}, {"y": 1296, "x": 704}, {"y": 1080, "x": 720}, {"y": 1152, "x": 672}, {"y": 1120, "x": 512}, {"y": 1136, "x": 480}, {"y": 1160, "x": 432}, {"y": 296, "x": 560}, {"y": 1120, "x": 1376}, {"y": 1048, "x": 1328}, {"y": 264, "x": 1296}, {"y": 264, "x": 1296}, {"y": 264, "x": 1296}, {"y": 320, "x": 768}, {"y": 376, "x": 1328}];
	var barrierList=new Int16Array([1701, 1702, 1703, 1827, 1828, 1830, 1832, 1833, 1873, 1874, 1875, 1953, 1954, 1955, 1961, 1962, 1963, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2079, 2080, 2082, 2091, 2092, 2093, 2125, 2126, 2130, 2131, 2132, 2133, 2134, 2135, 2205, 2206, 2222, 2223, 2251, 2252, 2254, 2260, 2264, 2265, 2331, 2332, 2351, 2352, 2353, 2377, 2378, 2382, 2394, 2395, 2457, 2458, 2478, 2479, 2480, 2481, 2482, 2483, 2503, 2504, 2508, 2523, 2524, 2525, 2583, 2584, 2585, 2595, 2599, 2608, 2609, 2610, 2612, 2613, 2629, 2630, 2631, 2650, 2651, 2652, 2653, 2654, 2655, 2710, 2711, 2712, 2725, 2741, 2742, 2758, 2759, 2777, 2780, 2781, 2782, 2783, 2784, 2785, 2840, 2841, 2851, 2852, 2853, 2854, 2855, 2867, 2868, 2888, 2889, 2899, 2909, 2910, 2911, 2912, 2970, 2971, 2980, 2981, 2982, 2993, 2994, 3015, 3016, 3025, 3026, 3036, 3037, 3038, 3097, 3098, 3106, 3119, 3120, 3144, 3145, 3147, 3148, 3149, 3151, 3152, 3157, 3158, 3163, 3164, 3226, 3227, 3229, 3230, 3231, 3245, 3246, 3274, 3278, 3279, 3280, 3281, 3284, 3289, 3290, 3356, 3360, 3361, 3369, 3370, 3371, 3372, 3408, 3409, 3410, 3411, 3415, 3416, 3490, 3491, 3495, 3496, 3497, 3498, 3538, 3539, 3540, 3541, 3542, 3620, 3621, 3622, 3623, 3624, 3668, 3750, 4521, 4523, 4647, 4648, 4652, 4653, 4773, 4774, 4777, 4778, 4779, 4782, 4783, 4899, 4900, 4903, 4904, 4906, 4907, 4908, 4909, 4912, 4913, 4947, 5025, 5026, 5029, 5030, 5031, 5032, 5033, 5035, 5036, 5037, 5038, 5039, 5042, 5043, 5073, 5074, 5075, 5076, 5077, 5151, 5152, 5155, 5156, 5157, 5158, 5159, 5160, 5161, 5162, 5163, 5164, 5165, 5166, 5167, 5168, 5169, 5172, 5173, 5199, 5200, 5202, 5206, 5207, 5277, 5278, 5281, 5282, 5285, 5286, 5287, 5288, 5289, 5290, 5291, 5292, 5293, 5294, 5295, 5298, 5299, 5302, 5303, 5325, 5326, 5336, 5337, 5403, 5404, 5407, 5408, 5411, 5412, 5413, 5414, 5415, 5416, 5417, 5418, 5419, 5420, 5422, 5424, 5425, 5428, 5429, 5431, 5432, 5433, 5451, 5452, 5466, 5467, 5531, 5533, 5534, 5537, 5538, 5540, 5541, 5542, 5546, 5554, 5555, 5556, 5557, 5558, 5559, 5560, 5561, 5562, 5577, 5578, 5579, 5595, 5596, 5597, 5659, 5660, 5663, 5664, 5666, 5684, 5685, 5686, 5687, 5688, 5703, 5704, 5705, 5706, 5722, 5723, 5724, 5725, 5726, 5727, 5787, 5788, 5789, 5790, 5791, 5792, 5809, 5811, 5812, 5813, 5814, 5815, 5830, 5831, 5832, 5852, 5853, 5854, 5855, 5856, 5857, 5916, 5917, 5918, 5919, 5920, 5938, 5939, 5940, 5941, 5942, 5943, 5944, 5945, 5960, 5961, 5974, 5982, 5983, 5984, 5985, 5986, 6046, 6047, 6048, 6065, 6066, 6067, 6068, 6069, 6070, 6071, 6072, 6090, 6091, 6103, 6104, 6105, 6111, 6112, 6175, 6176, 6193, 6194, 6195, 6196, 6197, 6198, 6217, 6218, 6230, 6231, 6232, 6233, 6234, 6235, 6237, 6238, 6302, 6303, 6320, 6321, 6322, 6323, 6324, 6346, 6347, 6349, 6350, 6351, 6360, 6361, 6362, 6363, 6364, 6432, 6433, 6435, 6436, 6437, 6447, 6448, 6449, 6450, 6476, 6480, 6481, 6489, 6490, 6562, 6566, 6567, 6575, 6576, 6610, 6611, 6615, 6616, 6696, 6697, 6701, 6702, 6740, 6741, 6742, 6826, 6827, 6828, 7763, 7764, 7765, 7889, 7890, 7892, 7894, 7895, 8015, 8016, 8024, 8025, 8105, 8141, 8142, 8154, 8155, 8231, 8232, 8233, 8234, 8235, 8267, 8268, 8284, 8285, 8357, 8358, 8362, 8364, 8365, 8393, 8394, 8411, 8412, 8413, 8414, 8415, 8483, 8484, 8485, 8486, 8487, 8491, 8492, 8493, 8494, 8495, 8519, 8520, 8521, 8540, 8541, 8542, 8543, 8544, 8545, 8609, 8610, 8611, 8612, 8613, 8614, 8620, 8621, 8622, 8624, 8625, 8648, 8649, 8659, 8660, 8661, 8670, 8674, 8675, 8735, 8736, 8740, 8751, 8752, 8753, 8754, 8755, 8778, 8779, 8786, 8787, 8788, 8789, 8790, 8801, 8802, 8861, 8862, 8863, 8864, 8880, 8881, 8882, 8884, 8885, 8907, 8908, 8914, 8916, 8918, 8927, 8928, 8987, 8988, 8989, 8990, 9012, 9013, 9014, 9015, 9034, 9035, 9039, 9053, 9054, 9113, 9114, 9116, 9117, 9129, 9130, 9131, 9142, 9143, 9144, 9164, 9165, 9166, 9168, 9169, 9179, 9180, 9239, 9240, 9242, 9246, 9247, 9256, 9257, 9258, 9259, 9260, 9269, 9270, 9298, 9299, 9305, 9306, 9368, 9369, 9376, 9386, 9395, 9396, 9428, 9429, 9431, 9432, 9498, 9499, 9507, 9521, 9522, 9558, 9628, 9629, 9636, 9637, 9645, 9646, 9647, 9648, 9758, 9759, 9766, 9767, 9771, 9772, 9773, 9774, 9888, 9889, 9896, 9897, 9898, 9899, 9900, 10018, 10019, 10026, 10027, 10148, 10149, 10156, 10157, 10278, 10279, 10408, 10409]);	
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
			player_coordinate:{x:41,y:18,h:0},//[x,y,h]
			player_last_coordinate:{x:41,y:18,h:0},
			player_direction:"down",
			is_moving:false,
			player_current_frame:0,//[0,1,2]
			init:function(){
				this.spriteSheet = imageLoader.load('images/'+this.name+'.png');
			},
			update_pos:function(delta_x,delta_y,new_direction){
				if(barrierList.indexOf((this.player_coordinate.y+delta_y)*128+(this.player_coordinate.x+delta_x)*2+1-this.player_coordinate.h)>-1)
					return;
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
				//game.foreground_ctx.globalCompositeOperation='destination-out';
				//game.drawDiamond([x_center,y_center],true);
				//game.foreground_ctx.fill();
				//game.drawDiamond(game.toGameCoordinate(game.getLeftCoordinate(this)),true);
				//game.foreground_ctx.fill();
				//game.foreground_ctx.globalCompositeOperation='source-over';
			},
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
	[x_c,y_c]=game.toGameCoordinate(protagonist.player_coordinate,true);
	if(this.offsetX!=x_c-160){
		this.refreshBackground=true;
	this.offsetX=x_c-160;
	this.offsetY=y_c-100;
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
		game.drawDiamond(game.toGameCoordinate(protagonist.player_coordinate));
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
		game.foreground_ctx.fillStyle='rgba(0,0,0,1)';//100%opacity
		protagonist.init();
	},
	toGameCoordinate:function(xyHPos,isAbsolute){
		if (xyHPos.x){
			tmp=xyHPos;
			[x,y,h]=[tmp.x,tmp.y,tmp.h];
		}
		else{
		[x,y,h]=xyHPos;
		}
		new_offsetX=game.offsetX;
		new_offsetY=game.offsetY;
		if(isAbsolute){
		new_offsetX=0;
		new_offsetY=0;
		}
		else{
			new_offsetX=game.offsetX;
			new_offsetY=game.offsetY;
		}
		if(h==0){
			x_center=x*32+16-new_offsetX;
			y_center=y*16+8-new_offsetY;
		}
		else{
			x_center=(x+1)*32-new_offsetX;
			y_center=(y+1)*16-new_offsetY;
		}
		return [x_center,y_center];
	},
	getLeftCoordinate:function(object_pointer){
		if(object_pointer.player_coordinate.h==0){
				return [object_pointer.player_coordinate.x-1,object_pointer.player_coordinate.y-1,1-object_pointer.player_coordinate.h];
			}
			else{
				return [object_pointer.player_coordinate.x,object_pointer.player_coordinate.y,1-object_pointer.player_coordinate.h];
			}
	},
	drawDiamond:function(gameCoordinate,isClip){
		if(isClip){
		[x_center,y_center]=gameCoordinate;
		game.ctx.beginPath();
		game.foreground_ctx.moveTo(x_center+16,y_center);
		game.foreground_ctx.lineTo(x_center,y_center-8);
		game.foreground_ctx.lineTo(x_center-16,y_center);
		game.foreground_ctx.lineTo(x_center,y_center+8);
		game.foreground_ctx.closePath();
		}
		else{
		[x_center,y_center]=gameCoordinate;
		game.foreground_ctx.beginPath();
		game.foreground_ctx.moveTo(x_center+16,y_center);
		game.foreground_ctx.lineTo(x_center,y_center-8);
		game.foreground_ctx.lineTo(x_center-16,y_center);
		game.foreground_ctx.lineTo(x_center,y_center+8);
		game.foreground_ctx.closePath();
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


