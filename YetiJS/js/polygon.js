
/**
 * @class yPolygon
 * @augments Class
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
var yPolygon = Class.extend({
	init: function(pPosition){
		this.center = new yVector(0, 0);
		this.position = pPosition;
		this.points = [];
		this.edges = [];
		this.lineWidth = "5";
		this.strokeStyle = "rgba(20, 20, 20, 0.7)";
		this.fillStyle = "rgba(30, 30, 30, 0.5)";
	},
	
	/**
	 * Updates polygon
	 * @memberof yPolygon
	 */
	update: function() {

	},
	
	/**
	 * Returns absolute positions of points
	 * @memberof yPolygon
	 */
	getAbsoluteCenter: function() {
		return new yVector(this.position.x + this.center.x, this.position.y + this.center.y);
	},

	/**
	 * Returns absolute positions of points
	 * @memberof yPolygon
	 */
	getAbsolutePoints: function() {
		var points = [];
		if (this.points.length > 1) {
			for (var i = 0; i < this.points.length; i++) {
				points[i] = new yVector(this.position.x + this.points[i].x, this.position.y + this.points[i].y);
			}
		}
		return points;
	},
	
	/**
	 * Returns absolute positions of points
	 * @memberof yPolygon
	 */
	setEdges: function() {
		var edges = []
		for (var i = 1; i < this.points.length; i++) {
			this.edges[i-1] = new yVector(this.position.x + (this.points[i].x), this.position.y + (this.points[i].y));
		}
	},

	/**
	 * Draws polygon for debugging purposes
	 * @memberof yPolygon
	 * @param {yCamera} pCamera - The camera to draw the position relative to.
	 */
	draw: function(pCamera) {
		ctx.beginPath();
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.fillStyle;
		var points = this.getAbsolutePoints();
		var cscale = pCamera.scale;
		//pCamera.scale = 10;
		if (points.length > 1) {
			ctx.moveTo((pCamera.position.x + points[0].x)*pCamera.scale, (pCamera.position.y + points[0].y)*pCamera.scale);
			for (var i = 1; i < points.length; i++) {
				ctx.lineTo((pCamera.position.x + points[i].x)*pCamera.scale, (pCamera.position.y + points[i].y)*pCamera.scale);
			}
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		pCamera.scale = cscale;
	}
});
