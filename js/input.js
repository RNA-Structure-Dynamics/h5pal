$(document).ready(function () {
	var game={
	animationTimeout:100,
	viewportWidth:0,
	viewportHeight:0,
	gridsize:24,
	panningThreshold:60, // Distance from edge of canvas at which panning starts
	panningSpeed:10,
	refreshBackground:true,
	running:true,
	items:[],
	mapHeight:2064,
	mapWidth:2064,
	offsetX:200,
	offsetY:200,
	mapBorderHiddenOffset:16,
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
			$("#canvas").css("background-position","-"+String(game.offsetX)+"px "+"-"+String(game.offsetY)+"px")
			//console.log(game.offsetX,game.offsetY);
			game.refreshBackground = false;
		}
		if (game.running){
			requestAnimationFrame(game.drawingLoop);
		}
	},
	animationLoop:function(){
		for(var i=0;i<game.items.length;i++)
				game.items[i].animate();
	},
	init:function(){
		game.$canvas=$("#canvas");//back canvas,jquery object
		game.ctx = game.$canvas[0].getContext("2d");  
		game.foreground_canvas=$("#foreground_canvas")[0];
		game.foreground_ctx=game.foreground_canvas.getContext("2d");
		game.viewportWidth=game.$canvas[0].width;
		game.viewportHeight=game.$canvas[0].height;
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
					//console.log("mousedown");
					ev.preventDefault();
				}
				return false;
			});
			$foreground_canvas.mouseup(function(ev) {
				return false;
			});
		}
		
	}

	
	game.init();
	mouse.init();
	game.drawingLoop();
	//game.animationLoop();
	//game.animationInterval = setInterval(game.animationLoop,game.animationTimeout);
});


