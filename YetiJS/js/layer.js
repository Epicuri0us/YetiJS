
/**
 * @classdesc A layer handles the game functionality and should be dedicated to one task (i.E. user inferface/menu/actual game/...), it has to be inherited and attached to a specific gamestate.
 * 
 * @author Leo Zurbriggen
 * @constructor
 */
var yLayer = function(){
	var that = this;
	that.enabled = false;
	that.entities = [];
	that.gravity = 3000;
	
	var image = new Image();
	image.src = "test.png";
	
	that.camera = new yCamera(new yVector(0.5, 0.5));
	
	var ent = new yEntity(image, new yVector(0, 0), that);
	ent.physModel = new yPhysicsObject(new yVector(30, 50), 1.2);
	// ent.physModel.friction = 0.998;
	
	var polygon1 = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-30,0), new SAT.Vector(-20,-20), new SAT.Vector(0, -30), new SAT.Vector(20, -20), new SAT.Vector(30, 0), new SAT.Vector(20, 20), new SAT.Vector(0, 30), new SAT.Vector(-20, 20)]);
	// var circle = new yCircle();
	
	ent.physModel.model = polygon1;
	ent.physModel.cor = 0.005;
	ent.physModel.friction = 0.97;
	ent.physModel.acceleration.y = that.gravity;
	
	that.entities.push(ent);
	
	ent = new yEntity(image, new yVector(0, 0), that);
	ent.physModel = new yPhysicsObject(new yVector(400, 30), 0.8);
	// ent.physModel.friction = 0.998;
	
	pol = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-30,0), new SAT.Vector(-20,-20), new SAT.Vector(0, -30), new SAT.Vector(20, -20), new SAT.Vector(30, 0), new SAT.Vector(20, 20), new SAT.Vector(0, 30), new SAT.Vector(-20, 20)]);
	
	ent.physModel.model = pol;
	ent.physModel.cor = 0.005;
	ent.physModel.acceleration.y = that.gravity;
	
	that.entities.push(ent);
	
	var height = canvas.width/16*9;
	// Left
	ent = new yEntity(null, new yVector(0, 0), that);
	ent.physModel = new yPhysicsObject(new yVector(0, 0), Infinity);
	var polygon1 = new SAT.Polygon(new SAT.Vector(0, 0), [new yVector(-50, -500), new yVector(-1, -500), new yVector(-1, height), new yVector(-50, height)]);
	ent.physModel.model = polygon1;
	ent.physModel.friction = 1;
	that.entities.push(ent);

	// Right
	ent = new yEntity(null, new yVector(0, 0), that);
	ent.physModel = new yPhysicsObject(new yVector(0, 0), Infinity);
	var polygon1 = new SAT.Polygon(new SAT.Vector(0, 0), [new yVector(canvas.width, -500), new yVector(canvas.width+50, -500), new yVector(canvas.width+50, height), new yVector(canvas.width, height)]);
	ent.physModel.model = polygon1;
	ent.physModel.friction = 1;
	that.entities.push(ent);
	
	// Bottom
	ent = new yEntity(null, new yVector(0, 0), that);
	ent.physModel = that.ground = new yPhysicsObject(new yVector(0, 0), Infinity);
	var polygon1 = new SAT.Polygon(new SAT.Vector(0, 0), [new yVector(0, height), new yVector(canvas.width, height), new yVector(canvas.width, height+50), new yVector(0, height+50)]);
	ent.physModel.model = polygon1;
	//ent.physModel.friction = 0.2;
	that.entities.push(ent);
	
	// Top
	ent = new yEntity(null, new yVector(0, 0), that);
	ent.physModel = new yPhysicsObject(new yVector(0, 0), Infinity);
	var polygon1 = new SAT.Polygon(new SAT.Vector(0, 0), [new yVector(0, -1), new yVector(0, -50), new yVector(canvas.width, -50), new yVector(canvas.width, -1),]);
	ent.physModel.model = polygon1;
	ent.physModel.friction = 1;
	that.entities.push(ent);
	
	/**
	 * Updates layer
	 */
	yLayer.prototype.update = function(){
		var that = this;
		if(that.enabled){
			if(input.isAreaPressed(new yArea(new yVector(0, 0), new yVector(canvas.width/4, canvas.height)))){
				that.entities[0].physModel.velocity.x -= 5000*delta;
			}
			if(input.isAreaPressed(new yArea(new yVector(canvas.width/4, 0), new yVector(canvas.width/2, canvas.height)))){
				that.entities[0].physModel.velocity.x += 5000*delta;
			}
			if(input.isAreaPressed(new yArea(new yVector(canvas.width/2, 0), new yVector(canvas.width, canvas.height)))){
				if(that.entities[0].physModel.collisions.contains(that.ground)){
		    		that.entities[0].physModel.velocity.y = 200000;
		    	}
			}
			that.entities[1].physModel.model.setRotation(67.5);
		    if(input.isDown(input.SPACE)){
		    	if(that.entities[0].physModel.collisions.contains(that.ground)){
		    		that.entities[0].physModel.velocity.y = 200000;
		    	}
			}
			
			var keys = 0;
		    if(input.isDown(input.LEFT)){
		    	keys -= 1;
				that.entities[0].physModel.acceleration.x -= 25000*delta;
			}
			if(input.isDown(input.RIGHT)){
				keys += 1;
				that.entities[0].physModel.acceleration.x += 25000*delta;
			}
			if(that.entities[0].physModel.velocity.x > 600){
				that.entities[0].physModel.velocity.x = 600;
			}else if(that.entities[0].physModel.velocity.x < -600){
				that.entities[0].physModel.velocity.x = -600;
			}
			if(keys == 0){
				that.entities[0].physModel.acceleration.x = 0;
			}if(keys < 0 && that.entities[0].physModel.acceleration.x > 0){
				
			}else if(keys > 0 && that.entities[0].physModel.acceleration.x < 0){
				
			}
			
			for(var i = 0; i < that.entities.length; i++){
		    	that.entities[i].update();
		    }
		}
	}
	
	/**
	 * Draws layer
	 */
	yLayer.prototype.draw = function(){
		var that = this;
		if(that.enabled){
			for(var i = 0; i < that.entities.length; i++){
		    	that.entities[i].draw(that.camera);
		    }
		}
	}
};