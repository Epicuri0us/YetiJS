
/**
 * @classdesc 
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {yVector} pPosition - The position of the polygon.
 * @property {yVector} center - The center of the polygon, used for rotating operations etc.
 * @property {yVector} position - The position of the polygon.
 * @property {yVector[]} points - The position of the polygon.
 * @property {yVector[]} edges - The position of the polygon.
 * @property {String} lineWidth - User for drawing the polygon.
 * @property {String} strokeStyle - User for drawing the polygon.
 * @property {String} fillStyle - User for drawing the polygon.
 */
var yPolygon = function(pPosition) {
	var that = this;
	that.center = new yVector(0, 0);
	that.position = pPosition;
	that.points = [];
	that.edges = [];
	that.lineWidth = "1";
	that.strokeStyle = "rgba(20, 20, 20, 0.7)";
	that.fillStyle = "rgba(30, 30, 30, 0.5)";

	/**
	 * Updates polygon
	 */
	yPolygon.prototype.update = function() {

	}
	
	/**
	 * Returns absolute positions of points
	 */
	yPolygon.prototype.getAbsoluteCenter = function() {
		return new yVector(this.position.x + this.center.x, this.position.y + this.center.y);
	}

	/**
	 * Returns absolute positions of points
	 */
	yPolygon.prototype.getAbsolutePoints = function() {
		var points = [];
		if (this.points.length > 1) {
			for (var i = 0; i < this.points.length; i++) {
				points[i] = new yVector(this.position.x + this.points[i].x, this.position.y + this.points[i].y);
			}
		}
		return points;
	}
	
	/**
	 * Returns absolute positions of points
	 */
	yPolygon.prototype.setEdges = function() {
		var edges = []
		for (var i = 1; i < this.points.length; i++) {
			this.edges[i-1] = new yVector(this.position.x + (this.points[i].x), this.position.y + (this.points[i].y));
		}
	}

	/**
	 * Draws polygon for debugging purposes
	 */
	yPolygon.prototype.draw = function(camera) {
		ctx.beginPath();
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.fillStyle;
		var points = this.getAbsolutePoints();
		if (points.length > 1) {
			ctx.moveTo(camera.position.x + points[0].x, camera.position.y + points[0].y);
			for (var i = 1; i < points.length; i++) {
				ctx.lineTo(camera.position.x + points[i].x, camera.position.y + points[i].y);
			}
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

}
