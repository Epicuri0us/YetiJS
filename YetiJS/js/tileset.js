
/**
 * @classdesc The tileset contains a sprite and an array to map a number to a tile on the sprite.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {ySprite} pSprite - The path to an image file.
 */
var yTileSet = function(pSprite, pTileSize){
	var that = this;
	this.sprite = new Image();
	this.sprite.src = pSprite;
	this.tileSize = pTileSize;
	this.width = this.sprite.width / this.tileSize;
	this.height = this.sprite.height / this.tileSize;
	
	/**
	 * Returns a vector with the position of the tile with the given ID on the tileset in pixels
	 */
	that.prototype.getTilePositionByID = function(pID){
		return new yVector(pID % this.width * this.tileSize, Math.floor(pID / this.width) * this.tileSize);
	}
	
	/**
	 * Draws the tileset at a given position
	 */
	that.prototype.draw = function(pPosition){
		ctx.drawImage(this.sprite, pPosition.x, pPosition.y);
	}
};