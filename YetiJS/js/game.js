
/**
 * @projectDescription YetiJS game framework
 * 
 * @author Leo Zurbriggen [http://leoz.ch]
 * @version 131112
 */

// Global variables
var game;
var canvas;
var ctx;
var delta = 0;
var input;
var assetManager;

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
 * @property {yVector} resolution - The resolution of the canvas.
 * @property {Object} scalingMode - The scaling mode, SCALETOFIT, CENTER or STRETCH, default: STRETCH.
 */

var yGame = Class.extend({
	init: function(pGameState, pResolutionX, pResolutionY, pDebug){
		this.gameState = pGameState;
		this.debugging = (pDebug == true ? true : false);
		this.lastFrame = Date.now();
		
		this.resolution = new yVector(pResolutionX, pResolutionY);
		this.scalingModes = {
			SCALETOFIT: 0,
			CENTER: 1,
			STRETCH: 2
		};
		
		// Begin updateing the game logic
		var self = this;
		setInterval(function(){self.update()}, 1);
	
		// Set viewport initial an when window gets resized
		this.setScaling(this.scalingModes.STRETCH);
		window.addEventListener("resize", function(){self.setScaling()}, false);
	
		// Begin drawing the game graphics
		window.requestAnimFrame(function(){self.draw()});
		return this;
	},
	
	/**
	 * Sets the scaling mode to a specific value
	 * @memberof yGame
	 * @param {Integer} pScalingMode - (optional) The scaling mode.
	 */
	setScaling: function(pScalingMode){
		if(pScalingMode){
			this.scalingMode = pScalingMode;
		}
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		if(this.scalingMode == this.scalingModes.SCALETOFIT){
			var scaleToFitX = windowWidth / this.resolution.x;
			var scaleToFitY = windowHeight / this.resolution.y;
			 
			var currentScreenRatio = windowWidth / windowHeight;
			var optimalRatio = Math.min(scaleToFitX, scaleToFitY);
			 
			if(currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79){
			    canvas.width = this.resolution.x;
			    canvas.height = this.resolution.y;
			    canvas.style.width = windowWidth + "px";
				canvas.style.height = windowHeight + "px";
			}else{
			    canvas.width = this.resolution.x;
			    canvas.height = this.resolution.y;
			    canvas.style.width = this.resolution.x * optimalRatio + "px";
				canvas.style.height = this.resolution.y * optimalRatio + "px";
			}
			
			canvas.style.marginTop = ((windowHeight-parseInt(canvas.style.height))/2)+"px";
			canvas.style.marginLeft = ((windowWidth-parseInt(canvas.style.width))/2)+"px";
		}else if(this.scalingMode == this.scalingModes.CENTER){
			canvas.width = this.resolution.x;
			canvas.height = this.resolution.y;
			canvas.style.width = this.resolution.x + "px";
			canvas.style.height = this.resolution.y + "px";
			
			canvas.style.marginTop = ((windowHeight-parseInt(canvas.style.height))/2)+"px";
			canvas.style.marginLeft = ((windowWidth-parseInt(canvas.style.width))/2)+"px";
		}else if(this.scalingMode == this.scalingModes.STRETCH){
			canvas.width = this.resolution.x;
			canvas.height = this.resolution.y;
			canvas.style.width = windowWidth + "px";
			canvas.style.height = windowHeight + "px";
		}
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
	assetManager = new yAssetManager();
	
	// Fires the ready-event
	var event = document.createEvent("Event");
	event.initEvent("YetiJSReady", true, true);
	event.customData = {cancelable: false};
	window.dispatchEvent(event);
	
}, false);