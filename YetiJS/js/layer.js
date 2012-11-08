
/**
 * @classdesc A layer handles the game functionality and should be dedicated to one task (i.E. user inferface/menu/actual game/...), it has to be inherited and attached to a specific gamestate.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {Boolean} pInactive - (optional) Tells that the layer is inactive.
 * @property {Boolean} active - Checks if the layer is active.
 * @property {yCamera} camera - The active camera.
 */
function yLayer(pInactive){
	this.active = (pInactive == true ? false : true);
	this.camera = new yCamera(new yVector(0.5, 0.5));
	this.physWorld = null;
	this.physDelta = 0;
	this.entities = [];
	
	/**
	 * Updates layer
	 */
	yLayer.prototype.update = function(){
		for(var i = 0; i < this.entities.length; i++){
			this.entities[i].update();
		}
		this.updatePhysics();
	}
	
	/**
	 * Draws layer
	 */
	yLayer.prototype.draw = function(){
		for(var i = 0; i < this.entities.length; i++){
			this.entities[i].draw();
		}
	}
	
	/**
	 * Updates the physics world
	 */
	yLayer.prototype.updatePhysics = function(){
		if(this.physWorld){
			this.physDelta += delta;
			if(this.physDelta > 1/60){
				this.physDelta = 0;
				this.physWorld.Step(1/60, 8, 3);
				this.physWorld.ClearForces();
			}
		}
	}
};