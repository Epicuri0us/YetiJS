
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
/**
 * @classDesc The main game class contains the main loop, creates the canvas, updates the delta time, the input manager and calls the gamestate's update and draw methods.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {yGameState} pGameState - The initial gamestate.
 * @param {Boolean} pDebug - (optional) Tells if you're in debug mode.
 * @property {yGameState} gameState - The active gamestate.
 * @property {Boolean} debugging - If in debug mode.
 */

function yGame(pGameState, pDebug){
	this.gameState = pGameState;
	this.debugging = (pDebug == true ? true : false);
	
	var lastFrame = Date.now();
	
	/**
	 * Add the canvas
	 * @param {yVector} pDimensions - The width and height of the Canvas; If null: window-height/width.
	 * @param {Element} pParent - (optional) The parent html-Element to add the canvas to, Default: window.
	 */
	yGame.prototype.addCanvas = function(pDimensions, pParent){
		
	}
	
	/**
	 * Main update method
	 */
	yGame.prototype.update = function(){
		// Update delta time
		var now = Date.now();
		delta = (now - lastFrame)/1000;
		lastFrame = now;
		
		this.gameState.update();
		
		input.update();
	}

	/**
	 * Main draw method
	 */
	yGame.prototype.draw = function(){
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);  //(canvas.width/16*9)
		
		// Draw next frame when Browser is ready
		requestAnimFrame(this.draw);
		
		this.gameState.draw();
	}
	
	// Begin updateing the game logic
	setInterval(this.update, 1);

	// Begin drawing the game graphics
	window.requestAnimFrame(this.draw);
}

// Create canvas and add it to the dom when loading is completed
window.addEventListener("load", function(){
	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	
	input = new yInput();
	
	// Fires the ready-event
	var event = new CustomEvent("YetiJSReady", { cancelable: false });  
	window.dispatchEvent(event);  
	
}, false);