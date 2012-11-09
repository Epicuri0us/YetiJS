
/**
 * @class yTileMap
 * @augments Class
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
var yTileMap = Class.extend({
	init: function(pTileSet, pLayers, pWidth, pHeight){
		this.tileSet = pTileSet;
		this.map = [];
		this.width = pWidth;
		this.height = pHeight;
		
		// Initializes an empty map-array
		for(var l = 0; l < pLayers; l++){
			this.map[l] = [];
			for(var y = 0; y < this.height; y++){
				this.map[l][y] = [];
				for(var x = 0; x < this.width; x++){
					this.map[l][y][x] = 0;
				}
			}
		}
	},
	
	
	/**
	 * Draws the whole map depending on camera position.
	 * @memberof yTileMap
	 * @param {yCamera} pCamera - The camera.
	 */
	draw: function(pCamera){
		var tileSet = this.tileSet;
		for(var l = 0; l < pLayers; l++){
			for(var y = 0; y < this.height; y++){
				for(var x = 0; x < this.width; x++){
					tileSet.drawTile(this.map[l][y][x], new yVector(camera.position.x + x*tileSet.tileSize, camera.position.y + y*tileSet.tileSize), pCamera);
				}
			}
		}
	},
	
	/**
	 * Imports a map from a tmx file (not yet implemented).
	 * @memberof yTileMap
	 * @param {String} pFile - The path to the tmx-map file.
	 */
	importTMX: function(pFile){
		
	}
});