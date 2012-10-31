
/**
 * @classdesc The input manager handles key-, mouse- and touch-events, saves the active keystates and provides methods to check for events.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @property {Int} keyState - An array that stores the active keystate.
 * @property {Int} lastKeyState - An array that stores the last keystate.
 * @property {yTouch} touches - An array that stores 10 touch objects.
 * @property {yTouch} lastTouches - An array that stores the last touch state.
 * @property {yVector} mousePosition - The active mouse position; the position of the last touch gets mapped to this vector to maintain functionality, Default is -1|-1
 * @property {Int} MOUSELEFT - KeyCode: 0
 * @property {Int} MOUSERIGHT - KeyCode: 2
 * @property {Int} MOUSEMIDDLE - KeyCode: 1
 * @property {Int} BACKSPACE - KeyCode: 8
 * @property {Int} TAB - KeyCode: 9
 * @property {Int} ENTER - KeyCode: 13
 * @property {Int} SHIFT - KeyCode: 16
 * @property {Int} CTRL - KeyCode: 17
 * @property {Int} ALT - KeyCode: 18
 * @property {Int} PAUSE - KeyCode: 19
 * @property {Int} CAPS - KeyCode: 20
 * @property {Int} ESCAPE - KeyCode: 27
 * @property {Int} SPACE - KeyCode: 32
 * @property {Int} PAGEUP - KeyCode: 33
 * @property {Int} PAGEDOWN - KeyCode: 34
 * @property {Int} END - KeyCode: 35
 * @property {Int} HOME - KeyCode: 36
 * @property {Int} LEFT - KeyCode: 37
 * @property {Int} UP - KeyCode: 38
 * @property {Int} RIGHT - KeyCode: 39
 * @property {Int} DOWN - KeyCode: 40
 * @property {Int} INSERT - KeyCode: 45
 * @property {Int} DELETE - KeyCode: 46
 * @property {Int} ZERO - KeyCode: 48
 * @property {Int} ONE - KeyCode: 49
 * @property {Int} TWO - KeyCode: 50
 * @property {Int} THREE - KeyCode: 51
 * @property {Int} FOUR - KeyCode: 52
 * @property {Int} FIVE - KeyCode: 53
 * @property {Int} SIX - KeyCode: 54
 * @property {Int} SEVEN - KeyCode: 55
 * @property {Int} EIGHT - KeyCode: 56
 * @property {Int} NINE - KeyCode: 57
 * @property {Int} A - KeyCode: 65
 * @property {Int} B - KeyCode: 66
 * @property {Int} C - KeyCode: 67
 * @property {Int} D - KeyCode: 68
 * @property {Int} E - KeyCode: 69
 * @property {Int} F - KeyCode: 70
 * @property {Int} G - KeyCode: 71
 * @property {Int} H - KeyCode: 72
 * @property {Int} I - KeyCode: 73
 * @property {Int} J - KeyCode: 74
 * @property {Int} K - KeyCode: 75
 * @property {Int} L - KeyCode: 76
 * @property {Int} M - KeyCode: 77
 * @property {Int} N - KeyCode: 78
 * @property {Int} O - KeyCode: 79
 * @property {Int} P - KeyCode: 80
 * @property {Int} Q - KeyCode: 81
 * @property {Int} R - KeyCode: 82
 * @property {Int} S - KeyCode: 83
 * @property {Int} T - KeyCode: 84
 * @property {Int} U - KeyCode: 85
 * @property {Int} V - KeyCode: 86
 * @property {Int} W - KeyCode: 87
 * @property {Int} X - KeyCode: 88
 * @property {Int} Y - KeyCode: 89
 * @property {Int} Z - KeyCode: 90
 * @property {Int} WINDOWsLEFT - KeyCode: 91
 * @property {Int} WINDOWSRIGHT - KeyCode: 92
 * @property {Int} SELECT - KeyCode: 93
 * @property {Int} NUMZERO - KeyCode: 96
 * @property {Int} NUMONE - KeyCode: 97
 * @property {Int} NUMTWO - KeyCode: 98
 * @property {Int} NUMTHREE - KeyCode: 99
 * @property {Int} NUMFOUR - KeyCode: 100
 * @property {Int} NUMFIVE - KeyCode: 101
 * @property {Int} NUMSIX - KeyCode: 102
 * @property {Int} NUMSEVEN - KeyCode: 103
 * @property {Int} NUMEIGHT - KeyCode: 104
 * @property {Int} NUMNINE - KeyCode: 105
 * @property {Int} MULTIPLY - KeyCode: 106
 * @property {Int} ADD - KeyCode: 107
 * @property {Int} SUBTRACT - KeyCode: 109
 * @property {Int} DECIMALPOINT - KeyCode: 110
 * @property {Int} DIVIDE - KeyCode: 111
 * @property {Int} F1 - KeyCode: 112
 * @property {Int} F2 - KeyCode: 113
 * @property {Int} F3 - KeyCode: 114
 * @property {Int} F4 - KeyCode: 115
 * @property {Int} F5 - KeyCode: 116
 * @property {Int} F6 - KeyCode: 117
 * @property {Int} F7 - KeyCode: 118
 * @property {Int} F8 - KeyCode: 119
 * @property {Int} F9 - KeyCode: 120
 * @property {Int} F10 - KeyCode: 121
 * @property {Int} F11 - KeyCode: 122
 * @property {Int} F12 - KeyCode: 123
 * @property {Int} NUMLOCK - KeyCode: 144
 * @property {Int} SCROLLLOCK - KeyCode: 145
 * @property {Int} SEMICOLON - KeyCode: 186
 * @property {Int} EQUALSIGN - KeyCode: 187
 * @property {Int} COMMA - KeyCode: 188
 * @property {Int} DASH - KeyCode: 189
 * @property {Int} PERIOD - KeyCode: 190
 * @property {Int} FORWARDSLASH - KeyCode: 191
 * @property {Int} GRAVEACCENT - KeyCode: 192
 * @property {Int} OPENBRACKET - KeyCode: 219
 * @property {Int} BACKSLASH - KeyCode: 220
 * @property {Int} CLOSEBRACKET - KeyCode: 221
 * @property {Int} SINGLEQUOTE - KeyCode: 222
 * @property {Float} orientationAlpha - The alpha orientation of the device.
 * @property {Float} orientationBeta - The beta orientation of the device.
 * @property {Float} orientationGamma - The gamma orientation of the device.
 */
var yInputManager = function() {
	var that = this;

	that.keyState = [];
	that.lastKeyState = [];

	that.touches = [];
	that.lastTouches = [];

	for (var i = 0; i < 10; i++) {
		that.touches[i] = new yTouch();
	}

	that.mousePosition = new yVector(-1, -1);

	for (var i = 0; i < 300; i++) {
		that.keyState[i] = false;
		that.lastKeyState[i] = false;
	}

	that.MOUSELEFT = 0;
	that.MOUSERIGHT = 2;
	that.MOUSEMIDDLE = 1;
	that.BACKSPACE = 8;
	that.TAB = 9;
	that.ENTER = 13;
	that.SHIFT = 16;
	that.CTRL = 17;
	that.ALT = 18;
	that.PAUSE = 19;
	that.CAPS = 20;
	that.ESCAPE = 27;
	that.SPACE = 32;
	that.PAGEUP = 33;
	that.PAGEDOWN = 34;
	that.END = 35;
	that.HOME = 36;
	that.LEFT = 37;
	that.UP = 38;
	that.RIGHT = 39;
	that.DOWN = 40;
	that.INSERT = 45;
	that.DELETE = 46;
	that.ZERO = 48;
	that.ONE = 49;
	that.TWO = 50;
	that.THREE = 51;
	that.FOUR = 52;
	that.FIVE = 53;
	that.SIX = 54;
	that.SEVEN = 55;
	that.EIGHT = 56;
	that.NINE = 57;
	that.A = 65;
	that.B = 66;
	that.C = 67;
	that.D = 68;
	that.E = 69;
	that.F = 70;
	that.G = 71;
	that.H = 72;
	that.I = 73;
	that.J = 74;
	that.K = 75;
	that.L = 76;
	that.M = 77;
	that.N = 78;
	that.O = 79;
	that.P = 80;
	that.Q = 81;
	that.R = 82;
	that.S = 83;
	that.T = 84;
	that.U = 85;
	that.V = 86;
	that.W = 87;
	that.X = 88;
	that.Y = 89;
	that.Z = 90;
	that.WINDOWsLEFT = 91;
	that.WINDOWSRIGHT = 92;
	that.SELECT = 93;
	that.NUMZERO = 96;
	that.NUMONE = 97;
	that.NUMTWO = 98;
	that.NUMTHREE = 99;
	that.NUMFOUR = 100;
	that.NUMFIVE = 101;
	that.NUMSIX = 102;
	that.NUMSEVEN = 103;
	that.NUMEIGHT = 104;
	that.NUMNINE = 105;
	that.MULTIPLY = 106;
	that.ADD = 107;
	that.SUBTRACT = 109;
	that.DECIMALPOINT = 110;
	that.DIVIDE = 111;
	that.F1 = 112;
	that.F2 = 113;
	that.F3 = 114;
	that.F4 = 115;
	that.F5 = 116;
	that.F6 = 117;
	that.F7 = 118;
	that.F8 = 119;
	that.F9 = 120;
	that.F10 = 121;
	that.F11 = 122;
	that.F12 = 123;
	that.NUMLOCK = 144;
	that.SCROLLLOCK = 145;
	that.SEMICOLON = 186;
	that.EQUALSIGN = 187;
	that.COMMA = 188;
	that.DASH = 189;
	that.PERIOD = 190;
	that.FORWARDSLASH = 191;
	that.GRAVEACCENT = 192;
	that.OPENBRACKET = 219;
	that.BACKSLASH = 220;
	that.CLOSEBRACKET = 221;
	that.SINGLEQUOTE = 222;

	that.orientationGamma = 0;
	that.orientationBeta = 0;
	that.orientationAlpha = 0;

	/**
	 * Returns true, if the key with given keyCode is pressed, false otherwise
 	 * @param {Int} pKeyCode - The keycode
	 */
	yInputManager.prototype.isDown = function(pKeyCode) {
		return that.keyState[pKeyCode];
	};

	/**
	 * Returns true, if the key with given keyCode is not pressed, false otherwise
 	 * @param {Int} pKeyCode - The keycode
	 */
	yInputManager.prototype.isUp = function(pKeyCode) {
		return !that.keyState[pKeyCode];
	};

	/**
	 * Returns true, if the key with given keyCode was just released, false otherwise
 	 * @param {Int} pKeyCode - The keycode
	 */
	yInputManager.prototype.isReleased = function(pKeyCode) {
		return (!that.keyState[pKeyCode] && that.lastKeyState[pKeyCode]);
	};

	/**
	 * Returns true, if the mouse hovers a given area, false otherwise
 	 * @param {yArea} pArea - The area to check for
	 */
	yInputManager.prototype.isAreaHovered = function(pArea) {
		if (that.mousePosition.x > pArea.topleft.x && that.mousePosition.y > pArea.topleft.y && that.mousePosition.x < pArea.botright.x && that.mousePosition.y < pArea.botright.y) {
			return true;
		}
		for (var i = 0; i < that.touches.length; i++) {
			var touch = that.touches[i];
			if (touch.isTouched) {
				if (touch.position.x > pArea.topleft.x && touch.position.y > pArea.topleft.y && touch.position.x < pArea.botright.x && touch.position.y < pArea.botright.y) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Returns true, if the mouse is pressed within a given area, false otherwise
 	 * @param {yArea} pArea - The area to check for
	 */
	yInputManager.prototype.isAreaPressed = function(pArea) {
		if (that.isDown(that.MOUSELEFT) && that.mousePosition.x > pArea.topleft.x && that.mousePosition.y > pArea.topleft.y && that.mousePosition.x < pArea.botright.x && that.mousePosition.y < pArea.botright.y) {
			return true;
		}
		for (var i = 0; i < that.touches.length; i++) {
			var touch = that.touches[i];
			if (touch && touch.isTouched) {
				if (touch.position.x > pArea.topleft.x && touch.position.y > pArea.topleft.y && touch.position.x < pArea.botright.x && touch.position.y < pArea.botright.y) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Returns true, if the mouse was just released within a given area, false otherwise
 	 * @param {yArea} pArea - The area to check for
	 */
	yInputManager.prototype.isAreaReleased = function(pArea) {
		if (that.isReleased(that.MOUSELEFT) && that.mousePosition.x > pArea.topleft.x && that.mousePosition.y > pArea.topleft.y && that.mousePosition.x < pArea.botright.x && that.mousePosition.y < pArea.botright.y) {
			return true;
		}
		for (var i = 0; i < that.touches.length; i++) {
			var touch = that.touches[i];
			if (touch.wasTouched && !touch.isTouched) {
				if (touch.position.x > pArea.topleft.x && touch.position.y > pArea.topleft.y && touch.position.x < pArea.botright.x && touch.position.y < pArea.botright.y) {
					return true;
				}
			}
		}
		return false;
	}

	yInputManager.prototype.onKeydown = function(event) {
		that.keyState[event.keyCode] = true;
	};

	yInputManager.prototype.onKeyup = function(event) {
		that.keyState[event.keyCode] = false;
	};

	yInputManager.prototype.onMouseDown = function(event) {
		that.keyState[event.button] = true;
		event.preventDefault();
	};

	yInputManager.prototype.onMouseUp = function(event) {
		that.keyState[event.button] = false;
		event.preventDefault();
	};

	yInputManager.prototype.onMouseMove = function(event) {
		that.mousePosition.x = event.clientX;
		that.mousePosition.y = event.clientY;
	};

	yInputManager.prototype.onTouchStart = function(event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			var id = event.changedTouches[i].identifier;
			if (that.touches[id] == null) {
				that.touches[id] = new yTouch();
			}
			that.touches[id].isTouched = true;
			if (i == 0) {
				that.keyState[that.MOUSELEFT] = true;
			}
		}
		event.preventDefault();
	};

	yInputManager.prototype.onTouchEnd = function(event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			var id = event.changedTouches[i].identifier;
			if (that.touches[id] == null) {
				that.touches[id] = new yTouch();
			}
			that.touches[id].isTouched = false;
			if (i == 0) {
				that.keyState[that.MOUSELEFT] = false;
			}
		}
		event.preventDefault();
	};

	yInputManager.prototype.onTouchMove = function(event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			that.touches[event.changedTouches[i].identifier].position.x = event.changedTouches[i].pageX;
			that.touches[event.changedTouches[i].identifier].position.y = event.changedTouches[i].pageY;
			if (i == 0) {
				that.mousePosition.x = event.changedTouches[i].pageX;
				that.mousePosition.y = event.changedTouches[i].pageY;
			}
		}
		event.preventDefault();
	};

	/**
	 * Copies the active keystate into the lastKeyState-variable and updates touch objects
	 */
	yInputManager.prototype.update = function() {
		that.lastKeyState = deepCopy(that.keyState);
		for (var i = 0; i < that.lastTouches.length; i++) {
			that.touches[i].update();
		}
	}

	yInputManager.prototype.handleOrientation = function(event) {
		that.orientationGamma = event.gamma;
		// used as x gravity
		that.orientationBeta = event.beta;
		// used as y gravity
		that.orientationAlpha = event.alpha;
	}

	window.addEventListener('keyup', that.onKeyup, false);
	window.addEventListener('keydown', that.onKeydown, false);
	canvas.addEventListener("touchstart", that.onTouchStart, true);
	canvas.addEventListener("touchmove", that.onTouchMove, true);
	canvas.addEventListener("touchend", that.onTouchEnd, true);
	canvas.addEventListener("touchleave", that.onTouchEnd, true);
	canvas.addEventListener("touchcancel", that.onTouchEnd, true);
	canvas.addEventListener("mousedown", that.onMouseDown, true);
	canvas.addEventListener("mousemove", that.onMouseMove, true);
	canvas.addEventListener("mouseup", that.onMouseUp, true);
	window.addEventListener('deviceorientation', that.handleOrientation, false);
};
