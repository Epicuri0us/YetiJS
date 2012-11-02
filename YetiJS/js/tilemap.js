
/**
 * @classdesc The tilemap contains an array with tile positions, a tileset to load the tiles from and functionality to draw them.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {yTileSet} pTileSet - The tileset used on the map.
 * @param {Integer} pLayers - The number of layers of the map.
 * @param {Integer} pWidth - The width of the map.
 * @param {Integer} pHeight - The height of the map.
 * @property {yTileSet} tileSet - The tileset used on the map.
 * @property {Integer[]} map - The map array.
 * @property {Integer} width - The width of the map.
 * @property {Integer} height - The height of the map.
 */
var yTileMap = function(pTileSet, pLayers, pWidth, pHeight){
	var that = this;
	that.tileSet = pTileSet;
	that.map = [];
	that.width = pWidth;
	that.height = pHeight;
	
	/**
	 * Initializes an empty map-array
	 */
	for(var l = 0; l < pLayers; l++){
		this.map[l] = [];
		for(var y = 0; y < this.height; y++){
			this.map[l][y] = [];
			for(var x = 0; x < this.width; x++){
				this.map[l][y][x] = 0;
			}
		}
	}
	
	/**
	 * Draws the whole map depending on camera position
	 */
	that.prototype.draw = function(){
		for(var l = 0; l < pLayers; l++){
			for(var y = 0; y < this.height; y++){
				for(var x = 0; x < this.width; x++){
					var tileSet = this.tileSet;
					var tilePosition = tileSet.getTilePositionByID(this.map[l][y][x]);
					ctx.drawImage(tileSet.sprite, tilePosition.x, tilePosition.y, tileSet.tileSize, tileSet.tileSize, camera.position.x + x*tileSet.tileSize, camera.position.y + y*tileSet.tileSize, tileSet.tileSize, tileSet.tileSize);
				}
			}
		}
	}
	
	/**
	 * Imports a map from a tmx file (not yet implemented)
	 * @param {String} pFile - The path to the tmx-map file.
	 */
	that.prototype.importTMX = function(pFile){
		
	}
};