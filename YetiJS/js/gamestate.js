
/**
 * @classdesc The gamestate handles all layers, it should be overwritten to be able to get better control over the layers and gamestate-switches.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @property {yLayer[]} layers - An array that stores every layer of the gamestate.
 */
function yGameState(){
	this.layers = [];
	
	/**
	 * Updates game state
	 */
	yGameState.prototype.update = function(){
		for(var i = 0; i < this.layers.length; i++){
			if(this.layers[i].active){
				this.layers[i].update();
			}
		}
	}

	/**
	 * Draws game state
	 */
	yGameState.prototype.draw = function(){
		for(var i = 0; i < this.layers.length; i++){
			if(this.layers[i].active){
				this.layers[i].draw();
			}
		}
	}
};
