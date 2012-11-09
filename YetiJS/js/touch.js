
/**
 * @class yTouch
 * @augments Class
 * @classdesc The touch events save the state of a touch event. It is used by the input manager.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @property {Boolean} isTouched - Tells, if the touch is active.
 * @property {Boolean} wasTouched - Tells, if the touch was active last frame.
 * @property {yVector} position - The position of the touch.
 * @property {yVector} lastPosition - The position of the touch last frame.
 * @property {Boolean} wasMoved - Tells, if the position of the touch changed from last frame.
 */
var yTouch = Class.extend({
	init: function(){
		this.isTouched = false;
		this.wasTouched = false;
		this.position = new yVector(-1, -1);
		this.lastPosition = new yVector(-1, -1);
		this.wasMoved = false;
	},
	
	/**
	 * Updates attributes
	 * @memberof yTouch
	 */
	update: function(){
		this.wasTouched = this.isTouched;
		this.lastPosition = deepCopy(this.position);
		if(this.position.x != this.lastPosition.x || this.position.y != this.lastPosition.y){
			this.wasMoved = true;
		}else{
			this.wasMoved = false;
		}
	}
});
