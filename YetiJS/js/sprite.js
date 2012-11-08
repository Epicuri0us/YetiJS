
/**
 * @classdesc The sprite class contains an Image-element.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {String} pSprite - The path to an image file.
 * @property {Image} sprite - The image.
 */
function ySprite(pSprite){
	this.sprite = new Image();
	this.sprite.src = pSprite;
};