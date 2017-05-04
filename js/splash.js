var imageLoader
$(document).ready(function () {
	var ctx_front=$("#foreground_canvas")[0].getContext("2d");
	imageLoader = {
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
	var splash={
		loopTimeout:300,
		//splash background moves up slowly
		loopIncreasePixel:2,//total pixel 200
		loopCurrentPixel:200,
		
		//splash title of the game appears from partial to whole
		splash_title:undefined,//image
		splash_title_increasePixel:2,
		splash_title_currentPixel:0,
		
		//splash_elements fly from right to left
		splash_element:{
			name:"crane",
			pixelWidth:30,
			pixelHeight:32,
			pixelOffsetX:0,
			pixelOffsetY:32,
			spriteImages:[
			{name:"flying",count:8},
			],
			init:function(){
				this.spriteSheet = imageLoader.load('images/'+this.name+'.png');
				this.spriteArray=new Array(9);
				for(var i=0;i<9;i++){
					this.spriteArray[i]=[Math.round(320+200*Math.random()),Math.round(30+150*Math.random()),Math.round(7*Math.random())];
				}
				
			}
		},
		init:function(){
			setTimeout(this.loop,this.loopTimeout);
			this.splash_title=imageLoader.load('splash_title.png');
			this.splash_element.init();
			
		},
		loop:function(){
			//console.log('loop',splash.loopCurrentPixel);
			if(imageLoader.loaded){
			if(splash.loopCurrentPixel>=0){splash.loopCurrentPixel-=splash.loopIncreasePixel;}
				//parameter:img,split_pos_x,split_pos_y,split_width;split_height;
				//pos_x_canvas,pos_y_canvas,scaling_x,scaling_y
		ctx_front.clearRect(0,0,320,200);
		ctx_front.drawImage(splash.splash_title,0,0,splash.splash_title.width,splash.splash_title_currentPixel,
			255,5,splash.splash_title.width,splash.splash_title_currentPixel);
		for(var i=0;i<9;i++){
				splash.splash_element.spriteArray[i][2]=(splash.splash_element.spriteArray[i][2]+1)%8;
				ctx_front.drawImage(splash.splash_element.spriteSheet,splash.splash_element.spriteArray[i][2]*30,0,30,32,
				splash.splash_element.spriteArray[i][0],splash.splash_element.spriteArray[i][1],30,32);
				splash.splash_element.spriteArray[i][0]-=Math.round(2+Math.random());
				splash.splash_element.spriteArray[i][1]-=Math.round(2+Math.random());
				if(splash.splash_element.spriteArray[i][0]<0 || splash.splash_element.spriteArray[i][1]<0)
					splash.splash_element.spriteArray[i][0]=320;
				if(splash.splash_element.spriteArray[i][1]<0)
					splash.splash_element.spriteArray[i][1]=Math.round(30+150*Math.random());
			}
				if(splash.splash_title_currentPixel<=splash.splash_title.height){
					
					splash.splash_title_currentPixel+=splash.splash_title_increasePixel;
				}
				$("#canvas").css('background-position',"0px -"+String(splash.loopCurrentPixel)+"px")
				setTimeout(splash.loop,splash.loopTimeout);	
			}				
		}
	}

	splash.init();

});


