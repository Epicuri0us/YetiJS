
/**
 * @projectDescription YetiJS game framework
 * 
 * @author Leo Zurbriggen [http://leoz.ch]
 * @version 021112
 */

// Global variables
var game;
var canvas;
var ctx;
var delta = 0;
var input;
var debug = true;

/**
 * @classDesc The main game class contains the main loop, creates the canvas, updates the delta time, the input manager and calls the gamestate's update and draw methods.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @property {yGameState} gameState - The active gamestate.
 */

var yGame = function(){
	var that = this;
	var lastFrame = Date.now();
	
	that.gameState = new yGameState();
	
	/**
	 * Main update method
	 */
	yGame.prototype.update = function(){
		// Update delta time
		var now = Date.now();
		delta = (now - lastFrame)/1000;
		lastFrame = now;
		
		that.gameState.update();
		
		input.update();
	}

	/**
	 * Main draw method
	 */
	yGame.prototype.draw = function(){
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(0, 0, canvas.width, (canvas.width/16*9));
		
		// Draw next frame when Browser is ready
		requestAnimFrame(that.draw);
		
		that.gameState.draw();
	}
	
	// Begin updateing the game logic
	setInterval(that.update, 1);

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
	
	input = new yInput();
	
	// Create new game instance
	game = new yGame();
}, false);