
/**
 * @class yInput
 * @augments Class
 * @classdesc The input manager handles key-, mouse- and touch-events, saves the active keystates and provides methods to check for events.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @property {Integer[]} keyState - An array that stores the active keystate.
 * @property {Integer[]} lastKeyState - An array that stores the last keystate.
 * @property {yTouch[]} touches - An array that stores 10 touch objects.
 * @property {yTouch[]} lastTouches - An array that stores the last touch state.
 * @property {yVector} mousePosition - The active mouse position; the position of the last touch gets mapped to this vector to maintain functionality, Default is -1|-1
 * @property {Integer} MOUSELEFT - KeyCode: 0
 * @property {Integer} MOUSERIGHT - KeyCode: 2
 * @property {Integer} MOUSEMIDDLE - KeyCode: 1
 * @property {Integer} BACKSPACE - KeyCode: 8
 * @property {Integer} TAB - KeyCode: 9
 * @property {Integer} ENTER - KeyCode: 13
 * @property {Integer} SHIFT - KeyCode: 16
 * @property {Integer} CTRL - KeyCode: 17
 * @property {Integer} ALT - KeyCode: 18
 * @property {Integer} PAUSE - KeyCode: 19
 * @property {Integer} CAPS - KeyCode: 20
 * @property {Integer} ESCAPE - KeyCode: 27
 * @property {Integer} SPACE - KeyCode: 32
 * @property {Integer} PAGEUP - KeyCode: 33
 * @property {Integer} PAGEDOWN - KeyCode: 34
 * @property {Integer} END - KeyCode: 35
 * @property {Integer} HOME - KeyCode: 36
 * @property {Integer} LEFT - KeyCode: 37
 * @property {Integer} UP - KeyCode: 38
 * @property {Integer} RIGHT - KeyCode: 39
 * @property {Integer} DOWN - KeyCode: 40
 * @property {Integer} INSERT - KeyCode: 45
 * @property {Integer} DELETE - KeyCode: 46
 * @property {Integer} ZERO - KeyCode: 48
 * @property {Integer} ONE - KeyCode: 49
 * @property {Integer} TWO - KeyCode: 50
 * @property {Integer} THREE - KeyCode: 51
 * @property {Integer} FOUR - KeyCode: 52
 * @property {Integer} FIVE - KeyCode: 53
 * @property {Integer} SIX - KeyCode: 54
 * @property {Integer} SEVEN - KeyCode: 55
 * @property {Integer} EIGHT - KeyCode: 56
 * @property {Integer} NINE - KeyCode: 57
 * @property {Integer} A - KeyCode: 65
 * @property {Integer} B - KeyCode: 66
 * @property {Integer} C - KeyCode: 67
 * @property {Integer} D - KeyCode: 68
 * @property {Integer} E - KeyCode: 69
 * @property {Integer} F - KeyCode: 70
 * @property {Integer} G - KeyCode: 71
 * @property {Integer} H - KeyCode: 72
 * @property {Integer} I - KeyCode: 73
 * @property {Integer} J - KeyCode: 74
 * @property {Integer} K - KeyCode: 75
 * @property {Integer} L - KeyCode: 76
 * @property {Integer} M - KeyCode: 77
 * @property {Integer} N - KeyCode: 78
 * @property {Integer} O - KeyCode: 79
 * @property {Integer} P - KeyCode: 80
 * @property {Integer} Q - KeyCode: 81
 * @property {Integer} R - KeyCode: 82
 * @property {Integer} S - KeyCode: 83
 * @property {Integer} T - KeyCode: 84
 * @property {Integer} U - KeyCode: 85
 * @property {Integer} V - KeyCode: 86
 * @property {Integer} W - KeyCode: 87
 * @property {Integer} X - KeyCode: 88
 * @property {Integer} Y - KeyCode: 89
 * @property {Integer} Z - KeyCode: 90
 * @property {Integer} WINDOWsLEFT - KeyCode: 91
 * @property {Integer} WINDOWSRIGHT - KeyCode: 92
 * @property {Integer} SELECT - KeyCode: 93
 * @property {Integer} NUMZERO - KeyCode: 96
 * @property {Integer} NUMONE - KeyCode: 97
 * @property {Integer} NUMTWO - KeyCode: 98
 * @property {Integer} NUMTHREE - KeyCode: 99
 * @property {Integer} NUMFOUR - KeyCode: 100
 * @property {Integer} NUMFIVE - KeyCode: 101
 * @property {Integer} NUMSIX - KeyCode: 102
 * @property {Integer} NUMSEVEN - KeyCode: 103
 * @property {Integer} NUMEIGHT - KeyCode: 104
 * @property {Integer} NUMNINE - KeyCode: 105
 * @property {Integer} MULTIPLY - KeyCode: 106
 * @property {Integer} ADD - KeyCode: 107
 * @property {Integer} SUBTRACT - KeyCode: 109
 * @property {Integer} DECIMALPOINT - KeyCode: 110
 * @property {Integer} DIVIDE - KeyCode: 111
 * @property {Integer} F1 - KeyCode: 112
 * @property {Integer} F2 - KeyCode: 113
 * @property {Integer} F3 - KeyCode: 114
 * @property {Integer} F4 - KeyCode: 115
 * @property {Integer} F5 - KeyCode: 116
 * @property {Integer} F6 - KeyCode: 117
 * @property {Integer} F7 - KeyCode: 118
 * @property {Integer} F8 - KeyCode: 119
 * @property {Integer} F9 - KeyCode: 120
 * @property {Integer} F10 - KeyCode: 121
 * @property {Integer} F11 - KeyCode: 122
 * @property {Integer} F12 - KeyCode: 123
 * @property {Integer} NUMLOCK - KeyCode: 144
 * @property {Integer} SCROLLLOCK - KeyCode: 145
 * @property {Integer} SEMICOLON - KeyCode: 186
 * @property {Integer} EQUALSIGN - KeyCode: 187
 * @property {Integer} COMMA - KeyCode: 188
 * @property {Integer} DASH - KeyCode: 189
 * @property {Integer} PERIOD - KeyCode: 190
 * @property {Integer} FORWARDSLASH - KeyCode: 191
 * @property {Integer} GRAVEACCENT - KeyCode: 192
 * @property {Integer} OPENBRACKET - KeyCode: 219
 * @property {Integer} BACKSLASH - KeyCode: 220
 * @property {Integer} CLOSEBRACKET - KeyCode: 221
 * @property {Integer} SINGLEQUOTE - KeyCode: 222
 * @property {Float} orientationAlpha - The alpha orientation of the device.
 * @property {Float} orientationBeta - The beta orientation of the device.
 * @property {Float} orientationGamma - The gamma orientation of the device.
 */
var yInput = Class.extend({
	init: function(){
		this.keyState = [];
		this.lastKeyState = [];
	
		this.touches = [];
		this.lastTouches = [];
	
		for (var i = 0; i < 10; i++) {
			this.touches[i] = new yTouch();
		}
	
		this.mousePosition = new yVector(-1, -1);
	
		for (var i = 0; i < 300; i++) {
			this.keyState[i] = false;
			this.lastKeyState[i] = false;
		}
	
		this.MOUSELEFT = 0;
		this.MOUSERIGHT = 2;
		this.MOUSEMIDDLE = 1;
		this.BACKSPACE = 8;
		this.TAB = 9;
		this.ENTER = 13;
		this.SHIFT = 16;
		this.CTRL = 17;
		this.ALT = 18;
		this.PAUSE = 19;
		this.CAPS = 20;
		this.ESCAPE = 27;
		this.SPACE = 32;
		this.PAGEUP = 33;
		this.PAGEDOWN = 34;
		this.END = 35;
		this.HOME = 36;
		this.LEFT = 37;
		this.UP = 38;
		this.RIGHT = 39;
		this.DOWN = 40;
		this.INSERT = 45;
		this.DELETE = 46;
		this.ZERO = 48;
		this.ONE = 49;
		this.TWO = 50;
		this.THREE = 51;
		this.FOUR = 52;
		this.FIVE = 53;
		this.SIX = 54;
		this.SEVEN = 55;
		this.EIGHT = 56;
		this.NINE = 57;
		this.A = 65;
		this.B = 66;
		this.C = 67;
		this.D = 68;
		this.E = 69;
		this.F = 70;
		this.G = 71;
		this.H = 72;
		this.I = 73;
		this.J = 74;
		this.K = 75;
		this.L = 76;
		this.M = 77;
		this.N = 78;
		this.O = 79;
		this.P = 80;
		this.Q = 81;
		this.R = 82;
		this.S = 83;
		this.T = 84;
		this.U = 85;
		this.V = 86;
		this.W = 87;
		this.X = 88;
		this.Y = 89;
		this.Z = 90;
		this.WINDOWsLEFT = 91;
		this.WINDOWSRIGHT = 92;
		this.SELECT = 93;
		this.NUMZERO = 96;
		this.NUMONE = 97;
		this.NUMTWO = 98;
		this.NUMTHREE = 99;
		this.NUMFOUR = 100;
		this.NUMFIVE = 101;
		this.NUMSIX = 102;
		this.NUMSEVEN = 103;
		this.NUMEIGHT = 104;
		this.NUMNINE = 105;
		this.MULTIPLY = 106;
		this.ADD = 107;
		this.SUBTRACT = 109;
		this.DECIMALPOINT = 110;
		this.DIVIDE = 111;
		this.F1 = 112;
		this.F2 = 113;
		this.F3 = 114;
		this.F4 = 115;
		this.F5 = 116;
		this.F6 = 117;
		this.F7 = 118;
		this.F8 = 119;
		this.F9 = 120;
		this.F10 = 121;
		this.F11 = 122;
		this.F12 = 123;
		this.NUMLOCK = 144;
		this.SCROLLLOCK = 145;
		this.SEMICOLON = 186;
		this.EQUALSIGN = 187;
		this.COMMA = 188;
		this.DASH = 189;
		this.PERIOD = 190;
		this.FORWARDSLASH = 191;
		this.GRAVEACCENT = 192;
		this.OPENBRACKET = 219;
		this.BACKSLASH = 220;
		this.CLOSEBRACKET = 221;
		this.SINGLEQUOTE = 222;
	
		this.orientationGamma = 0;
		this.orientationBeta = 0;
		this.orientationAlpha = 0;
		
		window.addEventListener('keyup', this.onKeyup, false);
		window.addEventListener('keydown', this.onKeydown, false);
		canvas.addEventListener("touchstart", this.onTouchStart, true);
		canvas.addEventListener("touchmove", this.onTouchMove, true);
		canvas.addEventListener("touchend", this.onTouchEnd, true);
		canvas.addEventListener("touchleave", this.onTouchEnd, true);
		canvas.addEventListener("touchcancel", this.onTouchEnd, true);
		canvas.addEventListener("mousedown", this.onMouseDown, true);
		canvas.addEventListener("mousemove", this.onMouseMove, true);
		canvas.addEventListener("mouseup", this.onMouseUp, true);
		window.addEventListener('deviceorientation', this.handleOrientation, false);
	},

	/**
	 * Returns true, if the key with given keyCode is pressed, false otherwise.
	 * @memberof yInput
 	 * @param {Integer} pKeyCode - The keycode.
	 */
	isDown: function(pKeyCode) {
		return this.keyState[pKeyCode];
	},

	/**
	 * Returns true, if the key with given keyCode is not pressed, false otherwise.
	 * @memberof yInput
 	 * @param {Integer} pKeyCode - The keycode.
	 */
	isUp: function(pKeyCode) {
		return !this.keyState[pKeyCode];
	},

	/**
	 * Returns true, if the key with given keyCode was just released, false otherwise.
	 * @memberof yInput
 	 * @param {Integer} pKeyCode - The keycode.
	 */
	isReleased: function(pKeyCode) {
		return (!this.keyState[pKeyCode] && this.lastKeyState[pKeyCode]);
	},

	/**
	 * Returns true, if the mouse hovers a given area, false otherwise.
	 * @memberof yInput
 	 * @param {yArea} pArea - The area to check for.
	 */
	isAreaHovered: function(pArea) {
		if (this.mousePosition.x > pArea.upperBound.x && this.mousePosition.y > pArea.upperBound.y && this.mousePosition.x < pArea.lowerBound.x && this.mousePosition.y < pArea.lowerBound.y) {
			return true;
		}
		for (var i = 0; i < this.touches.length; i++) {
			var touch = this.touches[i];
			if (touch.isTouched) {
				if (touch.position.x > pArea.upperBound.x && touch.position.y > pArea.upperBound.y && touch.position.x < pArea.lowerBound.x && touch.position.y < pArea.lowerBound.y) {
					return true;
				}
			}
		}
		return false;
	},

	/**
	 * Returns true, if the mouse is pressed within a given area, false otherwise.
	 * @memberof yInput
 	 * @param {yArea} pArea - The area to check for.
	 */
	isAreaPressed: function(pArea) {
		if (this.isDown(this.MOUSELEFT) && this.mousePosition.x > pArea.upperBound.x && this.mousePosition.y > pArea.upperBound.y && this.mousePosition.x < pArea.lowerBound.x && this.mousePosition.y < pArea.lowerBound.y) {
			return true;
		}
		for (var i = 0; i < this.touches.length; i++) {
			var touch = this.touches[i];
			if (touch && touch.isTouched) {
				if (touch.position.x > pArea.upperBound.x && touch.position.y > pArea.upperBound.y && touch.position.x < pArea.lowerBound.x && touch.position.y < pArea.lowerBound.y) {
					return true;
				}
			}
		}
		return false;
	},

	/**
	 * Returns true, if the mouse was just released within a given area, false otherwise.
	 * @memberof yInput
 	 * @param {yArea} pArea - The area to check for.
	 */
	isAreaReleased: function(pArea) {
		if (this.isReleased(this.MOUSELEFT) && this.mousePosition.x > pArea.topleft.x && this.mousePosition.y > pArea.topleft.y && this.mousePosition.x < pArea.botright.x && this.mousePosition.y < pArea.botright.y) {
			return true;
		}
		for (var i = 0; i < this.touches.length; i++) {
			var touch = this.touches[i];
			if (touch.wasTouched && !touch.isTouched) {
				if (touch.position.x > pArea.topleft.x && touch.position.y > pArea.topleft.y && touch.position.x < pArea.botright.x && touch.position.y < pArea.botright.y) {
					return true;
				}
			}
		}
		return false;
	},

	onKeyDown: function(event) {
		input.keyState[event.keyCode] = true;
	},

	onKeyUp: function(event) {
		input.keyState[event.keyCode] = false;
	},

	onMouseDown: function(event) {
		input.keyState[event.button] = true;
		event.preventDefault();
	},

	onMouseUp: function(event) {
		input.keyState[event.button] = false;
		event.preventDefault();
	},

	onMouseMove: function(event) {
		input.mousePosition.x = event.clientX;
		input.mousePosition.y = event.clientY;
	},

	onTouchStart: function(event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			var id = event.changedTouches[i].identifier;
			if (input.touches[id] == null) {
				input.touches[id] = new yTouch();
			}
			input.touches[id].isTouched = true;
			if (i == 0) {
				input.keyState[input.MOUSELEFT] = true;
			}
		}
		event.preventDefault();
	},

	onTouchEnd: function(event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			var id = event.changedTouches[i].identifier;
			if (input.touches[id] == null) {
				input.touches[id] = new yTouch();
			}
			input.touches[id].isTouched = false;
			if (i == 0) {
				input.keyState[input.MOUSELEFT] = false;
			}
		}
		event.preventDefault();
	},

	onTouchMove: function(event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			input.touches[event.changedTouches[i].identifier].position.x = event.changedTouches[i].pageX;
			input.touches[event.changedTouches[i].identifier].position.y = event.changedTouches[i].pageY;
			if (i == 0) {
				input.mousePosition.x = event.changedTouches[i].pageX;
				input.mousePosition.y = event.changedTouches[i].pageY;
			}
		}
		event.preventDefault();
	},

	/**
	 * Copies the active keystate into the lastKeyState-variable and updates touch objects
	 * @memberof yInput
	 */
	update: function() {
		this.lastKeyState = deepCopy(this.keyState);
		for (var i = 0; i < this.lastTouches.length; i++) {
			this.touches[i].update();
		}
	},

	handleOrientation: function(event) {
		input.orientationGamma = event.gamma;
		// used as x gravity
		input.orientationBeta = event.beta;
		// used as y gravity
		input.orientationAlpha = event.alpha;
	}
});
