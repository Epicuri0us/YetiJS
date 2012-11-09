
/**
 * @class ySprite
 * @augments Class
 * @classdesc The sprite class contains an Image-element.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {String} pSprite - The path to an image file.
 * @property {Image} sprite - The image.
 */
var ySprite = Class.extend({
	init: function(pSprite){
		this.sprite = new Image();
		this.sprite.src = pSprite;
	}
});