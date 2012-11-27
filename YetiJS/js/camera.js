
/**
 * @class yCamera
 * @augments Class
 * @classdesc The camera provides functionality to handle scrolling, zooming etc.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @property {yVector} position - The position of the camera.
 * @property {Integer} scale - The scale of the camera.
 * @param {yVector} pPosition - The position of the camera.
 */
var yCamera = Class.extend({
	init: function(pPosition){
		this.position = pPosition;
		this.scale = 1;
	},
	
	/**
	 * Scales to a specific value but still maintains the center of the camera
	 * @memberof yCamera
	 * @param {Integer} pScale - The scale.
	 */
	scaleTo: function(pScale){
		this.scale = pScale;
		this.position.x = this.position.x+game.resolution.x/2*(this.scale);
		this.position.y = this.position.y+game.resolution.y/2*(this.scale);
	}
});