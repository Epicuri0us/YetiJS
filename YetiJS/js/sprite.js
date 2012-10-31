
/**
 * @classdesc The sprite class contains an Image-element.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {String} pSprite - The path to an image file.
 * @property {Image} sprite - The image.
 */
var ySprite = function(pSprite){
	var that = this;
	
	that.sprite = new Image();
	that.sprite.src = pSprite;
};