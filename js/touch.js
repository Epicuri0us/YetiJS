
/**
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
var yTouch = function(){
	var that = this;
	that.isTouched = false;
	that.wasTouched = false;
	that.position = new yVector(-1, -1);
	that.lastPosition = new yVector(-1, -1);
	that.wasMoved = false;
	
	/**
	 * Updates attributes
	 */
	yTouch.prototype.update = function(){
		that.wasTouched = that.isTouched;
		that.lastPosition = deepCopy(that.position);
		if(that.position.x != that.lastPosition.x || that.position.y != that.lastPosition.y){
			that.wasMoved = true;
		}else{
			that.wasMoved = false;
		}
	}
};
