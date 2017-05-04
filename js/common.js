function loadItem(name){
	 if(name)
		var item = this.list[name];
	 else
		var item = this;
	 // if the item sprite array has already been loaded then no need to do it again
	 if(item.spriteArray){
		return;
	 }
	 item.spriteSheet = imageLoader.load('images/'+this.name+'.png');
	 item.spriteArray = [];
	 item.spriteCount = 0;

	 for (var i=0; i < item.spriteImages.length; i++){
		var constructImageCount = item.spriteImages[i].count;
		var constructDirectionCount = item.spriteImages[i].directions;
		if (constructDirectionCount){
			 for (var j=0; j < constructDirectionCount; j++) {
			 var constructImageName = item.spriteImages[i].name +"-"+j;
			 item.spriteArray[constructImageName] = {
			 name:constructImageName,
			 count:constructImageCount,
			 offset:item.spriteCount
			 };
			 item.spriteCount += constructImageCount;
			 };
		 }
		 else {
			var constructImageName = item.spriteImages[i].name;
			item.spriteArray[constructImageName] = {
			name:constructImageName,
			count:constructImageCount,
			offset:item.spriteCount//handle two dimensional sprite?
			};
			item.spriteCount += constructImageCount;
		 }
	 }
}