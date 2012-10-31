/*
 Execute the given function when the browser is ready to draw the next frame

 Author: Paul Irish
 URL: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function deepCopy(obj) {
	if (Object.prototype.toString.call(obj) === '[object Array]') {
		var out = [], i = 0, len = obj.length;
		for (; i < len; i++) {
			out[i] = arguments.callee(obj[i]);
		}
		return out;
	}
	if ( typeof obj === 'object') {
		var out = {}, i;
		for (i in obj ) {
			out[i] = arguments.callee(obj[i]);
		}
		return out;
	}
	return obj;
}

// Aliasing Box2DWeb-components
var b2yVector = Box2D.Common.Math.b2yVector, 
	b2AABB = Box2D.Collision.b2AABB, 
	b2BodyDef = Box2D.Dynamics.b2BodyDef, 
	b2Body = Box2D.Dynamics.b2Body, 
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef, 
	b2Fixture = Box2D.Dynamics.b2Fixture, 
	b2World = Box2D.Dynamics.b2World, 
	b2MassData = Box2D.Collision.Shapes.b2MassData, 
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, 
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, 
	b2DebugDraw = Box2D.Dynamics.b2DebugDraw, 
	b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
	yVector = SAT.Vector,
	yPolygon = SAT.Polygon,
	yCollisionRespone = SAT.Response,
	yCircle = SAT.CIRCLE,
	yBox = SAT.BOX; 