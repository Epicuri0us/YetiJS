
/**
 * @classdesc The gamestate handles all layers, it should be overwritten to be able to get better control over the layers and gamestate-switches.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @property {yLayer[]} layers - An array that stores every layer of the gamestate.
 */
var yGameState = function(){
	var that = this;
	
	that.layers = new Array();
	
	that.layer1 = new yLayer();
	that.layer1.active = true;
	
	that.layers.push(that.layer1);
	
	/**
	 * Updates game state
	 */
	yGameState.prototype.update = function(){
		for(var i = 0; i < that.layers.length; i++)
		{
			if(that.layers[i].active){
				that.layers[i].update();
			}
		}
	}

	/**
	 * Draws game state
	 */
	yGameState.prototype.draw = function(){
		for(var i = 0; i < that.layers.length; i++)
		{
			if(that.layers[i].active){
				that.layers[i].draw();
			}
		}
	}
};