
/**
 * @classdesc The sprite class contains an Image-element.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {String} pSprite - The path to an image file.
 * @property {Image} sprite - The image; Use sprite.src to set a new path.
 */
var ySprite = function(pSprite){
	var that = this;
	
	this.sprite = new Image();
	this.sprite.src = pSprite;
};