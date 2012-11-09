
/**
 * @class yLayer
 * @augments Class
 * @classdesc A layer handles the game functionality and should be dedicated to one task (i.E. user inferface/menu/actual game/...), it has to be inherited and attached to a specific gamestate.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {Boolean} pInactive - (optional) Tells that the layer is inactive.
 * @property {Boolean} active - Checks if the layer is active.
 * @property {yCamera} camera - The active camera.
 * @property {b2World} physWorld - The physics world.
 * @property {Integer} physDelta - Delta to calculate when to simulate the next physics step.
 * @property {yEntity[]} entities - The active camera.
 */
var yLayer = Class.extend({
	init: function(pInactive){
		this.active = (pInactive == true ? false : true);
		this.camera = new yCamera(new yVector(0.5, 0.5));
		this.physWorld = null;
		this.physDelta = 0;
		this.entities = [];
	},
	
	/**
	 * Updates layer
	 * @memberof yLayer
	 */
	update: function(){
		for(var i = 0; i < this.entities.length; i++){
			this.entities[i].update();
		}
		this.updatePhysics();
	},
	
	/**
	 * Draws layer
	 * @memberof yLayer
	 */
	draw: function(){
		for(var i = 0; i < this.entities.length; i++){
			this.entities[i].draw();
		}
	},
	
	/**
	 * Updates the physics world
	 * @memberof yLayer
	 */
	updatePhysics: function(){
		if(this.physWorld){
			this.physDelta += delta;
			if(this.physDelta > 1/60){
				this.physDelta = 0;
				this.physWorld.ClearForces();
				this.physWorld.Step(1/60, 6, 2);
			}
		}
	}
});