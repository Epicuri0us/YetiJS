
/**
 * @class ySpriteSheet
 * @augments Class
 * @classdesc The spritesheet contains a sprite with different states of a sprite and is used by the animation class.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {Integer} pCols - The number of columns of the spritesheet.
 * @param {Integer} pRows - The number of rows of the spritesheet.
 * @param {String} pSprite - The path to an image file.
 * @property {Integer} cols - The number of columns of the spritesheet.
 * @property {Integer} rows - The number of rows of the spritesheet.
 * @property {String} sprite - The path to an image file.
 */
var ySpriteSheet = Class.extend({
	init: function(pCols, pRows, pSprite){
		this.cols = pCols;
		this.rows = pRows;
		this.sprite = new Image();
		this.sprite.src = pSprite;
		this.frameWidth = this.sprite.width / this.cols;
		this.frameHeight = this.sprite.height / this.rows;
	},
	
	/**
	 * Returns a vector with the position of the frame with the given ID on the spritesheet in pixels.
	 * @memberof ySpriteSheet
	 * @param {Integer} pID - The ID of the tile.
	 */
	getFramePositionByID: function(pID){
		return new yVector(pID % this.cols * this.frameWidth, Math.floor(pID / this.cols) * this.frameHeight);
	},
	
	/**
	 * Draws a single frame at a given position.
	 * @memberof ySpriteSheet
	 * @param {Integer} pID - The ID of the frame.
	 * @param {yVector} pPosition - The position to draw the frame.
	 * @param {yCamera} pCamera - The camera.
	 */
	drawFrame: function(pID, pPosition, pCamera){
		var framePosition = this.getFramePositionByID(pID);
		ctx.drawImage(this.sprite, framePosition.x, framePosition.y, this.frameWidth, this.frameHeight, pCamera.position.x + pPosition.x, pCamera.position.y + pPosition.y, this.frameWidth, this.frameHeight);
	}
});
