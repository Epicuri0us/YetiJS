
/**
 * @class yGameState
 * @augments Class
 * @classdesc The gamestate handles all layers, it should be overwritten to be able to get better control over the layers and gamestate-switches.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @property {yLayer[]} layers - An array that stores every layer of the gamestate.
 */
var yGameState = Class.extend({
	init: function(){
		this.layers = [];
	},
	
	/**
	 * Updates game state
	 * @memberof yGameState
	 */
	update: function(){
		for(var i = 0; i < this.layers.length; i++){
			if(this.layers[i].active){
				this.layers[i].update();
			}
		}
	},

	/**
	 * Draws game state
	 * @memberof yGameState
	 */
	draw: function(){
		for(var i = 0; i < this.layers.length; i++){
			if(this.layers[i].active){
				this.layers[i].draw();
			}
		}
	}
});
