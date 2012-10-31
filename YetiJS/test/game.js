
/**
 * @projectDescription YetiJS game framework
 * 
 * @author Leo Zurbriggen [http://leoz.ch]
 * @version 100812
 */

// Global variables
var game;
var canvas;
var ctx;
var delta = 0;
var input;

var x = 10;

var world = new b2World(new b2Vec2(0, 20), true);

var physicsDelta = 1/10;
var accumulator = 0.0;

var entities = [];

/**
 * @classDescription Main game class
 * 
 * @alias yGame
 * @type {Object}
 * @author Leo Zurbriggen
 * @constructor
 */
var yGame = function(){
	var that = this;
	var lastFrame = Date.now();
	
	that.gameState = new yGameState();
	that.camera = null;
	
	var fixDef = new b2FixtureDef;
         fixDef.density = 1.0;
         fixDef.friction = 0.5;
         fixDef.restitution = 0.2;

	var bodyDef2 = new b2BodyDef;
         
         //create ground
         bodyDef2.type = b2Body.b2_staticBody;
         fixDef.shape = new b2PolygonShape;
         
         fixDef.shape.SetAsBox(canvas.width, 2);
         bodyDef2.position.Set(2, canvas.height-2);
         world.CreateBody(bodyDef2).CreateFixture(fixDef);
         
         bodyDef2.position.Set(0, 2);
         world.CreateBody(bodyDef2).CreateFixture(fixDef);
         
         fixDef.shape.SetAsBox(2, canvas.height);
         bodyDef2.position.Set(canvas.width-2, 2);
         world.CreateBody(bodyDef2).CreateFixture(fixDef);
         
         bodyDef2.position.Set(2, 2);
         world.CreateBody(bodyDef2).CreateFixture(fixDef);

		var graphic = new Image();
		graphic.src = "test.png";

		//create some objects
        
         for(var i = 0; i < 20; ++i) {
         	var bodyDef = new b2BodyDef;
         	 bodyDef.type = b2Body.b2_dynamicBody;
            /*if(Math.random() > 0.5) {
               fixDef.shape = new b2PolygonShape;
               fixDef.shape.SetAsBox(
                     Math.random() * (canvas.width/20) + 20 //half width
                  ,  Math.random() * (canvas.width/20) + 20 //half height
               );
            } else {
               fixDef.shape = new b2CircleShape(
                  Math.random() * (canvas.width/20) + 20 //radius
               );
            }*/
           	fixDef.shape = new b2CircleShape(15);
            bodyDef.position.x = Math.random() * canvas.width;
            bodyDef.position.y = Math.random() * canvas.height;
            var body = world.CreateBody(bodyDef);
            var fixture = body.CreateFixture(fixDef);
            var entity = new yEntity(graphic, new Vec2(0, 0));
            entity.physModel = body;
            entities.push(entity);
         }
         
         //setup debug draw
         var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(canvas.getContext("2d"));
			debugDraw.SetDrawScale(1.0);
			debugDraw.SetFillAlpha(0.5);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);

	/**
	 * @method Main update method
	 */
	yGame.prototype.update = function(){
		// Update delta time
		var now = Date.now();
		delta = now - lastFrame;
		lastFrame = now;
		
		/*accumulator += physicsDelta;
		
		that.gameState.update();
		
		while (accumulator > physicsDelta)
		{
			world.Step(physicsDelta, 10, 10);
			accumulator -= physicsDelta;
		}
		world.ClearForces();*/
		
		if(x < canvas.width-20){
			x += 0.5*delta;
		}
		
		if(input.isDown(input.mouseLeft) || input.touches[0].isTouched){
			if(x>0)x -= delta;
		}
		
		for(var i = 0; i < entities.length; i++){
	    	entities[i].update();
	    }
		
		input.update();
	}

	/**
	 * @method Main update method
	 */
	yGame.prototype.updatePhysics = function(){
		/*if (window.DeviceOrientationEvent) {
			var newXGravity = Math.round(input.orientationGamma / 2);
            var newYGravity = Math.round(input.orientationBeta / 2);
 
            if (newXGravity != world.m_gravity.x || newYGravity != world.m_gravity.y ) {
                world.m_gravity.x = newXGravity;
                world.m_gravity.y = newYGravity;
            }
        }*/
		
		world.Step(physicsDelta, 20, 20);
		world.ClearForces();
	}

	/**
	 * @method Main draw method
	 */
	yGame.prototype.draw = function(){
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		// Draw next frame when Browser is ready
		requestAnimFrame(that.draw);
		
		that.gameState.draw();
		
		ctx.fillStyle = "rgb(" + Math.floor(255-255*(x/canvas.width)) + "," + Math.ceil(255*(x/canvas.width)) + ",0)";
		ctx.fillRect(10, 10, Math.floor(x), canvas.height-20);
		
		for(var i = 0; i < entities.length; i++){
	    	entities[i].draw();
	    }
		
		ctx.fillStyle    = '#000';
		ctx.font         = '20px Arial';
	    ctx.fillText("X: " + input.mousePosition.x + "   Y: " + input.mousePosition.y, 100, 30);
	    var touches = 0;
	    for(var i = 0; i < input.touches.length; i++){
			if(input.touches[i].isTouched){
				touches++;
			}
		}
	    ctx.fillText("Touches: " + touches, 100, 60);
	    
	    //world.DrawDebugData();
	}
	
	// Begin updateing the game logic
	setInterval(that.update, 1);
	setInterval(that.updatePhysics, 30);

	// Begin drawing the game graphics
	window.requestAnimFrame(that.draw);
}

// Create canvas and add it to the dom when loading is completed
window.addEventListener("load", function(){
	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	
	input = new yInputManager();
	
	// Create new game instance
	game = new yGame();
}, false);