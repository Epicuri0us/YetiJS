
/**
 * @class yTileSet
 * @augments Class
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
var yTileSet = Class.extend({
	init: function(pSprite, pTileSize){
		this.sprite = pSprite;
		this.tileSize = pTileSize;
		this.width = this.sprite.width / this.tileSize;
		this.height = this.sprite.height / this.tileSize;
	},
	
	/**
	 * Returns a vector with the position of the tile with the given ID on the tileset in pixels.
	 * @memberof yTileSet
	 * @param {Integer} pID - The ID of the tile.
	 */
	getTilePositionByID: function(pID){
		return new yVector(pID % this.width * this.tileSize, Math.floor(pID / this.width) * this.tileSize);
	},
	
	/**
	 * Draws a single tile at a given position.
	 * @memberof yTileSet
	 * @param {Integer} pID - The ID of the tile.
	 * @param {yVector} pPosition - The position to draw the tile.
	 * @param {yCamera} pCamera - The camera.
	 */
	drawTile: function(pID, pPosition, pCamera){
		var tilePosition = this.getTilePositionByID(pID);
		ctx.drawImage(this.sprite, tilePosition.x, tilePosition.y, this.tileSize, this.tileSize, (pCamera.position.x + pPosition.x)*pCamera.scale, (pCamera.position.y + pPosition.y)*pCamera.scale, this.tileSize*pCamera.scale, this.tileSize*pCamera.scale);
	},
	
	/**
	 * Draws the tileset at a given position for debugging purposes.
	 * @memberof yTileSet
	 * @param {yVector} pPosition - The position to draw the sprite.
	 */
	draw: function(pPosition){
		ctx.drawImage(this.sprite, pPosition.x, pPosition.y);
	}
});