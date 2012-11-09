
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
 * @class yGame
 * @augments Class
 * @classDesc The main game class contains the main loop, creates the canvas, updates the delta time, the input manager and calls the gamestate's update and draw methods.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {yGameState} pGameState - The initial gamestate.
 * @param {Boolean} pDebug - (optional) Tells if you're in debug mode.
 * @property {yGameState} gameState - The active gamestate.
 * @property {Boolean} debugging - If in debug mode.
 * @property {Integer} lastFrame - The time of the last frame.
 */

var yGame = Class.extend({
	init: function(pGameState, pDebug){
		this.gameState = pGameState;
		this.debugging = (pDebug == true ? true : false);
		this.lastFrame = Date.now();
		
		// Begin updateing the game logic
		var self = this;
		setInterval(function(){self.update()}, 1);
	
		// Begin drawing the game graphics
		window.requestAnimFrame(function(){self.draw()});
		return this;
	},
	
	/**
	 * Add the canvas
	 * @memberof yGame
	 * @param {yVector} pDimensions - The width and height of the Canvas; If null: window-height/width.
	 * @param {Element} pParent - (optional) The parent html-Element to add the canvas to, Default: window.
	 */
	addCanvas: function(pDimensions, pParent){
		
	},
	
	/**
	 * Main update method
	 * @memberof yGame
	 */
	update: function(){
		// Update delta time
		var now = Date.now();
		delta = (now - this.lastFrame)/1000;
		this.lastFrame = now;

		this.gameState.update();
		
		input.update();
	},

	/**
	 * Main draw method
	 * @memberof yGame
	 */
	draw: function(){
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);  //(canvas.width/16*9)
		
		// Draw next frame when Browser is ready
		var self = this;
		requestAnimFrame(function(){self.draw()});
		
		this.gameState.draw();
		
		if(this.debugging){
			ctx.globalCompositeOperation = "darker";
			ctx.font = "9pt Arial";
			ctx.fillStyle = "#333";
	   		ctx.fillText("FPS: " + Math.ceil(1/delta), 10, 20);
	   		ctx.globalCompositeOperation = "source-over";
		}
	}
});

// Create canvas and add it to the dom when loading is completed
window.addEventListener("load", function(){
	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	
	input = new yInput();
	
	// Fires the ready-event
	var event = document.createEvent("Event");
	event.initEvent("YetiJSReady", true, true);
	event.customData = {cancelable: false};
	window.dispatchEvent(event);
	
}, false);