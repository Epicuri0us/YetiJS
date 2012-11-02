
/**
 * @classdesc The tileset contains a sprite and an array to map a number to a tile on the sprite.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {String} pSprite - The path to an image file.
 * @param {Integer} pTileSize - The tilesize in pixels.
 * @property {Integer} tileSize - The tilesize in pixels.
 * @property {Image} sprite - The image of the tileset.
 * @property {Integer} width - The width of the tileset in tiles.
 * @property {Integer} height - The height of the tileset in tiles.
 */
var yTileSet = function(pSprite, pTileSize){
	var that = this;
	that.sprite = new Image();
	that.sprite.src = pSprite;
	that.tileSize = pTileSize;
	that.width = that.sprite.width / that.tileSize;
	that.height = that.sprite.height / that.tileSize;
	
	/**
	 * Returns a vector with the position of the tile with the given ID on the tileset in pixels
	 * @param {Integer} pID - The ID of the tile.
	 */
	yTileSet.prototype.getTilePositionByID = function(pID){
		return new yVector(pID % this.width * this.tileSize, Math.floor(pID / this.width) * this.tileSize);
	}
	
	/**
	 * Draws a single tile at a given position
	 * @param {Integer} pID - The ID of the tile.
	 * @param {yVector} pPosition - The position to draw the tile.
	 * @param {yCamera} pCamera - The camera.
	 */
	ySpriteSheet.prototype.drawTile = function(pID, pPosition, pCamera){
		var tilePosition = this.getTilePositionByID(pID);
		ctx.drawImage(this.sprite, tilePosition.x, tilePosition.y, this.tileSize, this.tileSize, pCamera.position.x + pPosition.x, pCamera.position.y + pPosition.y, this.tileSize, this.tileSize);
	}
	
	/**
	 * Draws the tileset at a given position for debugging purposes
	 * @param {yVector} pPosition - The position to draw the sprite.
	 */
	yTileSet.prototype.draw = function(pPosition){
		ctx.drawImage(this.sprite, pPosition.x, pPosition.y);
	}
};