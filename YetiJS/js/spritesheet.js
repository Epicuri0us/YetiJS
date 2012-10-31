
/**
 * @classdesc The spritesheet contains a sprite with different states of a sprite and is used by the animation class.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {Integer} pCols - The number of columns of the spritesheet.
 * @param {Integer} pRows - The number of rows of the spritesheet.
 * @param {String} pSprite - The path to an image file.
 */
var ySpriteSheet = function(pCols, pRows, pSprite){
	var that = this;
	this.rows = pRows;
	this.cols = pCols;
	this.sprite = new Image();
	this.sprite.src = pSprite;
	
};
