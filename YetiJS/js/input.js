
/**
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
var yInput = function() {
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
	 * Returns true, if the key with given keyCode is pressed, false otherwise.
 	 * @param {Integer} pKeyCode - The keycode.
	 */
	yInput.prototype.isDown = function(pKeyCode) {
		return that.keyState[pKeyCode];
	};

	/**
	 * Returns true, if the key with given keyCode is not pressed, false otherwise.
 	 * @param {Integer} pKeyCode - The keycode.
	 */
	yInput.prototype.isUp = function(pKeyCode) {
		return !that.keyState[pKeyCode];
	};

	/**
	 * Returns true, if the key with given keyCode was just released, false otherwise.
 	 * @param {Integer} pKeyCode - The keycode.
	 */
	yInput.prototype.isReleased = function(pKeyCode) {
		return (!that.keyState[pKeyCode] && that.lastKeyState[pKeyCode]);
	};

	/**
	 * Returns true, if the mouse hovers a given area, false otherwise.
 	 * @param {yArea} pArea - The area to check for.
	 */
	yInput.prototype.isAreaHovered = function(pArea) {
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
	 * Returns true, if the mouse is pressed within a given area, false otherwise.
 	 * @param {yArea} pArea - The area to check for.
	 */
	yInput.prototype.isAreaPressed = function(pArea) {
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
	 * Returns true, if the mouse was just released within a given area, false otherwise.
 	 * @param {yArea} pArea - The area to check for.
	 */
	yInput.prototype.isAreaReleased = function(pArea) {
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

	yInput.prototype.onKeydown = function(event) {
		that.keyState[event.keyCode] = true;
	};

	yInput.prototype.onKeyup = function(event) {
		that.keyState[event.keyCode] = false;
	};

	yInput.prototype.onMouseDown = function(event) {
		that.keyState[event.button] = true;
		event.preventDefault();
	};

	yInput.prototype.onMouseUp = function(event) {
		that.keyState[event.button] = false;
		event.preventDefault();
	};

	yInput.prototype.onMouseMove = function(event) {
		that.mousePosition.x = event.clientX;
		that.mousePosition.y = event.clientY;
	};

	yInput.prototype.onTouchStart = function(event) {
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

	yInput.prototype.onTouchEnd = function(event) {
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

	yInput.prototype.onTouchMove = function(event) {
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
	yInput.prototype.update = function() {
		that.lastKeyState = deepCopy(that.keyState);
		for (var i = 0; i < that.lastTouches.length; i++) {
			that.touches[i].update();
		}
	}

	yInput.prototype.handleOrientation = function(event) {
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
