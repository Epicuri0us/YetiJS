
/**
 * @classdesc The camera provides functionality to handle different viewports, scrolling, zooming and so forth.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @property {yVector} position - The position of the camera.
 * @param {yVector} pPosition - The position of the camera.
 */
var yCamera = function(pPosition){
	var that = this;
	that.position = pPosition;
	
	var height = canvas.height/(canvas.width/16*9);
	ctx.scale(1, height);
	
	// var width = (canvas.height/9*16);
	// ctx.scale(1, 1);
	
	// var classes = [];
	// for(var i in window){
		// if (window.hasOwnProperty(i) && typeof window[i] === 'function'){
			// if(!i.constructor.toString().match("/\[native code\]/") && i.match("^y")){
				// classes.push(i);
			// }
		// }
	// }
	// for(var o = 0; o < classes.length; ){
		// o++;
		// if(o != 5 && o != 4 && o != 3){
			// var classs = classes[i];
		// var entity = new window[classes[o]];
		// console.log(classes[o]);
		// }
		
		//entity = classes[i].prototype;
		// for(var m in entity){
			// console.log(window[i]+ ": " +m);
			// if (typeof entity[m] != "function") {
		        // console.log(window[classes[i]]+ ": " +m);
		    // }
		// }
	// }
	
	
	//ctx.translate(0, 0);
	
	
	
	/**
	 * Updates camera
	 */
	yCamera.prototype.update = function(){
		var that = this;
	}
};